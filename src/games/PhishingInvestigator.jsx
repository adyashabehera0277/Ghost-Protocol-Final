// PhishingInvestigator.jsx – Beginner Stage 3.
// Slightly harder: it has a relaxed 90-second timer for each email.
import { MailWarning, Mail } from "lucide-react";
import QuizGame from "../components/QuizGame.jsx";
import { PHISHING_QUESTIONS } from "../data/questions.js";

// A simulated email card
function renderVisual(question) {
  const email = question.visual;
  if (!email) return null;
  return (
    <div className="email-card">
      <div className="email-banner">
        <Mail size={14} /> Simulated email. All names, addresses and links are fictional.
      </div>
      <dl className="email-meta">
        <div>
          <dt>From</dt>
          <dd>{email.from}</dd>
        </div>
        <div>
          <dt>Subject</dt>
          <dd>{email.subject}</dd>
        </div>
      </dl>
      <p className="email-body">{email.body}</p>
      {email.note && <p className="email-note">{email.note}</p>}
    </div>
  );
}

export default function PhishingInvestigator() {
  return (
    <QuizGame
      stageId="phishing-investigator"
      title="PHISHING INVESTIGATOR"
      icon={MailWarning}
      intro="Your inbox has received five messages. Some are genuine and some are phishing attempts. Check the sender, the subject, the message and any links, then decide. Be careful: not every email is a trap."
      instructions={[
        "Read the sender, subject and message of each simulated email.",
        "Look for urgency, odd sender addresses, suspicious links and requests for private data.",
        "Choose the answer that best describes the email and explains why.",
        "You have a relaxed 90 seconds per email. If time runs out you can retry.",
      ]}
      questions={PHISHING_QUESTIONS}
      renderVisual={renderVisual}
      timePerQuestion={90}
    />
  );
}