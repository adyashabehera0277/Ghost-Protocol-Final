// dailyContent.js – the Daily Cyber Challenge questions and Security Tips.
// One challenge and one tip are chosen per day automatically.

export const DAILY_CHALLENGES = [
  {
    id: "d1",
    question: "Which of these passwords is the strongest?",
    options: ["password123", "Sunny2020", "Tr@in-Moon-Coffee-47!", "qwerty"],
    answerIndex: 2,
    explanation:
      "Long passwords that mix words, numbers and symbols are hard to guess. Common ones like 'password123' and 'qwerty' are the first ones attackers try.",
  },
  {
    id: "d2",
    question: "Which web address looks suspicious?",
    options: [
      "https://www.examplebank.com/login",
      "https://examplebank.com.secure-login.biz/verify",
      "https://help.examplebank.com",
      "https://www.examplebank.com/contact",
    ],
    answerIndex: 1,
    explanation:
      "The real domain is the part just before the first single slash. Here it is 'secure-login.biz', not 'examplebank.com'. Attackers hide a trusted name at the start.",
  },
  {
    id: "d3",
    question: "An email says: 'Your account closes in 1 hour! Click now!' What is the biggest warning sign?",
    options: [
      "It mentions your account",
      "It creates fake urgency and pressure",
      "It has a subject line",
      "It arrived on a weekday",
    ],
    answerIndex: 1,
    explanation:
      "Phishing emails rush you so you don't think. Real companies rarely threaten you with a one-hour deadline.",
  },
  {
    id: "d4",
    question: "What does two-factor authentication (2FA) add to your login?",
    options: [
      "A second proof of identity besides your password",
      "A faster internet connection",
      "An automatically longer password",
      "A free antivirus",
    ],
    answerIndex: 0,
    explanation:
      "2FA asks for something extra, like a code on your phone. Even if your password leaks, an attacker still can't log in.",
  },
  {
    id: "d5",
    question: "What does a firewall mainly do?",
    options: [
      "Speeds up downloads",
      "Filters network traffic using security rules",
      "Backs up your files",
      "Deletes spam emails",
    ],
    answerIndex: 1,
    explanation:
      "A firewall checks traffic going in and out of a network and blocks anything that breaks the rules.",
  },
  {
    id: "d6",
    question: "What does ransomware do?",
    options: [
      "Locks or encrypts your files and demands payment",
      "Makes your computer faster",
      "Updates your software",
      "Blocks pop-up ads",
    ],
    answerIndex: 0,
    explanation:
      "Ransomware holds your data hostage. Regular backups and not opening unknown attachments are the best protection.",
  },
  {
    id: "d7",
    question: "What is the safest habit on public Wi-Fi?",
    options: [
      "Log in to your bank as usual",
      "Avoid sensitive accounts unless the connection is protected (for example, with a VPN)",
      "Share the Wi-Fi password with strangers",
      "Turn off your screen lock",
    ],
    answerIndex: 1,
    explanation:
      "Public networks can be watched by others. Keep sensitive activity for trusted, protected connections.",
  },
  {
    id: "d8",
    question: "A caller says they are 'IT support' and asks for your password. What should you do?",
    options: [
      "Share it quickly to fix the problem",
      "Refuse, then verify using an official contact number",
      "Share only half of it",
      "Send it by chat instead",
    ],
    answerIndex: 1,
    explanation:
      "Real IT teams never need your password. This is social engineering: pretending to be someone trusted.",
  },
  {
    id: "d9",
    question: "Encryption changes readable data into what?",
    options: [
      "A bigger file",
      "Unreadable code that needs a key to open",
      "A printed copy",
      "A faster message",
    ],
    answerIndex: 1,
    explanation:
      "Encryption scrambles information so only someone with the right key can read it (decryption).",
  },
  {
    id: "d10",
    question: "Why should you not use the same password on every website?",
    options: [
      "It is hard to type",
      "If one site leaks it, attackers can try it on your other accounts",
      "Websites forbid it",
      "It makes the internet slower",
    ],
    answerIndex: 1,
    explanation:
      "Leaked passwords are reused in automatic attacks on other sites. A unique password limits the damage.",
  },
];

export const SECURITY_TIPS = [
  "Use a different password for every important account.",
  "Hover over a link before clicking it to see where it really goes.",
  "Turn on two-factor authentication wherever it is offered.",
  "Real companies never ask for your password by email or phone.",
  "Keep your phone and computer updated. Updates fix security holes.",
  "Be careful with urgent messages. Pause and verify first.",
  "Back up important files so ransomware can't hold them hostage.",
  "Avoid sensitive logins on public Wi-Fi.",
  "Longer passwords beat short complicated ones. Try a passphrase.",
  "If something feels too good to be true, it is probably a scam.",
];

// Today's date as text, using the local time zone, e.g. "2026-11-19"
export function getTodayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

// Turn a date string into a day number so each day picks a different item
function dayNumber(dateString) {
  const [y, m, d] = dateString.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

export function getDailyChallenge(dateString = getTodayString()) {
  return DAILY_CHALLENGES[dayNumber(dateString) % DAILY_CHALLENGES.length];
}

export function getTodayTip(dateString = getTodayString()) {
  return SECURITY_TIPS[dayNumber(dateString) % SECURITY_TIPS.length];
}