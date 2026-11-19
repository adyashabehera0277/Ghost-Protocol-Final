// QuestionCard.jsx – the question, an optional picture, and the answer area.
// The answer area can be: multiple-choice buttons, a text box, or a custom input.
import { CheckCircle2, XCircle } from "lucide-react";

const LETTERS = ["A", "B", "C", "D", "E"];

export default function QuestionCard({
  question,
  visual,
  selected,
  submitted,
  locked,
  correct,
  input,
  onSelect,
}) {
  const isText = question.type === "text";

  return (
    <section className="card question-card">
      <h2 className="question-prompt">{question.prompt}</h2>

      {visual}

      {/* 1) Custom input (for example the firewall maze) */}
      {input && <div className="custom-input">{input}</div>}

      {/* 2) Typed answer */}
      {!input && isText && (
        <div className="text-answer">
          <label htmlFor="answer-input" className="visual-label">
            Your answer
          </label>
          <input
            id="answer-input"
            className={`input answer-input ${submitted ? (correct ? "correct" : "wrong") : ""}`}
            type="text"
            value={selected ?? ""}
            placeholder={question.placeholder || "Type your answer"}
            onChange={(e) => onSelect(e.target.value)}
            disabled={locked}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      )}

      {/* 3) Multiple choice */}
      {!input && !isText && (
        <div className="answer-list">
          {question.options.map((option, i) => {
            let state = "";
            if (submitted) {
              if (i === question.answerIndex) state = "correct";
              else if (i === selected) state = "wrong";
            } else if (i === selected) {
              state = "selected";
            }

            return (
              <button
                key={i}
                type="button"
                className={`answer ${state}`}
                onClick={() => onSelect(i)}
                disabled={locked}
              >
                <span className="answer-letter">{LETTERS[i]}</span>
                <span className="answer-text">{option}</span>
                {state === "correct" && <CheckCircle2 size={18} className="answer-icon" />}
                {state === "wrong" && <XCircle size={18} className="answer-icon" />}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}