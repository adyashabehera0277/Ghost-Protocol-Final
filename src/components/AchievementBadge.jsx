// AchievementBadge.jsx – shows one badge (colourful if earned, dim if locked).
import { Flag, KeyRound, Link2, MailWarning, Trophy, ShieldCheck, Crown, Lock } from "lucide-react";

const icons = {
  flag: Flag,
  key: KeyRound,
  link: Link2,
  mail: MailWarning,
  trophy: Trophy,
  shield: ShieldCheck,
  crown: Crown,
};

export default function AchievementBadge({ achievement, earned }) {
  const Icon = earned ? icons[achievement.icon] || Trophy : Lock;

  return (
    <div className={`badge-card ${earned ? "earned" : "locked"}`} title={achievement.description}>
      <div className="badge-icon">
        <Icon size={24} />
      </div>
      <strong>{achievement.title}</strong>
      <span>{earned ? "Earned" : achievement.description}</span>
    </div>
  );
}