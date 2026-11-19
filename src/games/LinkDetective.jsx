// LinkDetective.jsx – Beginner Stage 2.
import { Search, Globe } from "lucide-react";
import QuizGame from "../components/QuizGame.jsx";
import { LINK_QUESTIONS } from "../data/questions.js";

// A fake browser address bar. The link is plain text and cannot be clicked.
function renderVisual(question) {
  if (!question.visual) return null;
  return (
    <div className="address-bar-wrap">
      <span className="visual-label">Fictional web address (not clickable)</span>
      <div className="address-bar">
        <Globe size={16} />
        <code>{question.visual.url}</code>
      </div>
    </div>
  );
}

export default function LinkDetective() {
  return (
    <QuizGame
      stageId="link-detective"
      title="LINK DETECTIVE"
      icon={Search}
      intro="Attackers hide dangerous websites behind links that look normal. Examine each web address like a detective and spot misleading domains and spelling tricks. All links are fictional and none of them can be opened."
      instructions={[
        "Read the web address slowly, one part at a time.",
        "Decide whether it looks safer or suspicious.",
        "The real website name is the part right before the first single slash.",
        "Press Hint if you need a clue, then Submit Answer.",
      ]}
      questions={LINK_QUESTIONS}
      renderVisual={renderVisual}
    />
  );
}