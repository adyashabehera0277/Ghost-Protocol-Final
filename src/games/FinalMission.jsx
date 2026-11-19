// FinalMission.jsx – Pro Stage 3: Operation Ghost Key.
// Combines passwords, phishing, cryptography and network analysis.
import { Crosshair, Mail, ShieldAlert } from "lucide-react";
import QuizGame from "../components/QuizGame.jsx";
import { FINAL_QUESTIONS } from "../data/questions.js";

// Different "mission files" use different pictures
function renderVisual(question) {
  const v = question.visual;

  if (v.kind === "story") {
    return (
      <div className="mission-story">
        <span className="visual-label">{v.title}</span>
        <p>{v.text}</p>
      </div>
    );
  }

  if (v.kind === "messages") {
    return (
      <div className="msg-grid">
        {v.messages.map((m) => (
          <div key={m.label} className="msg-card">
            <strong>
              <Mail size={14} /> {m.label}
            </strong>
            <small>From: {m.from}</small>
            <p>{m.text}</p>
          </div>
        ))}
      </div>
    );
  }

  if (v.kind === "cipher") {
    return (
      <div className="crypto-box">
        <span className="visual-label">Attacker's encrypted note</span>
        <code className="cipher-text">{v.cipher}</code>
        <p className="crypto-clue">{v.clue}</p>
      </div>
    );
  }

  if (v.kind === "log") {
    return (
      <div className="net-dashboard">
        <div className="net-dash-head">
          <span>NETWORK LOG (simulated)</span>
          <span className="live">● LIVE</span>
        </div>
        <div className="table-wrap">
          <table className="log-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Port</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              {v.events.map((e, i) => (
                <tr key={i}>
                  <td>{e.time}</td>
                  <td>{e.src}</td>
                  <td>{e.dst}</td>
                  <td>{e.port}</td>
                  <td>{e.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {v.note && <p className="email-note">{v.note}</p>}
      </div>
    );
  }

  if (v.kind === "board") {
    return (
      <div className="clue-board">
        <span className="visual-label">
          <ShieldAlert size={14} /> Mission clue board
        </span>
        <ul>
          {v.clues.map((clue) => (
            <li key={clue}>{clue}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

export default function FinalMission() {
  return (
    <QuizGame
      stageId="final-mission"
      title="FINAL SECURITY MISSION"
      icon={Crosshair}
      intro="OPERATION GHOST KEY. Ghost Corp's vault is under attack, and only you can stop it. Collect four clues from four mission files: a weak password, a phishing message, an encrypted note and a network log. Then combine them to enter the shutdown code. Everything here is fictional."
      instructions={[
        "Work through five mission files in order. Each one gives you a clue.",
        "File 3 needs a typed answer, and the final puzzle needs the clues you collected.",
        "The clue board in the final puzzle lists all four clues if you forget one.",
        "You have 2.5 minutes per file. If time runs out you can retry.",
      ]}
      questions={FINAL_QUESTIONS}
      renderVisual={renderVisual}
      timePerQuestion={150}
    />
  );
}