const letters = document.querySelectorAll('.letter');
let party = false;

function yippee() {
  if (!party) return;
  const sound = new Audio('yippee.mp3');
  sound.preservesPitch = false;
  sound.playbackRate = 0.9 + Math.random() * 0.4;
  sound.play();
}

function confetti(x, y) {
  for (let i = 0; i < 20; i++) {
    const bit = document.createElement('span');
    bit.className = 'bit';
    bit.style.left = x + 'px';
    bit.style.top = y + 'px';
    bit.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;
    bit.style.setProperty('--dx', Math.random() * 200 - 100 + 'px');
    bit.style.setProperty('--dy', Math.random() * -160 - 40 + 'px');
    document.body.append(bit);
    setTimeout(() => bit.remove(), 900);
  }
}

function cheer(letter) {
  if (letter.classList.contains('crouch') || letter.classList.contains('jump')) return;
  letter.classList.add('crouch');

  setTimeout(() => {
    letter.classList.replace('crouch', 'jump');
    yippee();
    const box = letter.getBoundingClientRect();
    confetti(box.left + box.width / 2, box.top);
  }, 150);

  setTimeout(() => letter.classList.remove('jump'), 1200);
}

letters.forEach(letter => {
  letter.addEventListener('mouseenter', () => cheer(letter));
  letter.addEventListener('click', () => cheer(letter));
});

document.getElementById('soundBtn').addEventListener('click', function () {
  party = !party;
  this.textContent = party ? 'STOP PARTY' : 'START PARTY!!!';
  yippee();
});

document.getElementById('waveBtn').addEventListener('click', () => {
  letters.forEach((letter, i) => setTimeout(() => cheer(letter), i * 140));
});
