// LevelCard.jsx – one difficulty card on the dashboard.
import { Lock, CheckCircle2, Circle } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";

export default function LevelCard({ level, percent, locked, completedStages, onStart }) {
  const finished = percent === 100;

  return (
    <article
      className={`level-card card hoverable accent-${level.accent} ${locked ? "locked" : ""}`}
    >
      <div className="level-top">
        <span className="tag">LEVEL {level.number}</span>
        {locked && <Lock size={20} className="level-icon" aria-label="Locked" />}
        {!locked && finished && <CheckCircle2 size={20} className="level-icon done" aria-label="Completed" />}
      </div>

      <h3 className="level-name">{level.name}</h3>
      <h4 className="level-title">{level.title}</h4>
      <p className="muted">{level.description}</p>

      <ul className="level-topics">
        {level.topics.map((topic) => (
          <li key={topic}>
            <Circle size={8} /> {topic}
          </li>
        ))}
      </ul>

      <ProgressBar
        value={percent}
        label={`${completedStages}/${level.stages.length} stages`}
      />

      <button
        className={`btn btn-block ${locked ? "btn-outline" : "btn-primary"}`}
        onClick={() => onStart(level)}
      >
        {locked && <Lock size={14} />}
        {locked ? "Locked" : level.buttonLabel}
      </button>
    </article>
  );
}