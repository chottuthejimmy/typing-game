const word = document.getElementById('word') as HTMLElement;
const text = document.getElementById('text') as HTMLInputElement;
const scoreEl = document.getElementById('score') as HTMLElement;
const timeEl = document.getElementById('time') as HTMLElement;
const endgameEl = document.getElementById('end-game-container') as HTMLElement;
const settingsBtn = document.getElementById('settings-btn') as HTMLElement;
const settings = document.getElementById('settings') as HTMLElement;
const settingsForm = document.getElementById('settings-form') as HTMLFormElement;
const difficultySelect = document.getElementById('difficulty') as HTMLSelectElement;

// List of words for game
const words: string[] = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
let randomWord: string;

// Init score
let score: number = 0;

// Init time
let time: number = 10;

// Set difficulty to value in ls or medium
let difficulty: string =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM(): void {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore(): void {
  score++;
  scoreEl.innerHTML = score.toString();
}

// Update time
function updateTime(): void {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver(): void {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', (e: Event) => {
  const insertedText = (e.target as HTMLInputElement).value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    (e.target as HTMLInputElement).value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', (e: Event) => {
  difficulty = (e.target as HTMLSelectElement).value;
  localStorage.setItem('difficulty', difficulty);
});
