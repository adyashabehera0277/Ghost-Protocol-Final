// Timer.jsx – a simple countdown.
// The parent gives it a different `key` for every new question,
// which restarts the timer automatically.
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function Timer({ seconds, running, onTimeUp }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (!running) return; // paused (for example after answering)

    if (left <= 0) {
      onTimeUp();
      return;
    }

    const id = setTimeout(() => setLeft((value) => value - 1), 1000);
    return () => clearTimeout(id);
  }, [running, left]);

  const minutes = Math.floor(left / 60);
  const secs = String(left % 60).padStart(2, "0");

  return (
    <div className={`timer ${left <= 10 ? "low" : ""}`} aria-label="Time left">
      <Clock size={16} />
      {minutes}:{secs}
    </div>
  );
}