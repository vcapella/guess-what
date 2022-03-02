const targetWords = ["thing", "those", "cigar", "smoke", "sleep"];
const dictionary = ["thing", "those", "cigar", "smoke", "sleep"];

const WORLD_LENGTH = 5;
const guessGrid = document.querySelector("[data-guess-grid]");
const offsetFromDate = new Date(2022, 0, 1);
const msOffset = Date.now() - offsetFromDate;
const dayOffset = msOffset / 1000 / 60 / 60 / 24;
const targetWord = targetWords[Math.floor(dayOffset)];

startInteraction();

function startInteraction() {
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyPress);
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", handleKeyPress);
}

function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key);
    return;
  }

  if (e.target.matches("[data-enter]")) {
    submitGuess();
    return;
  }

  if (e.target.matches("[data-delete]")) {
    deleteKey();
    return;
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    submitGuess();
    return;
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
  }

  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key);
    return;
  }
}

function pressKey(key) {
  const activeTiles = getActiveTiles();
  if (activeTiles.length >= WORLD_LENGTH) return;
  const nextTile = guessGrid.querySelector(":not([data-letter])");
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.textContent = key;
  nextTile.dataset.state = "active";
}

function deleteKey() {
  const activeTiles = getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];
  if (lastTile == null) return;
  lastTile.textContent = "";
  delete lastTile.dataset.state;
  delete lastTile.dataset.letter;
}

function submitGuess() {}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]');
}
