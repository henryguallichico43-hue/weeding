const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const overlay = document.getElementById("overlay");
const content = document.getElementById("content");

///////////////////////////////
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);


// Forzar a la página a ir arriba del todo cada vez que se recarga
window.addEventListener('load', () => {
  overlay.style.display = 'none';
  void overlay.offsetHeight; // fuerza reflow
  overlay.style.display = 'flex';
});

//////////////////////

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'; // Evita que el navegador recuerde la posición
}

window.scrollTo(0, 0);

let playing = false;

musicBtn.onclick = () => {
  playing ? music.pause() : music.play();
  playing = !playing;
};

// UNIFICADA: Solo una función openEnvelope
function openEnvelope() {
  document.querySelector(".envelope").classList.add("open");

  // Efecto de desenfoque y desvanecimiento (Tu idea original)
  setTimeout(() => {
    overlay.style.filter = "blur(8px)";
    overlay.style.opacity = "0";
  }, 900);

  // Activación del contenido y liberación real del scroll
  setTimeout(() => {
    overlay.style.display = "none";
    content.style.display = "block";
    
    // Devolvemos el scroll tanto al cuerpo como a la página entera
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    
    music.play();
    playing = true;
  }, 1600);
}

/* CUENTA REGRESIVA (Agosto 29, 2026 15:30) */
const target = new Date("2026-08-29T15:30:00").getTime();

setInterval(() => {
  const now = Date.now();
  const diff = target - now;
  const countdownElement = document.getElementById("countdown");
  
  if (!countdownElement) return;

  if (diff < 0) {
    countdownElement.innerHTML = "<div><strong>¡Llegó!</strong><span>🎉</span></div>";
    return;
  }

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  // Formato elegante en cajitas individuales que combina con tu CSS
  countdownElement.innerHTML = `
    <div><strong>${d}</strong><span>Días</span></div>
    <div><strong>${h}</strong><span>Horas</span></div>
    <div><strong>${m}</strong><span>Min</span></div>
    <div><strong>${s}</strong><span>Seg</span></div>
  `;
}, 1000);

/* CORAZONES FLOTANTES */
// Creamos dinámicamente el contenedor de los corazones para que no falle
const heartsContainer = document.createElement("div");
heartsContainer.id = "hearts-container";
document.body.appendChild(heartsContainer);

setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "❤";
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (15 + Math.random() * 10) + "s";
  
  heartsContainer.appendChild(heart);
  
  // Se destruyen al salir para no ralentizar el celular del invitado
  setTimeout(() => heart.remove(), 25000);
}, 2000);

/* APARICIÓN DE SECCIONES (FADE IN) */
const sections = document.querySelectorAll('.fade-section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(s => observer.observe(s));

