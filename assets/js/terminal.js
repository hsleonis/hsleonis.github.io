const term = new Terminal({
  cols: 80,
  rows: 24,
  cursorBlink: true,
  theme: { background: '#010301', foreground: '#33ff33' }
});

term.open(document.getElementById('terminal'));
term.writeln("Initializing Hacker Portfolio...");
term.writeln("Type 'help' to see commands.\n");

const commands = {
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
    fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME/repos")
      .then(res => res.json())
      .then(data => {
        data.forEach(repo => {
          term.writeln(`${repo.name} - ${repo.html_url}`);
        });
      })
      .catch(err => term.writeln("Error fetching repos: " + err));
  }
};

let buffer = "";
term.onKey(e => {
  const char = e.key;
  const keyCode = e.domEvent.keyCode;

  if (keyCode === 13) { // Enter
    const cmd = buffer.trim();
    term.writeln("");
    if (commands[cmd]) commands[cmd]();
    else term.writeln(`Command not found: ${cmd}`);
    buffer = "";
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
