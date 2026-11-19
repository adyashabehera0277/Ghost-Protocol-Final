// scoring.js – XP values, ranks and simple score maths.

export const XP_PER_CORRECT = 10; // first correct answer for each question
export const STAGE_BONUS_XP = 50; // first time a stage is completed
export const DAILY_BONUS_XP = 25; // once per day
export const PASS_RATIO = 0.6; // you need 60% correct to complete a stage

// Ranks depend only on total XP
export const RANKS = [
  { name: "Rookie", minXp: 0 },
  { name: "Cyber Defender", minXp: 150 },
  { name: "Cyber Expert", minXp: 400 },
  { name: "Ghost Protocol Master", minXp: 700 },
];

// Returns the current rank and how far you are from the next one.
export function getRank(xp) {
  let index = 0;
  RANKS.forEach((rank, i) => {
    if (xp >= rank.minXp) index = i;
  });

  const current = RANKS[index];
  const next = RANKS[index + 1] || null;

  let percentToNext = 100;
  let xpToNext = 0;
  if (next) {
    const span = next.minXp - current.minXp;
    percentToNext = Math.round(((xp - current.minXp) / span) * 100);
    xpToNext = next.minXp - xp;
  }

  return { name: current.name, index, next, percentToNext, xpToNext };
}

// Accuracy = correct answers / questions attempted (as a whole number %)
export function getAccuracy(stats) {
  if (!stats || !stats.attempted) return 0;
  return Math.round((stats.correct / stats.attempted) * 100);
}