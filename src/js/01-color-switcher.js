const buttonStart = document.querySelector('[data-start]');
const duttonStop = document.querySelector('[data-stop]');
const body = document.body;
let colorChangeInterval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

buttonStart.addEventListener('click', () => {
  console.log('Button was clicked');
  colorChangeInterval = setInterval(changeColor, 1000);
  buttonStart.disabled = true;
});

duttonStop.addEventListener('click', () => {
  console.log('Stop button was clicked');
  clearInterval(colorChangeInterval);
  buttonStart.disabled = false;
});

function changeColor() {
  body.style.background = getRandomHexColor();
}
