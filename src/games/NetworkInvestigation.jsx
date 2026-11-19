// NetworkInvestigation.jsx – Pro Stage 2.
// A simulated network monitor. No real network is touched.
import { Activity } from "lucide-react";
import QuizGame from "../components/QuizGame.jsx";
import { NETWORK_QUESTIONS } from "../data/questions.js";

function renderVisual(question) {
  const { events, note } = question.visual;
  return (
    <div className="net-dashboard">
      <div className="net-dash-head">
        <span>
          <Activity size={16} /> NETWORK MONITOR (simulated)
        </span>
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
            {events.map((e, i) => (
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

      {note && <p className="email-note">{note}</p>}
    </div>
  );
}

export default function NetworkInvestigation() {
  return (
    <QuizGame
      stageId="network-investigation"
      title="NETWORK THREAT INVESTIGATION"
      icon={Activity}
      intro="Security analysts watch network activity for unusual behaviour. Study five simulated monitor logs and find the suspicious events. All addresses are fictional and the data is simulated, so nothing connects to a real network."
      instructions={[
        "Read the log table and the context note.",
        "Look for patterns: many ports, many failed logins, huge uploads, floods and strange destinations.",
        "Remember that routine events such as backups and updates are normal.",
        "You have 2 minutes per log. If time runs out you can retry.",
      ]}
      questions={NETWORK_QUESTIONS}
      renderVisual={renderVisual}
      timePerQuestion={120}
    />
  );
}