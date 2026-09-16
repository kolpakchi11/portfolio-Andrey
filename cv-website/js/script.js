

/* 1. TYPEWRITER IN THE TERMINAL  */
const lines = [
  { prompt: "$ ", text: "whoami" },
  { prompt: "> ", text: "Andrey Kolpakchi" },
  { prompt: "> ", text: "role: Stagiair Software Developer" },
  { prompt: "$ ", text: "status --check" },
  { prompt: "> ", text: "open to internship opportunities" },
];

const termEl = document.getElementById('terminal');
const heroBottom = document.getElementById('heroBottom');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Types the lines one character at a time using setTimeout to schedule
// the next character. When all lines are done, reveal the photo/name.
function typeLines(lineIndex, charIndex, buffer){
  if(lineIndex >= lines.length){
    heroBottom.classList.add('show');
    return;
  }
  const line = lines[lineIndex];

  if(charIndex <= line.text.length){
    termEl.innerHTML = buffer +
      `<span class="prompt">${line.prompt}</span>${line.text.slice(0, charIndex)}<span class="cursor"></span>`;
    setTimeout(() => typeLines(lineIndex, charIndex + 1, buffer), 34);
  } else {
    const finishedBuffer = buffer + `<span class="prompt">${line.prompt}</span>${line.text}\n`;
    setTimeout(() => typeLines(lineIndex + 1, 0, finishedBuffer), 260);
  }
}

if(reduceMotion){
  // If the user prefers reduced motion, show everything instantly.
  termEl.innerHTML = lines.map(l => `<span class="prompt">${l.prompt}</span>${l.text}`).join('\n');
  heroBottom.classList.add('show');
} else {
  typeLines(0, 0, '');
}


// Languages — same technique. Labels kept in Dutch (CV text).
const languages = [
  { name: 'Dutch', level: 65,  label: 'Good' },
  { name: 'English',     level: 50,  label: 'Intermediate' },
  { name: 'Russian',   level: 100, label: 'Native' },
  { name: 'Ukrainian',  level: 100, label: 'Native' },
];

const langGrid = document.getElementById('langGrid');
languages.forEach(l => {
  const row = document.createElement('div');
  row.className = 'lang-row';
  row.innerHTML = `
    <span class="lang-name">${l.name}</span>
    <span class="lang-level">${l.label}</span>
    <div class="bar-track" style="flex:1">
      <div class="bar-fill" data-level="${l.level}"></div>
    </div>`;
  langGrid.appendChild(row);
});

/* --- 3. INTERSECTION OBSERVER: fill bars when they scroll into view --- */

const bars = document.querySelectorAll('.bar-fill');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      el.style.width = el.dataset.level + '%';
      io.unobserve(el);
    }
  });
}, { threshold: 0.4 });

bars.forEach(b => io.observe(b));

/* --- 4. REVIEW FORM --- */
const WEB3FORMS_ACCESS_KEY = "dae8ead7-0722-4906-8c4d-6e8d3c90a7a4";

const stars = document.querySelectorAll('.rf-star');
const ratingInput = document.getElementById('rfRating');
let currentRating = 0;

function paintStars(n){
  stars.forEach(star => {
    star.classList.toggle('on', Number(star.dataset.value) <= n);
  });
}
stars.forEach(star => {
  const value = Number(star.dataset.value);
  star.addEventListener('mouseenter', () => paintStars(value));
  star.addEventListener('mouseleave', () => paintStars(currentRating));
  star.addEventListener('click', () => {
    currentRating = value;
    ratingInput.value = value;
    paintStars(value);
  });
});

const reviewForm = document.getElementById('reviewForm');
const status = document.getElementById('rfStatus');

reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if(!currentRating){
    status.className = 'rf-status err';
    status.textContent = 'Please pick a star rating first.';
    return;
  }

  const button = reviewForm.querySelector('.rf-submit');
  button.disabled = true;
  status.className = 'rf-status';
  status.textContent = 'Sending...';

    const formData = new FormData(reviewForm);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', "New review on your CV site");

  try{
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if(data.success){
      status.className = 'rf-status ok';
      status.textContent = 'Thank you! Your review has been sent.';
      reviewForm.reset();
      currentRating = 0;
      paintStars(0);
    } else {
      status.className = 'rf-status err';
      status.textContent = 'Something went wrong. Please try again later.';
      button.disabled = false;
    }
  } catch(err){
    status.className = 'rf-status err';
    status.textContent = 'Could not send. Check your connection and try again.';
    button.disabled = false;
  }
});

/* 2 for me  */

/* data-* атрибуты — как хранить своё значение прямо на HTML-элементе.*/
/* querySelectorAll — найти сразу все элементы по классу (в отличие от одного по id).*/
/* data-* атрибуты — как хранить своё значение прямо на HTML-элементе.*/