// achievements.js – badge definitions.
// Each badge has a check() function that returns true when it should be earned.
import { LEVELS, ALL_STAGES } from "./levels.js";

const isDone = (progress, stageId) =>
  Boolean(progress.stages[stageId] && progress.stages[stageId].completed);

const levelStageIds = (levelId) =>
  LEVELS.find((level) => level.id === levelId).stages.map((s) => s.id);

const allDone = (progress, ids) => ids.every((id) => isDone(progress, id));

export const ACHIEVEMENTS = [
  {
    id: "first-mission",
    title: "First Mission Completed",
    description: "Complete any stage.",
    icon: "flag",
    check: (p) => Object.values(p.stages).some((s) => s.completed),
  },
  {
    id: "password-guardian",
    title: "Password Guardian",
    description: "Complete the Password Guardian stage.",
    icon: "key",
    check: (p) => isDone(p, "password-guardian"),
  },
  {
    id: "link-detective",
    title: "Link Detective",
    description: "Complete the Link Detective stage.",
    icon: "link",
    check: (p) => isDone(p, "link-detective"),
  },
  {
    id: "phishing-expert",
    title: "Phishing Expert",
    description: "Complete the Phishing Investigator stage.",
    icon: "mail",
    check: (p) => isDone(p, "phishing-investigator"),
  },
  {
    id: "beginner-champion",
    title: "Beginner Champion",
    description: "Complete all Beginner stages.",
    icon: "trophy",
    check: (p) => allDone(p, levelStageIds("beginner")),
  },
  {
    id: "cyber-defender",
    title: "Cyber Defender",
    description: "Complete all Intermediate stages.",
    icon: "shield",
    check: (p) => allDone(p, levelStageIds("intermediate")),
  },
  {
    id: "ghost-master",
    title: "Ghost Protocol Master",
    description: "Complete every stage in the game.",
    icon: "crown",
    check: (p) => allDone(p, ALL_STAGES.map((s) => s.id)),
  },
];