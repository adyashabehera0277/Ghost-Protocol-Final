// PasswordGuardian.jsx – Beginner Stage 1.
import { KeyRound } from "lucide-react";
import QuizGame from "../components/QuizGame.jsx";
import { PASSWORD_QUESTIONS } from "../data/questions.js";

// The picture shown above the answers (only for questions that have a password)
function renderVisual(question) {
  if (!question.visual) return null;
  return (
    <div className="password-display">
      <span className="visual-label">Fictional example password</span>
      <code>{question.visual.password}</code>
    </div>
  );
}

export default function PasswordGuardian() {
  return (
    <QuizGame
      stageId="password-guardian"
      title="PASSWORD GUARDIAN"
      icon={KeyRound}
      intro="A vault protecting company secrets is guarded by weak passwords. As a new agent, you must judge how strong each password is and learn the habits that keep accounts safe. All passwords here are fictional."
      instructions={[
        "Read each question carefully.",
        "Choose one answer and press Submit Answer.",
        "Use the Hint button if you are stuck. It gives a clue, not the answer.",
        "After each answer you will see an explanation of the idea behind it.",
      ]}
      questions={PASSWORD_QUESTIONS}
      renderVisual={renderVisual}
    />
  );
}