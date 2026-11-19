// Navbar.jsx – top navigation bar shown on every page after login.
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logoutUser } from "../utils/storage.js";

// The menu items. Easy to edit: just change this list.
const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learn", label: "Learn Cybersecurity", icon: BookOpen },
  { to: "/progress", label: "My Progress", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // for the mobile menu
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="logo">
          <ShieldCheck size={26} />
          GHOST PROTOCOL
        </Link>

        {/* Hamburger button (visible only on small screens) */}
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}

          <button className="nav-link logout" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}