// levels.js – all levels and stages in one place.
// To rename a game or change its question count, edit it here.

export const LEVELS = [
  {
    id: "beginner",
    number: "01",
    name: "BEGINNER",
    title: "START YOUR JOURNEY",
    description:
      "Learn the fundamentals of cybersecurity through simple and enjoyable challenges.",
    topics: ["Password Safety", "Suspicious Link Detection", "Phishing Awareness"],
    buttonLabel: "START BEGINNER",
    path: "/beginner",
    accent: "cyan",
    stages: [
      {
        id: "password-guardian",
        name: "Password Guardian",
        summary: "Classify passwords as weak, medium or strong.",
        path: "/beginner/password-guardian",
        totalQuestions: 5,
      },
      {
        id: "link-detective",
        name: "Link Detective",
        summary: "Spot suspicious and misleading website links.",
        path: "/beginner/link-detective",
        totalQuestions: 5,
      },
      {
        id: "phishing-investigator",
        name: "Phishing Investigator",
        summary: "Decide whether simulated emails are safe or phishing.",
        path: "/beginner/phishing-investigator",
        totalQuestions: 5,
      },
    ],
  },
  {
    id: "intermediate",
    number: "02",
    name: "INTERMEDIATE",
    title: "BECOME A DEFENDER",
    description:
      "Improve your investigation skills and learn to recognize common cyber threats.",
    topics: [
      "Phishing Email Investigation",
      "Firewall and Network Security",
      "Social Engineering",
    ],
    buttonLabel: "START INTERMEDIATE",
    path: "/intermediate",
    accent: "purple",
    stages: [
      {
        id: "email-investigation",
        name: "Email Investigation",
        summary: "Inspect sender, subject and links in detailed emails.",
        path: "/intermediate/email-investigation",
        totalQuestions: 5,
      },
      {
        id: "firewall-challenge",
        name: "Firewall Challenge",
        summary: "Choose safe routes through a simulated network.",
        path: "/intermediate/firewall-challenge",
        totalQuestions: 5,
      },
      {
        id: "social-engineering",
        name: "Social Engineering Detective",
        summary: "Identify manipulation tactics in real-life situations.",
        path: "/intermediate/social-engineering",
        totalQuestions: 5,
      },
    ],
  },
  {
    id: "pro",
    number: "03",
    name: "PRO",
    title: "MASTER CYBERSECURITY",
    description:
      "Test your knowledge through challenging security puzzles and missions.",
    topics: ["Cryptography", "Network Threat Investigation", "Final Security Mission"],
    buttonLabel: "START PRO",
    path: "/pro",
    accent: "magenta",
    stages: [
      {
        id: "cryptography-lab",
        name: "Cryptography Lab",
        summary: "Decode Caesar cipher messages using clues.",
        path: "/pro/cryptography-lab",
        totalQuestions: 5,
      },
      {
        id: "network-investigation",
        name: "Network Threat Investigation",
        summary: "Find suspicious activity on a simulated network dashboard.",
        path: "/pro/network-investigation",
        totalQuestions: 5,
      },
      {
        id: "final-mission",
        name: "Final Security Mission",
        summary: "Combine every clue to solve the final puzzle.",
        path: "/pro/final-mission",
        totalQuestions: 5,
      },
    ],
  },
];

// A flat list of all 9 stages (handy for loops)
export const ALL_STAGES = LEVELS.flatMap((level) => level.stages);

export function getLevelById(id) {
  return LEVELS.find((level) => level.id === id);
}

export function getStageById(id) {
  return ALL_STAGES.find((stage) => stage.id === id);
}

// Which level does a stage belong to?
export function getLevelOfStage(stageId) {
  return LEVELS.find((level) => level.stages.some((s) => s.id === stageId));
}