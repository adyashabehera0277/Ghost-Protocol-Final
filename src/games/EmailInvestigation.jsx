// EmailInvestigation.jsx – Intermediate Stage 1.
import { Mail, Paperclip, ArrowRight } from "lucide-react";
import QuizGame from "../components/QuizGame.jsx";
import { EMAIL_QUESTIONS } from "../data/questions.js";

// A detailed simulated email, including the REAL destination of each link
function renderVisual(question) {
  const email = question.visual;
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
        {email.replyTo && (
          <div>
            <dt>Reply-To</dt>
            <dd>{email.replyTo}</dd>
          </div>
        )}
        <div>
          <dt>Subject</dt>
          <dd>{email.subject}</dd>
        </div>
      </dl>

      <p className="email-body">{email.body}</p>

      {email.links.length > 0 && (
        <ul className="email-links">
          {email.links.map((link) => (
            <li key={link.url}>
              <span>
                <small>Shown text</small>
                {link.text}
              </span>
              <ArrowRight size={14} />
              <span>
                <small>Real destination</small>
                <code>{link.url}</code>
              </span>
            </li>
          ))}
        </ul>
      )}

      {email.attachment && (
        <div className="email-attachment">
          <Paperclip size={14} /> <code>{email.attachment}</code>
        </div>
      )}

      {email.note && <p className="email-note">{email.note}</p>}
    </div>
  );
}

export default function EmailInvestigation() {
  return (
    <QuizGame
      stageId="email-investigation"
      title="EMAIL INVESTIGATION"
      icon={Mail}
      intro="You are now a junior investigator. Five detailed emails need your expert eye. Inspect the sender, the Reply-To address, the subject, the real link destinations and any attachments before you decide. Some emails are genuine, so avoid false alarms!"
      instructions={[
        "Read every part of the email, including the Reply-To line and the real link destination.",
        "Compare domains. Does the sender match the company's real domain?",
        "Choose the best conclusion and press Submit Answer.",
        "You have 2 minutes per email. If time runs out you can retry.",
      ]}
      questions={EMAIL_QUESTIONS}
      renderVisual={renderVisual}
      timePerQuestion={120}
    />
  );
}