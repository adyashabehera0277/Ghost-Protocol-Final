// QuizGame.jsx – the shared game engine used by all nine stages.
// A game file gives it: questions, intro text, and optionally a visual.
//
// Flow:  INTRO  ->  PLAYING (question by question)  ->  RESULT
//
// Question types:
//   multiple choice (default), "text" (typed answer), "custom" (own input, e.g. maze)
//
// Scoring rules:
//  - Only the FIRST attempt at a question counts for the score.
//  - "Try Again" after a wrong answer is practice only (no score, no XP).
//  - XP is given only the first time a question is answered correctly.
//  - You need 60% correct to complete the stage.
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ChevronRight,
  Play,
  Trophy,
  Star,
} from "lucide-react";
import Navbar from "./Navbar.jsx";
import QuestionCard from "./QuestionCard.jsx";
import HintBox from "./HintBox.jsx";
import Timer from "./Timer.jsx";
import ProgressBar from "./ProgressBar.jsx";
import LevelCompleteScreen from "./LevelCompleteScreen.jsx";
import { recordAnswer, completeStage, useProgress, isLevelUnlocked } from "../utils/gameProgress.js";
import { LEVELS, getLevelOfStage } from "../data/levels.js";
import { XP_PER_CORRECT, STAGE_BONUS_XP, PASS_RATIO } from "../utils/scoring.js";

// For typed answers: ignore capitals, spaces and punctuation ("midnight 77" = "MIDNIGHT-77")
function normalize(text) {
  return String(text ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export default function QuizGame({
  stageId,
  title,
  icon: Icon,
  intro,
  instructions,
  questions,
  renderVisual, // (question) => picture shown above the answers
  timePerQuestion = 0, // seconds per question, 0 = no timer
  // ----- only for "custom" questions (the firewall maze) -----
  renderInput, // (question, ctx) => custom input
  emptyValue, // (question) => starting value
  canSubmit, // (question, value) => true when Submit may be pressed
  checkAnswer, // (question, value) => true when the answer is correct
}) {
  const navigate = useNavigate();
  const progress = useProgress();
  const level = getLevelOfStage(stageId);
  const nextLevel = LEVELS[LEVELS.findIndex((l) => l.id === level.id) + 1] || null;

  // ---------- Game state ----------
  const [phase, setPhase] = useState("intro"); // "intro" | "playing" | "result"
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null); // the player's answer (any type)
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [firstTry, setFirstTry] = useState(true);
  const [summary, setSummary] = useState(null);

  // Block access to locked levels (for example someone typing the URL by hand)
  if (!isLevelUnlocked(progress, level.id)) {
    return <Navigate to="/dashboard" replace />;
  }

  const total = questions.length;
  const current = questions[index];
  const isLast = index + 1 === total;
  const alreadyDone = progress.stages[stageId]?.completed;
  const needed = Math.ceil(total * PASS_RATIO);

  // ---------- Helpers for the different question types ----------
  function blank(q) {
    if (!q) return null;
    if (q.type === "text") return "";
    if (q.type === "custom" && emptyValue) return emptyValue(q);
    return null;
  }

  function hasAnswer(q, value) {
    if (q.type === "text") return normalize(value) !== "";
    if (q.type === "custom" && canSubmit) return canSubmit(q, value);
    return value !== null;
  }

  function isCorrect(q, value) {
    if (q.type === "text") return q.answers.map(normalize).includes(normalize(value));
    if (q.type === "custom" && checkAnswer) return checkAnswer(q, value);
    return value === q.answerIndex;
  }

  // ---------- Actions ----------
  function startGame() {
    setIndex(0);
    setSelected(blank(questions[0]));
    setResult(null);
    setScore(0);
    setSessionXp(0);
    setHintsUsed(0);
    setTimeUp(false);
    setAttempt(0);
    setFirstTry(true);
    setSummary(null);
    setPhase("playing");
  }

  function handleSubmit() {
    if (!hasAnswer(current, selected)) return;
    const correct = isCorrect(current, selected);

    if (firstTry) {
      const saved = recordAnswer(stageId, current.id, correct);
      if (correct) setScore((s) => s + 1);
      setSessionXp((x) => x + saved.xpEarned);
      setResult({ correct, xpEarned: saved.xpEarned, practice: saved.practice, scored: true });
    } else {
      // Retry attempts are practice only
      setResult({ correct, xpEarned: 0, practice: true, scored: false });
    }
  }

  // After a wrong answer: try the same question again (practice)
  function handleRetryQuestion() {
    setSelected(blank(current));
    setResult(null);
    setTimeUp(false);
    setFirstTry(false);
    setAttempt((a) => a + 1);
  }

  // After time is up: restart the same question (still a first try)
  function handleTimeUpRetry() {
    setSelected(blank(current));
    setTimeUp(false);
    setAttempt((a) => a + 1);
  }

  function handleNext() {
    if (!isLast) {
      setIndex(index + 1);
      setSelected(blank(questions[index + 1]));
      setResult(null);
      setTimeUp(false);
      setFirstTry(true);
      setAttempt(0);
    } else {
      setSummary(completeStage(stageId, score, total));
      setPhase("result");
    }
  }

  // Time is up and the player skips: counts as a missed question
  function handleSkip() {
    recordAnswer(stageId, current.id, false);
    handleNext();
  }

  // =====================================================
  // SCREEN 1: INTRO
  // =====================================================
  if (phase === "intro") {
    return (
      <>
        <Navbar />
        <main className="page game-page">
          <button className="back-link" onClick={() => navigate(level.path)}>
            <ArrowLeft size={16} /> Back to {level.name} missions
          </button>

          <section className="card intro-card">
            <div className="game-title">
              {Icon && <Icon size={34} />}
              <div>
                <span className="tag">Mission briefing</span>
                <h1>{title}</h1>
              </div>
            </div>

            <p className="intro-text">{intro}</p>

            <h3>HOW TO PLAY</h3>
            <ol className="instruction-list">
              {instructions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>

            <div className="meta-grid">
              <div>
                <strong>{total}</strong>
                <span>Questions</span>
              </div>
              <div>
                <strong>{timePerQuestion ? `${timePerQuestion}s` : "None"}</strong>
                <span>Timer per question</span>
              </div>
              <div>
                <strong>+{XP_PER_CORRECT} XP</strong>
                <span>Per new correct answer</span>
              </div>
              <div>
                <strong>+{STAGE_BONUS_XP} XP</strong>
                <span>Stage completion bonus</span>
              </div>
            </div>

            <p className="muted small">
              You need {needed} of {total} correct (first try) to complete this mission.
              {alreadyDone &&
                " You already completed this mission, so replaying is practice mode (no repeated XP)."}
            </p>

            <div className="game-controls">
              <button className="btn btn-primary" onClick={startGame}>
                <Play size={16} /> Start Mission
              </button>
              <button className="btn btn-ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }

  // =====================================================
  // SCREEN 3: RESULT
  // =====================================================
  if (phase === "result" && summary) {
    const xpEarned = sessionXp + summary.bonusXp;

    // Whole level finished: show the big celebration screen
    if (summary.levelCompleted) {
      return (
        <>
          <Navbar />
          <LevelCompleteScreen
            level={level}
            nextLevel={nextLevel}
            score={score}
            total={total}
            xpEarned={xpEarned}
            newAchievements={summary.newAchievements}
            onDashboard={() => navigate("/dashboard")}
            onNext={() => navigate(nextLevel ? nextLevel.path : "/certificate")}
          />
        </>
      );
    }

    return (
      <>
        <Navbar />
        <main className="page game-page">
          <section className="card result-card">
            <div className={`result-icon ${summary.passed ? "pass" : "fail"}`}>
              {summary.passed ? <Trophy size={48} /> : <XCircle size={48} />}
            </div>
            <h1>{summary.passed ? "MISSION COMPLETE" : "MISSION NOT COMPLETE YET"}</h1>
            <p className="muted">
              {summary.passed
                ? "Great investigation, Agent!"
                : `You need ${needed} of ${total} correct on the first try. Review the explanations and try again.`}
            </p>

            <div className="result-stats">
              <div>
                <strong>
                  {score}/{total}
                </strong>
                <span>Score</span>
              </div>
              <div>
                <strong>+{xpEarned}</strong>
                <span>XP earned</span>
              </div>
              <div>
                <strong>{hintsUsed}</strong>
                <span>Hints used</span>
              </div>
            </div>

            {summary.newAchievements.length > 0 && (
              <div className="new-badges">
                <h3>NEW BADGES</h3>
                <ul>
                  {summary.newAchievements.map((badge) => (
                    <li key={badge.id}>
                      <Star size={14} /> {badge.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="game-controls center">
              <button className="btn btn-primary" onClick={startGame}>
                <RotateCcw size={16} /> {summary.passed ? "Play Again (Practice)" : "Retry Mission"}
              </button>
              <button className="btn btn-outline" onClick={() => navigate(level.path)}>
                Back to missions
              </button>
              <button className="btn btn-ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }

  // =====================================================
  // SCREEN 2: PLAYING
  // =====================================================
  const customInput =
    current.type === "custom" && renderInput
      ? renderInput(current, {
          value: selected,
          setValue: setSelected,
          locked: Boolean(result) || timeUp,
          submitted: Boolean(result),
          correct: result ? result.correct : false,
        })
      : null;

  return (
    <>
      <Navbar />
      <main className="page game-page">
        <div className="game-header">
          <button className="back-link" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={16} /> Dashboard
          </button>

          <div className="game-meta">
            <span className="score-chip">
              Score {score}/{total}
            </span>
            {timePerQuestion > 0 && (
              <Timer
                key={`${index}-${attempt}`}
                seconds={timePerQuestion}
                running={!result && !timeUp}
                onTimeUp={() => setTimeUp(true)}
              />
            )}
          </div>
        </div>

        <h1 className="game-heading">
          {Icon && <Icon size={26} />} {title}
        </h1>

        <ProgressBar
          value={((index + (result ? 1 : 0)) / total) * 100}
          label={`Question ${index + 1} of ${total}`}
        />

        <QuestionCard
          question={current}
          visual={renderVisual ? renderVisual(current) : null}
          selected={selected}
          submitted={Boolean(result)}
          locked={Boolean(result) || timeUp}
          correct={result ? result.correct : false}
          input={customInput}
          onSelect={setSelected}
        />

        {/* ---------- Time is up ---------- */}
        {timeUp && !result && (
          <div className="feedback error" role="alert">
            <div className="feedback-head">
              <Clock size={20} />
              <strong>Time's up!</strong>
            </div>
            <p>No problem, take your time. You can try this question again or skip it.</p>
            <div className="game-controls">
              <button className="btn btn-primary" onClick={handleTimeUpRetry}>
                <RotateCcw size={16} /> Retry Question
              </button>
              <button className="btn btn-outline" onClick={handleSkip}>
                Skip Question
              </button>
            </div>
          </div>
        )}

        {/* ---------- Feedback after submitting ---------- */}
        {result && (
          <div className={`feedback ${result.correct ? "success" : "error"}`} role="status">
            <div className="feedback-head">
              {result.correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              <strong>
                {result.correct ? "Correct! Well done." : "Not quite. Here is what to learn:"}
              </strong>
              {result.xpEarned > 0 && <span className="xp-pill">+{result.xpEarned} XP</span>}
            </div>
            <p>{current.explanation}</p>
            {result.correct && result.scored && result.xpEarned === 0 && (
              <p className="muted small">Practice mode: you already earned XP for this question.</p>
            )}
            {!result.scored && (
              <p className="muted small">Practice attempt: this does not change your score.</p>
            )}
          </div>
        )}

        {/* ---------- Buttons ---------- */}
        <div className="game-controls">
          {!result && !timeUp && (
            <>
              <HintBox
                key={`hint-${index}-${attempt}`}
                hint={current.hint}
                onUse={() => setHintsUsed((h) => h + 1)}
              />
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!hasAnswer(current, selected)}
              >
                Submit Answer
              </button>
            </>
          )}

          {result && (
            <>
              {!result.correct && (
                <button className="btn btn-outline" onClick={handleRetryQuestion}>
                  <RotateCcw size={16} /> Try Again
                </button>
              )}
              <button className="btn btn-primary" onClick={handleNext}>
                {isLast ? "Finish Mission" : "Next Question"} <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}