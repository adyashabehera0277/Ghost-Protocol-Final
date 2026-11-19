// SocialEngineering.jsx – Intermediate Stage 3.
import { Users, MessageSquare } from "lucide-react";
import QuizGame from "../components/QuizGame.jsx";
import { SOCIAL_QUESTIONS } from "../data/questions.js";

// A simulated conversation or real-life situation
function renderVisual(question) {
  const { channel, lines } = question.visual;
  return (
    <div className="scenario-card">
      <div className="email-banner">
        <MessageSquare size={14} /> Simulated situation: {channel}
      </div>
      <div className="chat">
        {lines.map((line, i) => (
          <p key={i} className="chat-line">
            <strong>{line.who}</strong>
            <span>{line.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default function SocialEngineering() {
  return (
    <QuizGame
      stageId="social-engineering"
      title="SOCIAL ENGINEERING DETECTIVE"
      icon={Users}
      intro="The easiest way into a system is often through a person. Attackers pretend to be someone trusted, rush you, or play on your curiosity. Study five realistic situations and recognise the manipulation tactic in each. All people and organisations are fictional."
      instructions={[
        "Read the simulated situation carefully.",
        "Look for impersonation, urgency, fear, curiosity and requests for sensitive information.",
        "Choose the answer that names the tactic or the safest action.",
        "Read the explanation after each answer. It teaches you how to respond.",
      ]}
      questions={SOCIAL_QUESTIONS}
      renderVisual={renderVisual}
    />
  );
}