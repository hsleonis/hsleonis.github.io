const term = new Terminal({
  cols: 80,
  rows: 24,
  cursorBlink: true,
  theme: { background: '#010301', foreground: '#33ff33' }
});

term.open(document.getElementById('terminal'));

let bootMessages = [
  "[BOOT] Initializing hardware...",
  "[OK] CPU: Neural Processing Unit Online",
  "[OK] Memory Check: 8192 MB",
  "[OK] Loading Retro Kernel v3.1.4",
  "[OK] Network Interface Activated",
  "[OK] Connecting to GitHub...",
  "[OK] Loading portfolio modules",
  "System Ready. Type 'help' for commands."
];

let commands = {
  help: () => {
    term.writeln("Available commands:");
    term.writeln("repos - list my GitHub repositories");
    term.writeln("about - about me");
    term.writeln("clear - clear the terminal");
  },
  about: () => {
    term.writeln("I am a software engineer & data scientist, building cool stuff.");
  },
  clear: () => {
    term.clear();
  },
  repos: () => {
    term.writeln("Fetching repositories...\n");
    fetch("https://api.github.com/users/hsleonis/repos")
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          term.writeln("Unexpected API response.");
          return;
        }
        data.forEach(repo => {
          term.writeln(`${repo.name} - ${repo.html_url}`);
        });
      })
      .catch(err => term.writeln("Error fetching repos: " + err));
  }
};

let buffer = "";
let inputEnabled = false;

function enableInput() {
  inputEnabled = true;
  term.write("\r\n$ ");
}

term.onKey(e => {
  if (!inputEnabled) return;

  const char = e.key;
  const keyCode = e.domEvent.keyCode;

  if (keyCode === 13) { // Enter
    const cmd = buffer.trim();
    term.writeln("");
    if (commands[cmd]) commands[cmd]();
    else term.writeln(`Command not found: ${cmd}`);
    buffer = "";
    term.write("\r\n$ ");
  } else if (keyCode === 8) { // Backspace
    if (buffer.length > 0) {
      term.write("\b \b");
      buffer = buffer.slice(0, -1);
    }
  } else {
    buffer += char;
    term.write(char);
  }
});

// Typing effect helper: types a single line char-by-char
function typeLine(line, index = 0, callback) {
  if (index < line.length) {
    term.write(line[index]);
    setTimeout(() => typeLine(line, index + 1, callback), 40); // 40ms per char
  } else {
    term.writeln("");
    if (callback) callback();
  }
}

// Boot animation with typing effect on each line
function bootSequence(index = 0) {
  if (index < bootMessages.length) {
    typeLine(bootMessages[index], 0, () => {
      setTimeout(() => bootSequence(index + 1), 300);
    });
  } else {
    enableInput();
  }
}

bootSequence();
