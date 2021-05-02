'use strict';

// DOM

/* 
BREAK
Document Object Model: struktūrizuota html dokumento reprezentacija. Leidžia JS pasiekti elementus ir atributus bei stilius ir manipuliuoti jais
BREAK
DOM != HTML. DOM yra sukuriamas iš kart, kai užsikrauna html dokumentas
BREAK
DOM talpinamas medžio tipo sistemoje, kur kiekvienas elementas, atributas, stilius ar tekstas vadinamas NODE, ir jie turi ryšius tarpusavyje.
BREAK
DOCUMENT  - spec objektas, DOM pradžios taškas, sukuriantis ryšį tarp dokumento ir JS
BREAK
Pirmas DOCUMENT child elementas -> html
HTML vaikai (child elementai) -> body ir head
tarpusavyje jie vadinami siblings
tuo tarpu html elementas jiems - parent
BREAK
DOM nėra JAVASCRIPT. Tokie metodai kaip document.querySelector nėra js metodai - > tai WEB API dalis (tai lyg bibliotekos, kurias naudoja naršyklės, ir kurios gali sąveikauti su JS) API - application programming interface
BREAK
*/

// Math.trunc - pašalinti skaičius po kablelio
// Math.random - random skaičius nuo 0 iki 1,
// * 20 (padauginus iš 20 bus skaičius nuo 0 iki 19)
// + 1 bus skaičius nuo 1 iki 20

// generate random number
let number = getRandom();
const placeHolder = document.querySelector('.number');

// select DOM elements
// input
const input = document.querySelector('.guess');
// buttons
const again = document.querySelector('.again');
const check = document.querySelector('.check');
// text fields
const message = document.querySelector('.message');
const scoreTextField = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
// score counter
let score = 20;

// check number
check.addEventListener('click', function () {
  let inputVal = Number(input.value);
  let oldScore = Number(highscore.textContent);
  // start/continue game if score is 1 or more
  if (score >= 1) {
    // no input, number is less than 1 or more than 20
    if (inputVal > 20 || inputVal < 1) {
      message.textContent = '⛔ Number must be between 20 and 1!';
      input.value = '';
      // if it is correct number
    } else if (inputVal === number) {
      message.textContent = '🎉 You guessed!';
      placeHolder.textContent = number;
      input.disabled = true;
      document.querySelector('body').classList.add('won');
      // if new score is better than highscore
      if (score > oldScore) {
        highscore.textContent = score;
        oldScore = score;
      }
      input.value = '';
      // if nuber is higher than hidden number
    } else if (inputVal !== number) {
      inputVal > number ? wrongGuess('Too high...') : wrongGuess('Too low...');
    } else {
      message.textContent = '🤯 You lost the game!';
      input.disabled = true;
      scoreTextField.textContent = 0;
      input.value = '';
    }
  }
});

// start new game
again.addEventListener('click', function () {
  document.querySelector('body').classList.remove('won');
  message.textContent = 'Start Guessing...';
  score = 20;
  scoreTextField.textContent = score;
  placeHolder.textContent = '?';
  number = getRandom();
  input.disabled = false;
});

// get random number
function getRandom() {
  return Math.trunc(Math.random() * 20) + 1;
}

// wrong guess function argument: string describing the number. Is it too high or is it too low?
function wrongGuess(guess) {
  message.textContent = `😢 ${guess}`;
  score--;
  input.value = '';
  scoreTextField.textContent = score;
}
