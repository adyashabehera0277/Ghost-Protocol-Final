// storage.js – safe helpers for localStorage + the demo login system.
//
// IMPORTANT (security note for your report/viva):
// This is a FRONTEND-ONLY prototype. The login is only a SIMULATION.
//  - Passwords are NEVER saved anywhere (not in localStorage, not in memory
//    after the login finishes).
//  - Only non-sensitive profile info (name, email, username) is saved.
//  - Real, secure authentication always needs a backend server.

// ---------- Storage keys (all in one place so we never mistype them) ----------
export const KEYS = {
  USERS: "gp_users", // list of registered demo profiles (no passwords)
  SESSION: "gp_session", // who is logged in right now
  PROGRESS: "gp_progress", // game progress (used from Part 3 onwards)
};

// ---------- Basic safe helpers ----------

// Read a value. If it is missing or broken, return the fallback instead of crashing.
export function readStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Could not read storage key:", key, error);
    return fallback;
  }
}

// Save a value (converted to JSON text).
export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn("Could not write storage key:", key, error);
    return false;
  }
}

// Delete one key.
export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Could not remove storage key:", key, error);
  }
}

// Build a per-user key, e.g. userKey("gp_progress", "Agent") -> "gp_progress_agent"
// This keeps every player's progress separate.
export function userKey(base, username) {
  return `${base}_${String(username).toLowerCase()}`;
}

// ---------- Demo account (shown on the login page) ----------
export const DEMO_ACCOUNT = {
  fullName: "Demo Agent",
  email: "agent@ghostprotocol.demo",
  username: "agent",
  password: "Ghost@123", // public demo password, only compared in code
};

// ---------- Validation helpers ----------
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function isValidUsername(username) {
  return /^[A-Za-z0-9_]{3,20}$/.test(username);
}

export function isStrongEnough(password) {
  // At least 8 characters, with at least one letter and one number
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}

// ---------- Registered users ----------
function getUsers() {
  const users = readStorage(KEYS.USERS, []);
  return Array.isArray(users) ? users : [];
}

// Register a new demo user. We store ONLY non-sensitive profile data.
export function registerUser({ fullName, email, username }) {
  const users = getUsers();
  const emailLower = email.toLowerCase();
  const userLower = username.toLowerCase();

  const reservedDemo =
    userLower === DEMO_ACCOUNT.username || emailLower === DEMO_ACCOUNT.email;
  const exists = users.some(
    (u) => u.username.toLowerCase() === userLower || u.email.toLowerCase() === emailLower
  );

  if (reservedDemo || exists) {
    return { ok: false, message: "That username or email is already registered." };
  }

  const profile = {
    fullName: fullName.trim(),
    email: email.trim(),
    username: username.trim(),
    createdAt: new Date().toISOString(),
  };
  users.push(profile);
  writeStorage(KEYS.USERS, users);
  return { ok: true, message: "Account created! You can now log in." };
}

// ---------- Session ----------
// "Remember me" ON  -> session kept in localStorage (survives closing the browser)
// "Remember me" OFF -> session kept in sessionStorage (ends when the tab closes)
function saveSession(profile, remember) {
  const session = {
    fullName: profile.fullName,
    email: profile.email,
    username: profile.username,
    loggedInAt: new Date().toISOString(),
  };
  try {
    if (remember) {
      localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
      sessionStorage.removeItem(KEYS.SESSION);
    } else {
      sessionStorage.setItem(KEYS.SESSION, JSON.stringify(session));
      localStorage.removeItem(KEYS.SESSION);
    }
  } catch (error) {
    console.warn("Could not save session:", error);
  }
  return session;
}

// Who is logged in? Returns the session object or null.
export function getSession() {
  try {
    const raw =
      localStorage.getItem(KEYS.SESSION) || sessionStorage.getItem(KEYS.SESSION);
    const session = raw ? JSON.parse(raw) : null;
    return session && session.username ? session : null;
  } catch (error) {
    return null;
  }
}

export function isLoggedIn() {
  return getSession() !== null;
}

// Simulated login.
//  - Demo account: the password must match the public demo password.
//  - Registered accounts: we never stored a password, so the login only
//    checks that the account exists (this is just a simulation).
export function loginUser(identifier, password, remember) {
  const id = identifier.trim().toLowerCase();

  // 1. Demo account
  if (id === DEMO_ACCOUNT.username || id === DEMO_ACCOUNT.email) {
    if (password !== DEMO_ACCOUNT.password) {
      return { ok: false, message: "Incorrect password for the demo account." };
    }
    const session = saveSession(DEMO_ACCOUNT, remember);
    return { ok: true, message: "Access granted. Welcome back, Agent!", session };
  }

  // 2. Registered accounts
  const user = getUsers().find(
    (u) => u.username.toLowerCase() === id || u.email.toLowerCase() === id
  );
  if (!user) {
    return { ok: false, message: "No agent found with that username or email." };
  }
  const session = saveSession(user, remember);
  return { ok: true, message: "Access granted. Welcome back, Agent!", session };
}

// Logout: remove the session from both storages.
export function logoutUser() {
  removeStorage(KEYS.SESSION);
  try {
    sessionStorage.removeItem(KEYS.SESSION);
  } catch (error) {
    /* ignore */
  }
}