// GameCard.jsx – one stage (game) card on the level page.
import { CheckCircle2, Play, RotateCcw } from "lucide-react";

const LABELS = { completed: "Completed", inprogress: "In progress", new: "Not started" };

export default function GameCard({ stage, number, status, bestScore, onPlay }) {
  return (
    <article className={`card hoverable game-card ${status}`}>
      <div className="game-card-top">
        <span className="stage-number">STAGE {number}</span>
        <span className={`status-chip ${status}`}>
          {status === "completed" && <CheckCircle2 size={14} />} {LABELS[status]}
        </span>
      </div>

      <h3>{stage.name}</h3>
      <p className="muted">{stage.summary}</p>
      <p className="best-score">
        Best score: {bestScore}/{stage.totalQuestions}
      </p>

      <button className="btn btn-primary btn-block" onClick={onPlay}>
        {status === "completed" ? (
          <>
            <RotateCcw size={14} /> Play Again (Practice)
          </>
        ) : (
          <>
            <Play size={14} /> {status === "inprogress" ? "Continue" : "Start Mission"}
          </>
        )}
      </button>
    </article>
  );
}