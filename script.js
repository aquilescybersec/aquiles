const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const loveBtn = document.getElementById('loveBtn');
const message = document.getElementById('message');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

loveBtn.addEventListener('click', () => {
  message.classList.add('show');
  spawnHearts(16);
});

async function startMusic() {
  try {
    await bgMusic.play();
    updateMusicButton();
  } catch {
    musicToggle.textContent = 'Tocar música';
  }
}

function updateMusicButton() {
  musicToggle.textContent = bgMusic.paused ? 'Tocar música' : 'Pausar música';
}

musicToggle.addEventListener('click', async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
    } catch {
      // If play fails here, browser is still blocking until interaction.
    }
  } else {
    bgMusic.pause();
  }
  updateMusicButton();
});

['click', 'touchstart', 'keydown'].forEach((eventName) => {
  window.addEventListener(
    eventName,
    () => {
      if (bgMusic.paused) {
        startMusic();
      }
    },
    { once: true }
  );
});

startMusic();

function spawnHearts(total) {
  for (let i = 0; i < total; i += 1) {
    setTimeout(() => {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = Math.random() > 0.5 ? '❤' : '💖';
      heart.style.left = `${8 + Math.random() * 84}%`;
      heart.style.animationDuration = `${2 + Math.random() * 1.6}s`;
      document.body.appendChild(heart);

      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    }, i * 80);
  }
}
