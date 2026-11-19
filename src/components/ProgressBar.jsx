// ProgressBar.jsx – a reusable progress bar (value from 0 to 100).
export default function ProgressBar({ value = 0, label }) {
  const safe = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="progress">
      <div className="progress-head">
        <span>{label}</span>
        <span>{safe}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${safe}%` }} />
      </div>
    </div>
  );
}