// questions.js – all game questions live here.
// Each question has:
//   id          – unique text id (used to save progress, never change it later)
//   prompt      – the question shown to the player
//   visual      – extra data for the game's picture (password, URL, email...)
//   options     – the answer choices
//   answerIndex – position of the correct option (0 = first option)
//   hint        – a small clue (does not reveal the answer)
//   explanation – shown after answering, teaches the concept
//
// IMPORTANT: every game must have exactly 5 questions
// (this matches "totalQuestions: 5" in levels.js).
// All passwords, URLs and emails are FICTIONAL examples.

// ---------------------------------------------------------------
// BEGINNER – STAGE 1: PASSWORD GUARDIAN
// ---------------------------------------------------------------
export const PASSWORD_QUESTIONS = [
  {
    id: "pw-1",
    prompt: "How strong is this fictional password?",
    visual: { password: "password123" },
    options: ["Weak", "Medium", "Strong"],
    answerIndex: 0,
    hint: "Is this one of the most common passwords in the world?",
    explanation:
      "'password123' is a common word with a simple number. Attackers try lists of common passwords first, so it is cracked almost instantly. Avoid common words and easy number patterns.",
  },
  {
    id: "pw-2",
    prompt: "How strong is this fictional password?",
    visual: { password: "Sunshine2020" },
    options: ["Weak", "Medium", "Strong"],
    answerIndex: 1,
    hint: "The length is decent, but is the pattern predictable?",
    explanation:
      "It has 12 characters with capitals, lowercase letters and numbers, which is good. But it is built from a dictionary word and a guessable year, and has no symbols. That makes it medium: better than weak, but not strong.",
  },
  {
    id: "pw-3",
    prompt: "How strong is this fictional password?",
    visual: { password: "Tr@in-Moon-Coffee-47!" },
    options: ["Weak", "Medium", "Strong"],
    answerIndex: 2,
    hint: "Count the length and the different types of characters.",
    explanation:
      "It is long (21 characters), mixes capitals, lowercase letters, numbers and symbols, and uses unrelated words. Length and variety make a password hard to guess.",
  },
  {
    id: "pw-4",
    prompt: "Which habit keeps your accounts the safest?",
    visual: null,
    options: [
      "Use one strong password for every account",
      "Use a different password for each account",
      "Change one letter for each site (pass1, pass2, pass3)",
      "Write passwords on a sticky note on your monitor",
    ],
    answerIndex: 1,
    hint: "If one website is hacked, what happens to your other accounts?",
    explanation:
      "Unique passwords limit the damage. If one site leaks a password, attackers try it on other sites, so reusing it (even with small changes) puts all your accounts at risk. A password manager can help you remember them.",
  },
  {
    id: "pw-5",
    prompt: "Which of these should you AVOID putting in a password?",
    visual: null,
    options: [
      "A mix of letters, numbers and symbols",
      "At least 12 characters",
      "Your name or birthday",
      "Several unrelated words",
    ],
    answerIndex: 2,
    hint: "Think about what someone who knows you could easily guess.",
    explanation:
      "Names, birthdays and pet names are easy to guess or find on social media. Strong passwords use length, variety and unrelated words.",
  },
];

// ---------------------------------------------------------------
// BEGINNER – STAGE 2: LINK DETECTIVE
// ---------------------------------------------------------------
export const LINK_QUESTIONS = [
  {
    id: "link-1",
    prompt: "Does this fictional link look safer or suspicious?",
    visual: { url: "https://www.examplebank.com/login" },
    options: ["Safer-looking", "Suspicious"],
    answerIndex: 0,
    hint: "Read the domain name carefully, letter by letter.",
    explanation:
      "The domain is exactly 'examplebank.com' and it uses https. Nothing looks odd. 'Safer-looking' never means 100% safe, though, so still be careful with links you did not expect.",
  },
  {
    id: "link-2",
    prompt: "Does this fictional link look safer or suspicious?",
    visual: { url: "http://examp1ebank.com/verify-account" },
    options: ["Safer-looking", "Suspicious"],
    answerIndex: 1,
    hint: "Look very closely at the spelling of the bank's name.",
    explanation:
      "The letter 'l' was replaced with the number '1' ('examp1ebank'). Attackers register look-alike names to fool quick readers. It also uses plain http, not https.",
  },
  {
    id: "link-3",
    prompt: "Does this fictional link look safer or suspicious?",
    visual: { url: "https://examplebank.com.secure-login.biz/update" },
    options: ["Safer-looking", "Suspicious"],
    answerIndex: 1,
    hint: "Which part comes right before the first single slash? That is the real domain.",
    explanation:
      "The real domain is the last part before the first '/', which is 'secure-login.biz', not 'examplebank.com'. Attackers put a trusted name at the start to mislead you.",
  },
  {
    id: "link-4",
    prompt: "You get a text from an unknown number with a link and a 'prize'. What is the safest action?",
    visual: null,
    options: [
      "Tap the link to see what it is",
      "Ignore or delete it, and visit official sites by typing their address yourself",
      "Forward it to your friends",
      "Reply with your details to claim the prize",
    ],
    answerIndex: 1,
    hint: "Never let an unknown message decide where you go.",
    explanation:
      "Unknown links can lead to fake sites or harmful downloads. The safe habit is to avoid unknown links and open official sites yourself.",
  },
  {
    id: "link-5",
    prompt: "Does this fictional link look safer or suspicious?",
    visual: { url: "https://shop.examplestore.com/orders" },
    options: ["Safer-looking", "Suspicious"],
    answerIndex: 0,
    hint: "Look at the LAST part of the domain, just before the first slash.",
    explanation:
      "'shop' is a subdomain of 'examplestore.com'. The main domain at the end is the part that counts, and it is correct. Do not mark every link with extra words as suspicious.",
  },
];

// ---------------------------------------------------------------
// BEGINNER – STAGE 3: PHISHING INVESTIGATOR
// ---------------------------------------------------------------
export const PHISHING_QUESTIONS = [
  {
    id: "phish-1",
    prompt: "Is this email safe or suspicious?",
    visual: {
      from: "Examplebank Security <alert@examplebank-secure.support>",
      subject: "URGENT: Account suspended - verify within 1 hour",
      body:
        "Dear customer,\n\nWe noticed unusual activity. Your account will be CLOSED in 1 hour unless you confirm your password here:\nhttp://examplebank-verify.example/login\n\nExamplebank Security Team",
      note: "Context: you do have an account with Examplebank.",
    },
    options: [
      "Safe: banks often send security alerts",
      "Suspicious: fake urgency and a request for your password through a link",
      "Safe: it mentions my real bank",
      "Suspicious: only because it has a subject line",
    ],
    answerIndex: 1,
    hint: "Would a real bank give you one hour and ask for your password through a link?",
    explanation:
      "Warning signs: a threat with a short deadline, a request for your password, a strange sender domain ('examplebank-secure.support') and a suspicious link. Banks never ask for passwords by email.",
  },
  {
    id: "phish-2",
    prompt: "Is this email safe or suspicious?",
    visual: {
      from: "Priya Sharma <priya.sharma@collegeexample.edu>",
      subject: "Project meeting moved to Thursday 3 PM",
      body:
        "Hi team,\n\nOur meeting is now in Lab 2 at 3 PM on Thursday. Please bring your updated report. No reply needed.\n\nPriya",
      note: "Context: Priya is a classmate in your project group.",
    },
    options: [
      "Suspicious: it came from an unknown sender",
      "Safe: known sender, normal request, no links, no private information asked",
      "Suspicious: meetings are never sent by email",
      "Safe: only because it is short",
    ],
    answerIndex: 1,
    hint: "Look for a link, urgency, or any request for private information.",
    explanation:
      "Not every email is phishing. This one comes from a known person at the college domain, has a normal purpose, and asks for nothing sensitive. Good investigators check the evidence instead of distrusting everything.",
  },
  {
    id: "phish-3",
    prompt: "Is this email safe or suspicious?",
    visual: {
      from: "Examplestore Rewards <offers@examp1estore-rewards.example>",
      subject: "Congratulations! You won a gift card worth Rs. 50,000",
      body:
        "You are our lucky winner!\n\nClaim now: http://claim-prize.example/winner\nEnter your card number to pay a small shipping fee.",
      note: "Context: you never entered any contest.",
    },
    options: [
      "Phishing: a too-good-to-be-true prize that asks for card details",
      "Safe: gift cards are normal rewards",
      "Safe: it uses the name of a store I like",
      "Suspicious only because it mentions money",
    ],
    answerIndex: 0,
    hint: "Why would a free prize need your card number?",
    explanation:
      "You cannot win a contest you did not enter, and real prizes never need your card number. The sender name also uses 'examp1estore' with a number 1. Prize scams are very common phishing tricks.",
  },
  {
    id: "phish-4",
    prompt: "Is this email safe or suspicious?",
    visual: {
      from: "IT Helpdesk <helpdesk.college@mail-example.xyz>",
      subject: "Your college mailbox is full",
      body:
        "Hello,\n\nYour mailbox storage is full. Click 'Upgrade Storage' below and sign in with your college password to keep receiving mail.\n\n[ Upgrade Storage ]",
      note: "Context: your college's real email domain is collegeexample.edu.",
    },
    options: [
      "Safe: IT Helpdesk is a trusted name",
      "Phishing: the display name looks official, but the sender address is from an outside domain and it asks for your password",
      "Safe: a full mailbox is a believable problem",
      "Phishing: only because it says 'Hello'",
    ],
    answerIndex: 1,
    hint: "Compare the sender's address with your college's real domain.",
    explanation:
      "Attackers can set any display name, like 'IT Helpdesk'. The real clue is the address: 'mail-example.xyz' is not 'collegeexample.edu'. Real IT teams never ask you to sign in through an email button.",
  },
  {
    id: "phish-5",
    prompt: "Is this email safe or suspicious?",
    visual: {
      from: "ExampleCourier <no-reply@examplecourier.com>",
      subject: "Your parcel is on the way (Order #48213)",
      body:
        "Hi,\n\nYour parcel will arrive tomorrow. You can track it in the ExampleCourier app or on examplecourier.com.\n\nWe will never ask for your password or card details by email.",
      note: "Context: you ordered something online two days ago.",
    },
    options: [
      "Looks safe: matching sender domain, no pressure, no private data requested, and tracking is through the official app or site",
      "Phishing: parcels are never announced by email",
      "Phishing: because it contains an order number",
      "Safe: so click every link inside immediately",
    ],
    answerIndex: 0,
    hint: "Check the sender domain, any pressure, and any request for private data.",
    explanation:
      "The sender domain matches, there is no threat, and nothing sensitive is requested. Even so, the safest habit is to track parcels in the official app or by typing the site address yourself.",
  },
];
// =================================================================
// PART 5 QUESTIONS (append below the Beginner questions)
// Question types:
//   (no type)  = multiple choice, uses options + answerIndex
//   "text"     = the player types an answer, uses answers: [...]
//   "custom"   = special input (the firewall maze)
// =================================================================

// ---------------------------------------------------------------
// INTERMEDIATE – STAGE 1: EMAIL INVESTIGATION
// ---------------------------------------------------------------
export const EMAIL_QUESTIONS = [
  {
    id: "email-1",
    prompt: "Inspect the sender and the link. What is the STRONGEST evidence that this email is phishing?",
    visual: {
      from: "Payroll Department <payroll@examplecorp-hr.help>",
      subject: "Action required: updated salary slip available",
      body: "Hello,\n\nYour new salary slip for this month is ready. Please log in to view it and confirm your bank details.",
      links: [{ text: "View salary slip", url: "http://examplecorp-payroll.example/login" }],
      note: "Context: your company's real email domain is examplecorp.com.",
    },
    options: [
      "The email greets you politely",
      "The sender and link domains do not match the company's real domain (examplecorp.com)",
      "The email is about salary",
      "The email contains a button",
    ],
    answerIndex: 1,
    hint: "Compare the sender's domain with the company's real domain in the context note.",
    explanation:
      "Real HR emails come from your company's own domain. Here the sender uses 'examplecorp-hr.help' and the link goes to a different outside site. Polite greetings, salary topics and buttons also appear in real emails, so they are not proof.",
  },
  {
    id: "email-2",
    prompt: "The link text looks official. What does the real destination tell you?",
    visual: {
      from: "Examplebank Alerts <alerts@examplebank.com>",
      subject: "Review your recent sign-in",
      body: "We noticed a sign-in from a new device. If this was not you, please review your account activity.",
      links: [{ text: "www.examplebank.com/security", url: "http://examplebank.verify-now.example/security" }],
      note: "Both the shown link text and its real destination are displayed below.",
    },
    options: [
      "Nothing, only the shown text matters",
      "The real destination belongs to a different domain, so the link is misleading",
      "It is safe because it contains the word 'security'",
      "It is safe because the sender name says examplebank.com",
    ],
    answerIndex: 1,
    hint: "Compare 'Shown text' with 'Real destination'. The real domain is the part before the first single slash.",
    explanation:
      "The shown text says examplebank.com, but the real destination's domain is 'verify-now.example'. Sender names can be faked too, so always check where a link really goes before clicking.",
  },
  {
    id: "email-3",
    prompt: "Which attack is this email most likely attempting?",
    visual: {
      from: "Rahul Mehta (CEO) <rahul.mehta.ceo@mail-example.net>",
      replyTo: "rahul.private.office@mail-example.org",
      subject: "Quick favour - confidential",
      body: "Hi,\n\nI am in a meeting and cannot take calls. I need 5 gift cards of Rs. 10,000 each for a client today. Buy them now and send me the codes by reply. I will repay you tomorrow. Please keep this confidential.\n\nRahul",
      links: [],
      note: "Context: Rahul Mehta is your real CEO. The company's email domain is examplecorp.com.",
    },
    options: [
      "Impersonation of a senior person with an urgent payment request",
      "A harmless internal notice",
      "A virus hidden in an attachment",
      "A routine marketing newsletter",
    ],
    answerIndex: 0,
    hint: "Who is the sender pretending to be, and what are they demanding?",
    explanation:
      "This is 'CEO fraud'. Warning signs: an outside email domain, a different Reply-To address, secrecy, urgency, 'no calls', and gift card codes that are hard to trace. Always verify such requests using a phone number you already know.",
  },
  {
    id: "email-4",
    prompt: "Inspect this email. What is the best conclusion?",
    visual: {
      from: "Examplestore Orders <orders@examplestore.com>",
      subject: "Your order #48213 has shipped",
      body: "Hi,\n\nGood news! Your order has shipped and should arrive on Friday. You can track it any time from your account.\n\nThanks for shopping with us.",
      links: [{ text: "Track your order", url: "https://www.examplestore.com/track/48213" }],
      note: "Context: you placed an order with Examplestore two days ago.",
    },
    options: [
      "It is phishing because it contains a link",
      "It looks genuine: the domains match and nothing urgent or private is requested",
      "It is phishing because it says 'Good news'",
      "It is safe, so you should enter your card details through the link",
    ],
    answerIndex: 1,
    hint: "Check whether the sender and link domains match, and whether anything is demanded.",
    explanation:
      "Real emails also contain links. Here the domains match, there is no pressure, no private data is requested, and it fits an order you made. You can still open the official site yourself instead of clicking.",
  },
  {
    id: "email-5",
    prompt: "Look at the attachment name. What is the danger?",
    visual: {
      from: "Accounts <accounts@examplevendor.com>",
      subject: "Invoice 88123 attached",
      body: "Hello,\n\nPlease find the invoice attached. Open it today to avoid a late fee.",
      links: [],
      attachment: "Invoice_88123.pdf.exe",
      note: "Context: you have never worked with this vendor before.",
    },
    options: [
      "None, it is a normal PDF file",
      "It ends in .exe, so it is a program disguised as a PDF and may be malware",
      "PDF files are always dangerous",
      "The word 'Invoice' is the danger",
    ],
    answerIndex: 1,
    hint: "Read the file name from the END. What is the real file type?",
    explanation:
      "The LAST extension decides the file type. '.pdf.exe' is a program with a fake PDF name, and opening it could install malware. Be careful with unexpected attachments and pressure to open them quickly.",
  },
];

// ---------------------------------------------------------------
// INTERMEDIATE – STAGE 2: FIREWALL CHALLENGE (interactive maze)
// Blocked nodes (red) cannot be entered.
// Risky nodes look normal but break the rules, so the route fails.
// ---------------------------------------------------------------
export const FIREWALL_LEVELS = [
  {
    id: "fw-1",
    type: "custom",
    prompt: "Level 1: Guide the data from Your PC to the Web Server.",
    visual: {
      start: "pc",
      target: "web",
      blocked: ["unk"],
      risky: ["guest"],
      rules: [
        "All traffic to the server must pass through the firewall.",
        "Guest Wi-Fi is untrusted.",
        "Red nodes are blocked by the firewall.",
      ],
      nodes: [
        { id: "pc", label: "Your PC", x: 60, y: 165 },
        { id: "rt", label: "Router", x: 190, y: 165 },
        { id: "fw", label: "Firewall", x: 330, y: 165 },
        { id: "web", label: "Web Server", x: 535, y: 165 },
        { id: "guest", label: "Guest Wi-Fi", x: 330, y: 55 },
        { id: "unk", label: "Unknown Host", x: 190, y: 270 },
      ],
      edges: [
        ["pc", "rt"],
        ["rt", "fw"],
        ["fw", "web"],
        ["rt", "guest"],
        ["guest", "web"],
        ["rt", "unk"],
        ["unk", "fw"],
      ],
    },
    hint: "One path skips the firewall. Which device would let traffic bypass it?",
    explanation:
      "Safe route: Your PC, Router, Firewall, Web Server. The Guest Wi-Fi path reaches the server without passing the firewall, which breaks rule 1. A firewall inspects traffic and blocks unknown hosts.",
  },
  {
    id: "fw-2",
    type: "custom",
    prompt: "Level 2: Reach the Database using only trusted connections.",
    visual: {
      start: "pc",
      target: "db",
      blocked: ["ftp"],
      risky: ["vpn"],
      rules: [
        "Only approved servers may talk to the database.",
        "Unknown VPNs are untrusted.",
        "The old FTP port is closed (blocked).",
      ],
      nodes: [
        { id: "pc", label: "Office PC", x: 50, y: 165 },
        { id: "sw", label: "Switch", x: 170, y: 165 },
        { id: "fw", label: "Firewall", x: 295, y: 165 },
        { id: "app", label: "App Server", x: 415, y: 165 },
        { id: "db", label: "Database", x: 545, y: 165 },
        { id: "vpn", label: "Unknown VPN", x: 295, y: 55 },
        { id: "ftp", label: "Old FTP Port", x: 415, y: 270 },
      ],
      edges: [
        ["pc", "sw"],
        ["sw", "fw"],
        ["fw", "app"],
        ["app", "db"],
        ["sw", "vpn"],
        ["vpn", "db"],
        ["fw", "ftp"],
        ["ftp", "db"],
      ],
    },
    hint: "The database should only be reached through an approved server behind the firewall.",
    explanation:
      "Safe route: Office PC, Switch, Firewall, App Server, Database. The unknown VPN is untrusted, and the old FTP port is closed. This is the idea of network access control: only approved paths are allowed.",
  },
  {
    id: "fw-3",
    type: "custom",
    prompt: "Level 3: Reach the File Server. The direct path is blocked, so find a safe detour.",
    visual: {
      start: "pc",
      target: "fs",
      blocked: ["tel"],
      risky: [],
      rules: [
        "Telnet (port 23) sends data in plain text, so it is blocked.",
        "Use only firewall-filtered or encrypted paths.",
        "There is more than one correct route.",
      ],
      nodes: [
        { id: "pc", label: "Staff Laptop", x: 50, y: 170 },
        { id: "rt", label: "Router", x: 160, y: 170 },
        { id: "tel", label: "Telnet Port", x: 285, y: 170 },
        { id: "fw", label: "Firewall", x: 285, y: 60 },
        { id: "px", label: "Approved Proxy", x: 415, y: 60 },
        { id: "ssh", label: "SSH Gateway", x: 285, y: 270 },
        { id: "fs", label: "File Server", x: 545, y: 170 },
      ],
      edges: [
        ["pc", "rt"],
        ["rt", "tel"],
        ["tel", "fs"],
        ["rt", "fw"],
        ["fw", "px"],
        ["px", "fs"],
        ["rt", "ssh"],
        ["ssh", "fs"],
      ],
    },
    hint: "The shortest road is closed. Look for the firewall-filtered path or the encrypted gateway.",
    explanation:
      "Two safe routes exist: via the Firewall and Approved Proxy, or via the encrypted SSH Gateway. Telnet is blocked because anyone watching the network could read its plain-text data.",
  },
  {
    id: "fw-4",
    type: "custom",
    prompt: "Level 4: A guest phone needs the Internet. Keep it away from the Staff Network.",
    visual: {
      start: "gp",
      target: "net",
      blocked: ["dns"],
      risky: ["staff"],
      rules: [
        "Guest devices may reach only the Internet.",
        "Guests must never touch the Staff Network.",
        "The open DNS relay is blocked.",
      ],
      nodes: [
        { id: "gp", label: "Guest Phone", x: 50, y: 165 },
        { id: "ap", label: "Guest Access Point", x: 175, y: 165 },
        { id: "fw", label: "Firewall", x: 310, y: 165 },
        { id: "net", label: "Internet", x: 545, y: 165 },
        { id: "staff", label: "Staff Network", x: 310, y: 55 },
        { id: "dns", label: "Open DNS Relay", x: 310, y: 270 },
      ],
      edges: [
        ["gp", "ap"],
        ["ap", "fw"],
        ["fw", "net"],
        ["ap", "staff"],
        ["staff", "net"],
        ["ap", "dns"],
        ["dns", "net"],
      ],
    },
    hint: "Which route reaches the Internet without passing through the Staff Network?",
    explanation:
      "Safe route: Guest Phone, Guest Access Point, Firewall, Internet. Keeping guests separate from staff systems is called network segmentation, and firewalls enforce it.",
  },
  {
    id: "fw-5",
    type: "custom",
    prompt: "Level 5 (final): Move the admin's data to the Secure Backup without breaking any rule.",
    visual: {
      start: "pc",
      target: "bk",
      blocked: ["tun"],
      risky: ["wifi", "usb"],
      rules: [
        "Admin traffic must pass through a firewall.",
        "Public Wi-Fi and unknown USB hubs are untrusted.",
        "Unlogged tunnels are blocked.",
        "Use a monitored or VPN-protected route to the backup.",
      ],
      nodes: [
        { id: "pc", label: "Admin PC", x: 40, y: 170 },
        { id: "sw", label: "Switch", x: 140, y: 170 },
        { id: "usb", label: "Unknown USB Hub", x: 140, y: 60 },
        { id: "wifi", label: "Public Wi-Fi", x: 140, y: 265 },
        { id: "fw1", label: "Edge Firewall", x: 270, y: 95 },
        { id: "fw2", label: "Internal Firewall", x: 270, y: 245 },
        { id: "ids", label: "Monitoring Sensor", x: 400, y: 95 },
        { id: "vpn", label: "Company VPN", x: 400, y: 245 },
        { id: "tun", label: "Unlogged Tunnel", x: 400, y: 170 },
        { id: "bk", label: "Secure Backup", x: 550, y: 170 },
      ],
      edges: [
        ["pc", "sw"],
        ["pc", "wifi"],
        ["wifi", "vpn"],
        ["sw", "usb"],
        ["usb", "tun"],
        ["tun", "bk"],
        ["sw", "fw1"],
        ["sw", "fw2"],
        ["fw1", "ids"],
        ["ids", "bk"],
        ["fw2", "vpn"],
        ["vpn", "bk"],
      ],
    },
    hint: "Start from the Switch. Both safe routes go through a firewall first.",
    explanation:
      "Safe routes: Switch, Edge Firewall, Monitoring Sensor, Backup, or Switch, Internal Firewall, Company VPN, Backup. The Public Wi-Fi shortcut reaches the VPN but skips the firewall, and the USB hub leads to an unlogged tunnel. Layered security means every path is filtered and logged.",
  },
];

// ---------------------------------------------------------------
// INTERMEDIATE – STAGE 3: SOCIAL ENGINEERING DETECTIVE
// ---------------------------------------------------------------
export const SOCIAL_QUESTIONS = [
  {
    id: "social-1",
    prompt: "Which tactic is the caller mainly using?",
    visual: {
      channel: "Phone call",
      lines: [
        { who: "Caller", text: "Hello, this is Anil from IT Support. We detected a virus on your computer." },
        { who: "Caller", text: "To fix it right now, I just need your login password." },
      ],
    },
    options: [
      "Impersonation: pretending to be a trusted person or role",
      "Brute force: guessing many passwords",
      "Port scanning: probing a network",
      "Encryption: scrambling data",
    ],
    answerIndex: 0,
    hint: "Can you verify that the caller really is who they claim to be?",
    explanation:
      "Social engineering tricks people, not computers. The caller pretends to be IT support and asks for a password. Real IT teams never ask for your password. Hang up and contact IT using an official number.",
  },
  {
    id: "social-2",
    prompt: "Which TWO tactics are being used in this message?",
    visual: {
      channel: "Text message",
      lines: [
        { who: "'Manager'", text: "I am in a meeting. URGENT! Buy 3 gift cards and send me the codes." },
        { who: "'Manager'", text: "Do not call me. Just reply quickly, I will explain later." },
      ],
    },
    options: [
      "Urgency and false authority",
      "Flattery and friendship",
      "Curiosity and humour",
      "Bribery and blackmail",
    ],
    answerIndex: 0,
    hint: "Why is the sender rushing you and discouraging a phone call?",
    explanation:
      "The message uses urgency ('URGENT', 'quickly') and authority (a boss) to stop you from thinking. Telling you not to call prevents verification. Always verify unusual money requests through another channel.",
  },
  {
    id: "social-3",
    prompt: "What is this tactic called, and what is the safest action?",
    visual: {
      channel: "Real-life situation",
      lines: [
        { who: "Situation", text: "You find a USB drive in the parking lot labelled 'Salary Details 2026'." },
        { who: "Your thought", text: "I wonder whose it is... maybe I should plug it in and check." },
      ],
    },
    options: [
      "Baiting: hand it to the security or IT team and never plug it in",
      "Tailgating: plug it into a spare computer",
      "Pretexting: open the files to find the owner's name",
      "Spoofing: show it to colleagues and ask who owns it",
    ],
    answerIndex: 0,
    hint: "Curiosity is the trap. Unknown devices can carry malware.",
    explanation:
      "Baiting uses curiosity or a tempting label to make you connect something harmful. An unknown USB drive can install malware the moment it is plugged in. Give it to your security or IT team.",
  },
  {
    id: "social-4",
    prompt: "A stranger asks to follow you through a badge-only door. What is the safest response?",
    visual: {
      channel: "In person",
      lines: [
        { who: "Visitor", text: "Hi! I am from the courier company. I forgot my badge and my hands are full." },
        { who: "Visitor", text: "Could you hold the door for me? I am running late." },
      ],
    },
    options: [
      "Hold the door, they look like they are in a hurry",
      "Politely ask them to use reception, or call security to verify",
      "Give them your badge to save time",
      "Let them in only if they wear a uniform",
    ],
    answerIndex: 1,
    hint: "Badge doors protect everyone. Who should check visitors?",
    explanation:
      "This is tailgating: following an authorised person into a restricted area. Uniforms are easy to copy. Be polite but firm and send visitors to reception or security.",
  },
  {
    id: "social-5",
    prompt: "What should you do?",
    visual: {
      channel: "Phone call",
      lines: [
        { who: "Caller", text: "This is the fraud department of Examplebank. Someone is trying to withdraw money from your account." },
        { who: "Caller", text: "We just sent you a 6-digit code. Read it to me right now to cancel the transaction." },
      ],
    },
    options: [
      "Read out the code to cancel the transaction",
      "Never share the code. Hang up and call the bank using the number on your card or official website",
      "Share only the first three digits",
      "Ask the caller to send the code again by text",
    ],
    answerIndex: 1,
    hint: "One-time codes are only for YOU. Who is asking for it?",
    explanation:
      "One-time passwords (OTPs) prove that it is really you. A real bank never asks you to read them out. The caller creates fear and urgency to get the code. End the call and contact the bank yourself.",
  },
];

// ---------------------------------------------------------------
// PRO – STAGE 1: CRYPTOGRAPHY LAB (Caesar cipher, typed answers)
// ---------------------------------------------------------------
export const CRYPTO_QUESTIONS = [
  {
    id: "crypto-1",
    type: "text",
    prompt: "Decode the message. Each letter was moved 3 places FORWARD, so move each letter 3 places BACK.",
    visual: { cipher: "KHOOR", shift: 3, showShift: true, clue: "Shift = 3" },
    answers: ["HELLO"],
    placeholder: "Type the decoded word",
    hint: "Find a cipher letter in the Cipher row, then read the Plain letter above it. K points to H.",
    explanation:
      "The message is HELLO. A Caesar cipher moves every letter by a fixed number. Encryption shifts forward, and decryption shifts back by the same number.",
  },
  {
    id: "crypto-2",
    type: "text",
    prompt: "Decode this message. The shift is 5.",
    visual: { cipher: "XJHZWJ", shift: 5, showShift: true, clue: "Shift = 5" },
    answers: ["SECURE"],
    placeholder: "Type the decoded word",
    hint: "X moved back 5 places is S.",
    explanation:
      "The message is SECURE. X, J, H, Z, W, J moved back 5 places become S, E, C, U, R, E. The shift number is the 'key' that locks and unlocks the message.",
  },
  {
    id: "crypto-3",
    type: "text",
    prompt: "The shift is hidden in the clue. Work it out, then decode the message.",
    visual: {
      cipher: "KNWJBFQQ",
      showShift: false,
      clue: "Key clue: the shift equals the number of letters in the word CYBER.",
    },
    answers: ["FIREWALL"],
    placeholder: "Type the decoded word",
    hint: "Count the letters in CYBER, then move each cipher letter back that many places.",
    explanation:
      "CYBER has 5 letters, so the shift is 5. K, N, W, J, B, F, Q, Q moved back 5 places become F, I, R, E, W, A, L, L: FIREWALL. Keys are often hidden in clues, and real systems protect them carefully.",
  },
  {
    id: "crypto-4",
    type: "text",
    prompt: "Decode the two-word message. Spaces were not changed.",
    visual: {
      cipher: "IL HSLYA",
      showShift: false,
      clue: "Key clue: the shift equals the number of days in a week.",
    },
    answers: ["BE ALERT"],
    placeholder: "Type the decoded message",
    hint: "A week has 7 days. Move each letter back 7 places and keep the space where it is.",
    explanation:
      "The shift is 7. I, L, H, S, L, Y, A moved back 7 places become B, E, A, L, E, R, T: BE ALERT. Notice that letters wrap around the alphabet (A moved back goes to the end).",
  },
  {
    id: "crypto-5",
    type: "text",
    prompt: "A spy encrypted CAT as FDW with a Caesar cipher. What shift number was used?",
    visual: { cipher: "FDW", showShift: false, clue: "Known pair: CAT became FDW." },
    answers: ["3", "THREE"],
    placeholder: "Type a number",
    hint: "Count how many places C moves forward to become F.",
    explanation:
      "C to F is 3 places, A to D is 3 places, and T to W is 3 places, so the shift is 3. A known plain and encrypted pair reveals the key, which is why a simple Caesar cipher is weak. Modern encryption uses far more complex keys.",
  },
];

// ---------------------------------------------------------------
// PRO – STAGE 2: NETWORK THREAT INVESTIGATION
// All IP addresses are fictional (reserved example ranges).
// ---------------------------------------------------------------
export const NETWORK_QUESTIONS = [
  {
    id: "net-1",
    prompt: "Which activity looks suspicious?",
    visual: {
      events: [
        { time: "09:01:12", src: "10.0.0.12", dst: "10.0.0.2", port: "80", event: "Intranet page loaded" },
        { time: "09:01:40", src: "10.0.0.20", dst: "mail.examplecorp.example", port: "993", event: "Mail check" },
        { time: "09:02:03", src: "203.0.113.45", dst: "10.0.0.5", port: "21", event: "Connection attempt" },
        { time: "09:02:03", src: "203.0.113.45", dst: "10.0.0.5", port: "22", event: "Connection attempt" },
        { time: "09:02:04", src: "203.0.113.45", dst: "10.0.0.5", port: "23", event: "Connection attempt" },
        { time: "09:02:04", src: "203.0.113.45", dst: "10.0.0.5", port: "3389", event: "Connection attempt" },
      ],
      note: "Simulated data. 10.0.0.x addresses are inside your network.",
    },
    options: [
      "10.0.0.12 opening the intranet page",
      "203.0.113.45 trying many different ports on one server within seconds",
      "10.0.0.20 checking mail",
      "All of this traffic is normal",
    ],
    answerIndex: 1,
    hint: "Look for ONE outside source touching many different ports very quickly.",
    explanation:
      "Trying many ports in a few seconds is called a port scan. Attackers use it to find open doors on a server. Firewalls and monitoring tools raise alerts when they see it.",
  },
  {
    id: "net-2",
    prompt: "What attack pattern does this log show?",
    visual: {
      events: [
        { time: "02:10:01", src: "198.51.100.23", dst: "10.0.0.5", port: "22", event: "Failed login: admin" },
        { time: "02:10:02", src: "198.51.100.23", dst: "10.0.0.5", port: "22", event: "Failed login: admin" },
        { time: "02:10:02", src: "198.51.100.23", dst: "10.0.0.5", port: "22", event: "Failed login: root" },
        { time: "02:10:03", src: "198.51.100.23", dst: "10.0.0.5", port: "22", event: "Failed login: admin" },
        { time: "02:10:04", src: "198.51.100.23", dst: "10.0.0.5", port: "22", event: "Failed login: user" },
      ],
      note: "Simulated data. Port 22 is used for remote administration.",
    },
    options: [
      "Brute-force login attempts",
      "A scheduled backup",
      "A software update",
      "A video call",
    ],
    answerIndex: 0,
    hint: "Many failed logins, one second apart, from the same address.",
    explanation:
      "Repeated failed logins guessing common usernames are a brute-force attempt. Defences include strong passwords, limits on failed attempts, and two-factor authentication.",
  },
  {
    id: "net-3",
    prompt: "What should the analyst worry about MOST?",
    visual: {
      events: [
        { time: "02:14:09", src: "10.0.0.44", dst: "192.0.2.99", port: "443", event: "Upload 4.2 GB to unknown host" },
        { time: "11:30:05", src: "10.0.0.44", dst: "10.0.0.2", port: "53", event: "DNS lookup" },
        { time: "14:20:11", src: "10.0.0.44", dst: "cloud-sync.example", port: "443", event: "Upload 20 MB (daily sync)" },
      ],
      note: "Context: 10.0.0.44 is an HR laptop. 192.0.2.99 is not on the approved list.",
    },
    options: [
      "The 20 MB daily sync",
      "A huge upload to an unapproved outside host at 2 AM (possible data theft)",
      "The DNS lookup",
      "Nothing, large uploads are always normal",
    ],
    answerIndex: 1,
    hint: "Compare the size, the time of day and the destination with the normal pattern.",
    explanation:
      "A very large upload, at night, to an unknown outside host does not match the laptop's normal behaviour. It could be data exfiltration (stealing data). Unusual behaviour is a key clue in threat detection.",
  },
  {
    id: "net-4",
    prompt: "What is happening to the web server?",
    visual: {
      events: [
        { time: "17:00:01", src: "198.51.100.10", dst: "10.0.0.80", port: "80", event: "9,200 requests/second" },
        { time: "17:00:01", src: "198.51.100.11", dst: "10.0.0.80", port: "80", event: "8,900 requests/second" },
        { time: "17:00:01", src: "198.51.100.12", dst: "10.0.0.80", port: "80", event: "9,500 requests/second" },
        { time: "17:00:02", src: "198.51.100.13", dst: "10.0.0.80", port: "80", event: "9,100 requests/second" },
        { time: "17:00:02", src: "203.0.113.8", dst: "10.0.0.80", port: "80", event: "2 requests/second (normal visitor)" },
      ],
      note: "Context: 10.0.0.80 is the public web server. It normally handles about 50 requests per second.",
    },
    options: [
      "A flood of traffic from many sources is overwhelming it (denial-of-service attack)",
      "It is receiving a normal number of visitors",
      "It is installing an update",
      "It is backing up files",
    ],
    answerIndex: 0,
    hint: "Compare the requests per second with the server's normal amount.",
    explanation:
      "Thousands of requests per second from many sources, against a normal 50, is a denial-of-service flood. The goal is to overload the server so real visitors cannot use it.",
  },
  {
    id: "net-5",
    prompt: "Which ONE event should be investigated first?",
    visual: {
      events: [
        { time: "01:00:00", src: "10.0.0.9", dst: "10.0.0.2", port: "445", event: "Scheduled backup (approved)" },
        { time: "03:12:09", src: "10.0.0.31", dst: "203.0.113.200", port: "4444", event: "Outbound connection to unknown host" },
        { time: "08:30:15", src: "10.0.0.15", dst: "updates.vendor.example", port: "443", event: "Software update download" },
        { time: "10:05:44", src: "10.0.0.22", dst: "10.0.0.2", port: "53", event: "DNS lookup" },
      ],
      note: "Simulated data. Not every unusual-looking line is dangerous, so check the evidence.",
    },
    options: [
      "10:05 normal DNS lookup",
      "03:12 outbound connection from 10.0.0.31 to an unknown host on an unusual port",
      "01:00 scheduled backup to the internal server",
      "08:30 software update from the vendor's update server",
    ],
    answerIndex: 1,
    hint: "Which event goes OUT to an unknown host on an unusual port, in the middle of the night?",
    explanation:
      "An internal computer calling out to an unknown host on an odd port (4444) at 3 AM could mean malware contacting its controller. The backup, update and DNS lookup are approved, routine activities.",
  },
];

// ---------------------------------------------------------------
// PRO – STAGE 3: FINAL SECURITY MISSION (combines everything)
// ---------------------------------------------------------------
export const FINAL_QUESTIONS = [
  {
    id: "final-1",
    prompt: "FILE 1, THE PASSWORDS: Four fictional vault passwords were found. Which is the WEAKEST and must be changed first?",
    visual: {
      kind: "story",
      title: "OPERATION GHOST KEY",
      text: "Ghost Corp's vault has been attacked. You must collect four clues to find the shutdown code. First, check the account passwords from the leaked file.",
    },
    options: ["Blu3-Falcon-Rain-92!", "admin123", "N0va#Lantern&Pine84", "Orchid-Violin-Stone-31"],
    answerIndex: 1,
    hint: "Which one is short, common and easy to predict?",
    explanation:
      "'admin123' is short, uses a common word and a simple number pattern. CLUE 1: the weak password is admin123. This is the kind of mistake you practised in Password Guardian.",
  },
  {
    id: "final-2",
    prompt: "FILE 2, THE MESSAGES: Staff received three messages. Which one is the phishing attempt?",
    visual: {
      kind: "messages",
      messages: [
        {
          label: "Message A",
          from: "HR <hr@ghostcorp.example>",
          text: "Team lunch is on Friday at 1 PM in the cafeteria. See you there!",
        },
        {
          label: "Message B",
          from: "Ghost Corp Support <support@ghostcorp-secure.example>",
          text: "URGENT: your vault access expires in 30 minutes. Re-enter your password at http://ghostcorp-login.example/vault",
        },
        {
          label: "Message C",
          from: "Maya (Finance) <maya@ghostcorp.example>",
          text: "Attached is the Q3 budget sheet we discussed in this morning's meeting.",
        },
      ],
    },
    options: ["Message A", "Message B", "Message C"],
    answerIndex: 1,
    hint: "Check the sender domain, any pressure, and any request for a password.",
    explanation:
      "Message B has a look-alike sender domain, a short deadline and a request for a password through a link. CLUE 2: the fake domain is ghostcorp-secure.example. Messages A and C come from the real ghostcorp.example domain and ask for nothing sensitive.",
  },
  {
    id: "final-3",
    type: "text",
    prompt: "FILE 3, THE ENCRYPTED NOTE: Decode the attacker's note to learn WHEN the attack happens.",
    visual: {
      kind: "cipher",
      cipher: "QMHRMKLX",
      clue: "Key clue: the note ends with four dots (....), so the shift is 4. Move each letter 4 places back.",
    },
    answers: ["MIDNIGHT"],
    placeholder: "Type the decoded word",
    hint: "Q moved back 4 places is M.",
    explanation:
      "Moving each letter back 4 places gives MIDNIGHT. CLUE 3: the attack time is MIDNIGHT. This is the Caesar cipher skill from the Cryptography Lab.",
  },
  {
    id: "final-4",
    prompt: "FILE 4, THE NETWORK LOG: Which event matches the attack time (MIDNIGHT)?",
    visual: {
      kind: "log",
      events: [
        { time: "22:15:30", src: "10.0.0.12", dst: "10.0.0.5", port: "445", event: "File share opened" },
        { time: "07:40:11", src: "10.0.0.31", dst: "updates.vendor.example", port: "443", event: "Software update download" },
        { time: "00:02:18", src: "203.0.113.77", dst: "10.0.0.5", port: "22", event: "412 failed admin logins in 60 seconds" },
        { time: "12:30:02", src: "10.0.0.20", dst: "10.0.0.2", port: "53", event: "DNS lookups" },
      ],
      note: "Reminder: Clue 3 says the attack happens at MIDNIGHT.",
    },
    options: [
      "22:15 file share opened by 10.0.0.12",
      "07:40 software update by 10.0.0.31",
      "00:02 hundreds of failed admin logins from 203.0.113.77",
      "12:30 normal DNS lookups by 10.0.0.20",
    ],
    answerIndex: 2,
    hint: "Midnight is around 00:00. Which event is right after it and looks like an attack?",
    explanation:
      "At 00:02 an outside address made hundreds of failed admin logins, which is a brute-force attack. CLUE 4: the attacker's IP is 203.0.113.77. The other events are routine.",
  },
  {
    id: "final-5",
    type: "text",
    prompt:
      "FINAL PUZZLE: Enter the shutdown code. Combine the attack time word from Clue 3, a dash, and the LAST number of the attacker's IP address from Clue 4.",
    visual: {
      kind: "board",
      clues: [
        "CLUE 1: Weak password found: admin123",
        "CLUE 2: Fake sender domain: ghostcorp-secure.example",
        "CLUE 3: Attack time (decoded): MIDNIGHT",
        "CLUE 4: Attacker IP address: 203.0.113.77",
      ],
    },
    answers: ["MIDNIGHT-77"],
    placeholder: "WORD-NUMBER",
    hint: "The code looks like WORD-NUMBER. Take the word from Clue 3 and the number after the last dot in Clue 4.",
    explanation:
      "The shutdown code is MIDNIGHT-77: the decoded time word plus the last part of the attacker's IP, 203.0.113.77. You used passwords, phishing detection, cryptography and network analysis together. Mission accomplished!",
  },
];