// SECTION NAVIGATION
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  // Pause fireworks & balloons on non-fireworkspage
  if (sectionId === 'fireworkspage') {
    fireworksActive = true;
    balloonsActive = true;
  } else {
    fireworksActive = false;
    balloonsActive = false;
  }
}

// CONFETTI
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const confettiColors = ["#ff69b4", "#ffb3de", "#fff0f7", "#ffe066", "#a1458f"];
const confettiShapes = ["rect", "circle"];
const confettiCount = 90;
const confettis = [];
function random(min, max) { return Math.random() * (max - min) + min; }
for (let i = 0; i < confettiCount; i++) {
  confettis.push({
    x: random(0, canvas.width),
    y: random(-canvas.height, 0),
    r: random(6, 14),
    d: random(1, 6),
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    shape: confettiShapes[Math.floor(Math.random() * confettiShapes.length)],
    tilt: random(-10, 10),
    tiltAngle: 0,
    tiltAngleIncremental: random(0.03, 0.09)
  });
}
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettis.forEach((c) => {
    ctx.beginPath();
    if (c.shape === 'rect') {
      ctx.fillStyle = c.color;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.tilt * Math.PI / 180);
      ctx.fillRect(-c.r / 2, -c.r / 2, c.r, c.r / 2);
      ctx.restore();
    } else {
      ctx.arc(c.x, c.y, c.r / 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = c.color;
      ctx.fill();
    }
    ctx.closePath();
  });
}
function updateConfetti() {
  confettis.forEach((c) => {
    c.y += Math.cos(c.d) + 2 + c.d / 2;
    c.x += Math.sin(c.d);
    c.tiltAngle += c.tiltAngleIncremental;
    c.tilt = Math.sin(c.tiltAngle) * 10;
    if (c.y > canvas.height + 20) {
      c.y = random(-20, -5);
      c.x = random(0, canvas.width);
    }
  });
}
function animateConfetti() {
  drawConfetti();
  updateConfetti();
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// SPARKLES
const sparkleContainer = document.getElementById('sparkle-container');
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  const size = Math.random() * 8 + 7;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.left = `${Math.random() * 100}vw`;
  sparkle.style.top = `${Math.random() * 100}vh`;
  sparkle.style.animationDuration = `${Math.random() * 1.8 + 1.2}s`;
  sparkleContainer.appendChild(sparkle);
  setTimeout(() => { sparkle.remove(); }, 3000);
}
setInterval(createSparkle, 160);
const style = document.createElement('style');
style.innerHTML = `
.sparkle {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle, #fffde7 60%, #ffb3de 90%, #ff69b4 100%);
  box-shadow: 0 0 16px 4px #fff0f7;
  opacity: 0.85;
  z-index: 99;
  animation: sparkle-float 2.2s linear forwards;
}
@keyframes sparkle-float {
  0% { transform: scale(0.2) rotate(0deg); opacity: 1;}
  70% { opacity: 0.9;}
  100% { transform: scale(1.4) rotate(180deg); opacity: 0;}
}
`;
document.head.appendChild(style);

// GALLERY (Slideshow)
let slideIndex = 0;
function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  if (!slides.length) return;
  slideIndex = (n + slides.length) % slides.length;
  for (let i = 0; i < slides.length; i++) slides[i].classList.remove("active");
  slides[slideIndex].classList.add("active");
}
function changeSlide(n) { showSlide(slideIndex + n); }
let autoSlideInterval;
function setupSlideshow() {
  showSlide(0);
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => changeSlide(1), 3300);
  const slides = document.getElementsByClassName("slide");
  for (const slide of slides) {
    slide.onmouseenter = () => clearInterval(autoSlideInterval);
    slide.onmouseleave = () => { autoSlideInterval = setInterval(() => changeSlide(1), 3300); };
  }
}

// LOVE LETTER (Typewriter)
const letterText = `
My Dearest ARUU,
On this special day, I want to remind you of how incredibly special you are to me. Your smile lights up my darkest days, and your laughter is the sweetest melody to my ears.
Every moment spent with you is a treasure I hold close to my heart.
You are not just my love, but my best friend, my confidant, and my greatest support. Your kindness, strength, and beauty inspire me every day to be a better person.
I am so grateful to have you in my life, and I cherish every memory we create together.
As you celebrate another year of life, I wish for you all the happiness, love, and success that your heart desires. You deserve the world and more, and I promise to stand by your side through every adventure that life brings our way.
Happy Birthday, my love. May this year be filled with endless joy, unforgettable moments, and dreams come true. I love you more than words can express, today and always.
With all my love,
tumhara piddi😭
i love you pyaari babu ❤️🥹
`;
function typeWriterEffect(elementId, text) {
  let i = 0;
  document.getElementById(elementId).innerHTML = "";
  function typeWriter() {
    if (i < text.length) {
      document.getElementById(elementId).innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
      i++;
      setTimeout(typeWriter, 35);
    }
  }
  typeWriter();
}

// MINI-GAME
let score = 0;
let hearts = [];
function randomPos() { return Math.floor(Math.random() * 70) + 10; }
function spawnHeart() {
  const heart = document.createElement('button');
  heart.className = 'heart-btn';
  heart.innerHTML = '💖';
  heart.style.marginTop = `${randomPos()}px`;
  heart.onclick = () => {
    score++;
    document.getElementById('score-display').textContent = 'Score: ' + score;
    heart.classList.add('caught');
    setTimeout(() => heart.remove(), 400);
    if (score % 5 === 0) for (let i = 0; i < 10; i++) spawnHeart();
  };
  document.getElementById('gameArea').appendChild(heart);
  hearts.push(heart);
  setTimeout(() => { if (document.body.contains(heart)) heart.remove(); }, 1800 + Math.random() * 1000);
}
let heartTimer;
function startGame() {
  score = 0;
  document.getElementById('score-display').textContent = 'Score: ' + score;
  document.getElementById('gameArea').innerHTML = '';
  hearts = [];
  for (let i = 0; i < 5; i++) spawnHeart();
  clearInterval(heartTimer);
  heartTimer = setInterval(spawnHeart, 1100);
}

// PHOTO BOOTH
const upload = document.getElementById('booth-upload');
const preview = document.getElementById('booth-preview');
const overlay = document.getElementById('booth-overlay');
upload.onchange = function() {
  const [file] = upload.files;
  if (file) {
    preview.src = URL.createObjectURL(file);
    overlay.style.display = 'block';
  }
};
function toggleOverlay() {
  overlay.style.display = (overlay.style.display === 'none' ? 'block' : 'none');
}

// FIREWORKS
const fireworksCanvas = document.getElementById('fireworks-canvas');
const fireworksCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
});
function randomColor() {
  const colors = ['#ff69b4', '#fff0f7', '#ffe066', '#a1458f', '#ffb3de', '#fbbfca'];
  return colors[Math.floor(Math.random() * colors.length)];
}
class Particle {
  constructor(x, y, color, angle, speed) {
    this.x = x; this.y = y; this.color = color; this.angle = angle; this.speed = speed;
    this.radius = 2 + Math.random() * 3;
    this.alpha = 1; this.decay = 0.01 + Math.random() * 0.015;
  }
  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.speed *= 0.97; this.alpha -= this.decay;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
let particles = [];
let fireworksActive = false;
function shootFirework() {
  if (!fireworksActive) return;
  const x = Math.random() * fireworksCanvas.width * 0.8 + fireworksCanvas.width * 0.1;
  const y = Math.random() * fireworksCanvas.height * 0.4 + fireworksCanvas.height * 0.1;
  const color = randomColor();
  for (let i = 0; i < 35; i++) {
    const angle = (Math.PI * 2) * (i / 35);
    const speed = 2.2 + Math.random() * 2.5;
    particles.push(new Particle(x, y, color, angle, speed));
  }
}
setInterval(shootFirework, 1200);
function animateFireworks() {
  fireworksCtx.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);
  particles = particles.filter(p => p.alpha > 0);
  for (let p of particles) { p.update(); p.draw(fireworksCtx); }
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

// BALLOONS
const balloonCanvas = document.getElementById('balloons-canvas');
const balloonCtx = balloonCanvas.getContext('2d');
balloonCanvas.width = window.innerWidth;
balloonCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  balloonCanvas.width = window.innerWidth;
  balloonCanvas.height = window.innerHeight;
});
const balloonColors = ['#ff69b4', '#fff0f7', '#ffe066', '#a1458f', '#ffb3de', '#fbbfca'];
function Balloon() {
  this.x = Math.random() * balloonCanvas.width;
  this.y = balloonCanvas.height + 40 + Math.random() * 100;
  this.size = 32 + Math.random() * 16;
  this.color = balloonColors[Math.floor(Math.random()*balloonColors.length)];
  this.speed = 0.8 + Math.random();
  this.drift = (Math.random() - 0.5) * 0.6;
}
Balloon.prototype.draw = function(ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(this.x, this.y, this.size * 0.6, this.size, 0, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.shadowColor = "#fff";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(this.x, this.y + this.size);
  ctx.lineTo(this.x, this.y + this.size + 22);
  ctx.strokeStyle = "#a1458f";
  ctx.lineWidth = 2;
  ctx.stroke();
};
Balloon.prototype.update = function() {
  this.y -= this.speed;
  this.x += this.drift;
};
let balloons = [];
let balloonsActive = false;
for (let i = 0; i < 25; i++) balloons.push(new Balloon());
function animateBalloons() {
  balloonCtx.clearRect(0,0,balloonCanvas.width,balloonCanvas.height);
  if (balloonsActive) {
    for (let b of balloons) {
      b.update();
      b.draw(balloonCtx);
      if (b.y < -40) {
        Object.assign(b, new Balloon());
        b.y = balloonCanvas.height + 40;
      }
    }
  }
  requestAnimationFrame(animateBalloons);
}
animateBalloons();

// INITIALIZATION ON DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  showSection('home');
  setupSlideshow();
  typeWriterEffect("letterText", letterText);
  startGame();
});