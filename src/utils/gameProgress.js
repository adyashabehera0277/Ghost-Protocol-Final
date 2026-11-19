// gameProgress.js – the "brain" of the game progress.
// All games call these functions to save answers, XP and completed stages.
// Progress is saved in localStorage separately for each username.
import { useState, useEffect } from "react";
import { KEYS, readStorage, writeStorage, removeStorage, userKey, getSession } from "./storage.js";
import { LEVELS, ALL_STAGES, getLevelOfStage, getStageById } from "../data/levels.js";
import { ACHIEVEMENTS } from "../data/achievements.js";
import { XP_PER_CORRECT, STAGE_BONUS_XP, DAILY_BONUS_XP, PASS_RATIO } from "./scoring.js";

// Whenever progress changes we fire this event so every page updates instantly.
const PROGRESS_EVENT = "gp-progress-changed";

function currentUsername() {
  const session = getSession();
  return session ? session.username : null;
}

// ---------- Default progress for a brand-new player ----------
export function defaultProgress() {
  const stages = {};
  ALL_STAGES.forEach((stage) => {
    stages[stage.id] = { completed: false, correctIds: [], bestScore: 0, attempts: 0 };
  });

  return {
    xp: 0,
    stages,
    achievements: [],
    stats: { attempted: 0, correct: 0 },
    activity: [],
    daily: { lastCompleted: null },
    preferences: { sound: false },
    completedAt: null,
  };
}

// ---------- Load (safe: broken data falls back to defaults) ----------
export function loadProgress(username = currentUsername()) {
  const base = defaultProgress();
  if (!username) return base;

  const saved = readStorage(userKey(KEYS.PROGRESS, username), null);
  if (!saved || typeof saved !== "object") return base;

  const merged = { ...base };
  merged.xp = Number.isFinite(saved.xp) ? saved.xp : 0;

  ALL_STAGES.forEach((stage) => {
    const st = saved.stages && saved.stages[stage.id];
    if (st && typeof st === "object") {
      merged.stages[stage.id] = {
        ...base.stages[stage.id],
        ...st,
        correctIds: Array.isArray(st.correctIds) ? st.correctIds : [],
      };
    }
  });

  merged.achievements = Array.isArray(saved.achievements) ? saved.achievements : [];
  merged.stats = { ...base.stats, ...(saved.stats || {}) };
  merged.activity = Array.isArray(saved.activity) ? saved.activity : [];
  merged.daily = { ...base.daily, ...(saved.daily || {}) };
  merged.preferences = { ...base.preferences, ...(saved.preferences || {}) };
  merged.completedAt = saved.completedAt || null;
  return merged;
}

// ---------- Save and notify the UI ----------
export function saveProgress(progress) {
  const username = currentUsername();
  if (!username) return;
  writeStorage(userKey(KEYS.PROGRESS, username), progress);
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

// React hook: components call useProgress() and re-render when progress changes.
export function useProgress() {
  const username = currentUsername();
  const [progress, setProgress] = useState(() => loadProgress(username));

  useEffect(() => {
    const refresh = () => setProgress(loadProgress(username));
    window.addEventListener(PROGRESS_EVENT, refresh);
    return () => window.removeEventListener(PROGRESS_EVENT, refresh);
  }, [username]);

  return progress;
}

// Add a line to the "Recent Activity" list (keeps the latest 15)
function addActivity(progress, text, xp = 0) {
  progress.activity.unshift({ text, xp, date: new Date().toISOString() });
  progress.activity = progress.activity.slice(0, 15);
}

// ---------- Reading helpers (do not change anything) ----------
export function getStagePercent(progress, stage) {
  const st = progress.stages[stage.id];
  if (!st) return 0;
  if (st.completed) return 100;
  const solved = Math.min(st.correctIds.length, stage.totalQuestions);
  return Math.min(99, Math.round((solved / stage.totalQuestions) * 100));
}

export function getLevelPercent(progress, level) {
  const total = level.stages.reduce((sum, stage) => sum + getStagePercent(progress, stage), 0);
  return Math.round(total / level.stages.length);
}

export function getOverallPercent(progress) {
  const total = ALL_STAGES.reduce((sum, stage) => sum + getStagePercent(progress, stage), 0);
  return Math.round(total / ALL_STAGES.length);
}

export function getLevelCompletedCount(progress, level) {
  return level.stages.filter((s) => progress.stages[s.id].completed).length;
}

export function getCompletedStageCount(progress) {
  return ALL_STAGES.filter((s) => progress.stages[s.id].completed).length;
}

// Beginner is always open. Other levels open when the previous level is finished.
export function isLevelUnlocked(progress, levelId) {
  const index = LEVELS.findIndex((level) => level.id === levelId);
  if (index <= 0) return true;
  const previous = LEVELS[index - 1];
  return previous.stages.every((s) => progress.stages[s.id].completed);
}

// ---------- Changing progress ----------

// Called after EVERY answer. XP is given only the FIRST time a question is
// answered correctly, so replaying a stage (practice mode) never repeats XP.
export function recordAnswer(stageId, questionId, isCorrect) {
  const username = currentUsername();
  if (!username) return { xpEarned: 0, practice: false };

  const progress = loadProgress(username);
  const stage = progress.stages[stageId];
  if (!stage) return { xpEarned: 0, practice: false };

  progress.stats.attempted += 1;
  let xpEarned = 0;

  if (isCorrect) {
    progress.stats.correct += 1;
    if (!stage.correctIds.includes(questionId)) {
      stage.correctIds.push(questionId);
      xpEarned = XP_PER_CORRECT;
      progress.xp += xpEarned;
    }
  }

  saveProgress(progress);
  return { xpEarned, practice: isCorrect && xpEarned === 0 };
}

// Called when a player finishes the last question of a stage.
// Passing needs PASS_RATIO (60%) correct answers.
export function completeStage(stageId, score, total) {
  const username = currentUsername();
  if (!username) return { passed: false, bonusXp: 0, newAchievements: [], levelCompleted: null };

  const progress = loadProgress(username);
  const stage = progress.stages[stageId];
  const info = getStageById(stageId);
  if (!stage || !info) return { passed: false, bonusXp: 0, newAchievements: [], levelCompleted: null };

  stage.attempts += 1;
  stage.bestScore = Math.max(stage.bestScore, score);

  const passed = total > 0 && score / total >= PASS_RATIO;
  let bonusXp = 0;
  let firstCompletion = false;

  if (passed && !stage.completed) {
    stage.completed = true;
    firstCompletion = true;
    bonusXp = STAGE_BONUS_XP;
    progress.xp += bonusXp;
  }

  addActivity(
    progress,
    `${passed ? "Completed" : "Attempted"} ${info.name} (${score}/${total})`,
    bonusXp
  );

  // Check which new badges were earned
  const newAchievements = [];
  ACHIEVEMENTS.forEach((badge) => {
    if (!progress.achievements.includes(badge.id) && badge.check(progress)) {
      progress.achievements.push(badge.id);
      newAchievements.push(badge);
    }
  });

  // Did this stage finish a whole level?
  const level = getLevelOfStage(stageId);
  const levelDone = level && level.stages.every((s) => progress.stages[s.id].completed);

  // Everything finished? Remember the completion date for the certificate.
  if (getCompletedStageCount(progress) === ALL_STAGES.length && !progress.completedAt) {
    progress.completedAt = new Date().toISOString();
  }

  saveProgress(progress);
  return {
    passed,
    bonusXp,
    firstCompletion,
    newAchievements,
    levelCompleted: firstCompletion && levelDone ? level.id : null,
  };
}

// Daily challenge reward: only once per calendar day.
export function claimDailyBonus(todayString) {
  const username = currentUsername();
  if (!username) return { awarded: false };

  const progress = loadProgress(username);
  if (progress.daily.lastCompleted === todayString) return { awarded: false };

  progress.daily.lastCompleted = todayString;
  progress.xp += DAILY_BONUS_XP;
  addActivity(progress, "Completed the Daily Cyber Challenge", DAILY_BONUS_XP);
  saveProgress(progress);
  return { awarded: true };
}

export function setPreference(key, value) {
  const username = currentUsername();
  if (!username) return;
  const progress = loadProgress(username);
  progress.preferences[key] = value;
  saveProgress(progress);
}

// Delete all progress for the current user (the Profile page asks for confirmation first)
export function resetProgress() {
  const username = currentUsername();
  if (!username) return;
  removeStorage(userKey(KEYS.PROGRESS, username));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}