// KnowledgeHub.jsx – simple definitions of cybersecurity terms + Security Tip of the Day.
import { useState } from "react";
import {
  ShieldCheck,
  Fish,
  Bug,
  KeyRound,
  Flame,
  Lock,
  Unlock,
  Users,
  Smartphone,
  Link2,
  Lightbulb,
  Search,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { getTodayTip } from "../data/dailyContent.js";

const TERMS = [
  {
    title: "Cybersecurity",
    icon: ShieldCheck,
    text: "Protecting computers, networks and data from digital attacks, theft and damage.",
  },
  {
    title: "Phishing",
    icon: Fish,
    text: "Fake emails or messages that trick you into giving passwords or personal details.",
  },
  {
    title: "Malware",
    icon: Bug,
    text: "Harmful software, like viruses and spyware, built to damage or spy on a device.",
  },
  {
    title: "Ransomware",
    icon: KeyRound,
    text: "Malware that locks your files and demands money to give them back.",
  },
  {
    title: "Firewall",
    icon: Flame,
    text: "A security guard for a network. It allows or blocks traffic based on rules.",
  },
  {
    title: "Encryption",
    icon: Lock,
    text: "Scrambling information into unreadable code so only people with the key can read it.",
  },
  {
    title: "Decryption",
    icon: Unlock,
    text: "Turning scrambled information back into readable form using the correct key.",
  },
  {
    title: "Social Engineering",
    icon: Users,
    text: "Tricking people (not computers) into revealing secrets, often by pretending to be trusted.",
  },
  {
    title: "Strong Passwords",
    icon: KeyRound,
    text: "Long, unique passwords that mix letters, numbers and symbols, and are never reused.",
  },
  {
    title: "Two-Factor Authentication",
    icon: Smartphone,
    text: "A second check, like a code on your phone, in addition to your password.",
  },
  {
    title: "Suspicious URLs",
    icon: Link2,
    text: "Web addresses with misspelled names or fake domains that try to look like real sites.",
  },
];

export default function KnowledgeHub() {
  const [search, setSearch] = useState("");

  const visible = TERMS.filter((term) =>
    (term.title + " " + term.text).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="page">
        <span className="tag">Knowledge Hub</span>
        <h1>
          LEARN <span className="gradient-text">CYBERSECURITY</span>
        </h1>
        <p className="muted">Simple explanations of the key ideas you will meet in the missions.</p>

        <section className="card tip-card">
          <Lightbulb size={26} />
          <div>
            <h3>SECURITY TIP OF THE DAY</h3>
            <p>{getTodayTip()}</p>
          </div>
        </section>

        <div className="search-box">
          <Search size={18} />
          <input
            className="input"
            type="text"
            placeholder="Search a term, e.g. phishing"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <section className="term-grid">
          {visible.map(({ title, icon: Icon, text }) => (
            <article key={title} className="card hoverable term-card">
              <div className="term-icon">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </article>
          ))}
          {visible.length === 0 && <p className="muted">No terms found. Try another word.</p>}
        </section>
      </main>
    </>
  );
}