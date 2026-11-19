// DailyChallenge.jsx – one question per day. The bonus XP can be earned once per day.
import { useState } from "react";
import { CalendarCheck, CheckCircle2, XCircle } from "lucide-react";
import { getDailyChallenge, getTodayString } from "../data/dailyContent.js";
import { claimDailyBonus } from "../utils/gameProgress.js";
import { DAILY_BONUS_XP } from "../utils/scoring.js";

export default function DailyChallenge({ progress }) {
  const today = getTodayString();
  const challenge = getDailyChallenge(today);
  const doneToday = progress.daily.lastCompleted === today;

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function handleSubmit() {
    if (selected === null) {
      setFeedback({ type: "info", text: "Choose an answer first." });
      return;
    }
    if (selected === challenge.answerIndex) {
      claimDailyBonus(today); // gives XP only if not already claimed today
      setFeedback({ type: "success", text: `Correct! +${DAILY_BONUS_XP} bonus XP.` });
    } else {
      setFeedback({ type: "error", text: "Not quite. Think again and try once more." });
    }
  }

  return (
    <section className="card daily-card">
      <div className="section-head">
        <CalendarCheck size={20} />
        <h3>DAILY CYBER CHALLENGE</h3>
      </div>

      <p className="daily-question">{challenge.question}</p>

      {doneToday ? (
        <div className="daily-done">
          <CheckCircle2 size={20} />
          <div>
            <strong>Completed today. Come back tomorrow!</strong>
            <p className="muted">{challenge.explanation}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="option-list">
            {challenge.options.map((option, index) => (
              <button
                key={option}
                type="button"
                className={`option ${selected === index ? "selected" : ""}`}
                onClick={() => {
                  setSelected(index);
                  setFeedback(null);
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <p className={`daily-feedback ${feedback.type}`}>
              {feedback.type === "error" && <XCircle size={16} />} {feedback.text}
            </p>
          )}

          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Answer (+{DAILY_BONUS_XP} XP)
          </button>
        </>
      )}
    </section>
  );
}