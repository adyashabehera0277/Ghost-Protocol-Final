// LevelCompleteScreen.jsx – celebration screen when a whole level is finished.
// If there is no next level, it becomes the special "Ghost Protocol Master" screen.
import { Trophy, Unlock, Star, Crown } from "lucide-react";

export default function LevelCompleteScreen({
  level,
  nextLevel,
  score,
  total,
  xpEarned,
  newAchievements,
  onDashboard,
  onNext,
}) {
  const isMaster = !nextLevel; // the last level (Pro) was just finished

  return (
    <main className={`page level-complete accent-${level.accent} ${isMaster ? "master" : ""}`}>
      <div className="complete-glow" />

      <div className="complete-trophy">{isMaster ? <Crown size={64} /> : <Trophy size={64} />}</div>

      <span className="tag">{isMaster ? "All levels complete" : `Level ${level.number} complete`}</span>

      {isMaster ? (
        <h1>
          MISSION <span className="gradient-text">ACCOMPLISHED</span>
        </h1>
      ) : (
        <h1>
          {level.name} <span className="gradient-text">COMPLETE</span>
        </h1>
      )}

      <p className="muted complete-text">
        {isMaster
          ? "You solved the Final Security Mission and completed every level. You have earned the title Ghost Protocol Master!"
          : `Outstanding work, Agent! You finished all three ${level.name} missions.`}
      </p>

      <div className="result-stats">
        <div>
          <strong>
            {score}/{total}
          </strong>
          <span>Final stage score</span>
        </div>
        <div>
          <strong>+{xpEarned}</strong>
          <span>XP earned</span>
        </div>
      </div>

      {newAchievements.length > 0 && (
        <div className="new-badges">
          <h3>NEW BADGES</h3>
          <ul>
            {newAchievements.map((badge) => (
              <li key={badge.id}>
                <Star size={14} /> {badge.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {nextLevel ? (
        <div className="unlock-banner">
          <Unlock size={20} /> {nextLevel.name} LEVEL UNLOCKED
        </div>
      ) : (
        <div className="unlock-banner">
          <Crown size={20} /> GHOST PROTOCOL MASTER
        </div>
      )}

      <div className="game-controls center">
        <button className="btn btn-primary" onClick={onNext}>
          {nextLevel ? `Start ${nextLevel.name}` : "View Certificate"}
        </button>
        <button className="btn btn-outline" onClick={onDashboard}>
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}