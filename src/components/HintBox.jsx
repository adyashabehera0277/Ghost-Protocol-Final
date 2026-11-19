// HintBox.jsx – shows a small clue when the player presses "Hint".
// The parent changes its `key` for each question so the hint hides again.
import { useState } from "react";
import { Lightbulb } from "lucide-react";

export default function HintBox({ hint, onUse }) {
  const [shown, setShown] = useState(false);

  function reveal() {
    setShown(true);
    if (onUse) onUse();
  }

  if (!shown) {
    return (
      <button type="button" className="btn btn-ghost btn-small" onClick={reveal}>
        <Lightbulb size={16} /> Hint
      </button>
    );
  }

  return (
    <p className="hint-text">
      <Lightbulb size={16} /> {hint}
    </p>
  );
}