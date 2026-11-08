/* ===== EDIT HERE: photos, captions, messages ===== */
const FIRST_MEETING_PHOTO = "assets/images/photo1.jpg";
const PHOTOS = [
  {src:"assets/images/photo1.jpg", cap:"Our First Memory ❤️",         date:"Dec 23"},
  {src:"assets/images/photo2.jpg", cap:"My Favourite Smile 🥹",        date:""},
  {src:"assets/images/photo3.jpg", cap:"That Beautiful Moment 🫂",     date:""},
  {src:"assets/images/photo4.jpg", cap:"Forever Together 💗",          date:""},
  {src:"assets/images/photo5.jpg", cap:"Every Picture Has a Story 📸", date:""},
  {src:"assets/images/photo6.jpg", cap:"Us ❤️",                        date:""},
  {src:"assets/images/photo7.jpg", cap:"Our Diwali Night 🪔",          date:""},
  {src:"assets/images/photo8.jpg", cap:"Us 🥰",                        date:""},
  {src:"assets/images/photo9.jpg", cap:"Us 👻",                        date:""}
];
const FIRST_TEXT = "First time Dec 23 அன்று உன்னை நேரில் meet பண்ணப்போ எனக்கு அவ்வளவு சந்தோஷமா இருந்துச்சு தெரியுமா! 🥹❤️ அந்த ஒரு moment இன்னைக்கும் என்னால மறக்கவே முடியாது.";
const LETTER = [
  "❤️🫂 My Dear Pondatiii... 👻💗",
  "First time Dec 23 அன்று உன்னை நேரில் meet பண்ணப்போ எனக்கு அவ்வளவு சந்தோஷமா இருந்துச்சு தெரியுமா! 🥹❤️ அந்த ஒரு moment இன்னைக்கும் என்னால மறக்கவே முடியாது. உன்னை first time பார்த்த அந்த நிமிஷத்துல இருந்தே என் மனசுக்குள்ள ஒரு அழகான feeling வந்துச்சு. அப்போவே உன்னை காதலிக்க ஆரம்பிச்சிட்டேன்! 🫣💘",
  "அன்னைக்கு ஆரம்பிச்ச என்னோட காதல் இன்னைக்கும் கொஞ்சம் கூட குறையல. நாள் ஆக ஆக உன்மேல இருக்கிற love மட்டும் அதிகமாகிட்டே போகுது! 🥰❤️",
  "நீ சிரிக்கும்போது எனக்கும் சந்தோஷம் வரும், நீ கவலையா இருக்கும்போது உன்னைவிட எனக்குத்தான் அதிகமா வலிக்கும். 🥺🫶 உன்னோட சின்ன சின்ன கோபம், சண்டை, செல்லமான பேச்சு எல்லாமே எனக்கு ரொம்ப special. 😘💞",
  "எனக்கு வாழ்க்கையில பெரிய பெரிய ஆசைகள் எதுவும் இல்ல... ஆனா என்னோட ஒவ்வொரு சந்தோஷமான தருணத்திலும் நீ இருக்கணும். என்னோட future-லயும் நீயே இருக்கணும். 🫂💍",
  "Dec 23 அன்று உன்னைப் பார்த்தப்போ ஆரம்பிச்ச காதலை, என் வாழ்க்கை முழுவதும் உன்னோட சேர்ந்து வாழ ஆசைப்படுறேன்! ❤️",
  "இப்போவும் உன்னைக் கேட்குறேன்...",
  "Will you be mine forever, my Pondatiii? 🥹💗",
  "I LOVE YOU SO MUCH DI PONDATIII! 👻😘❤️♾️"
];
const FINAL = [
  "You're not just my love... You're my favourite part of life. ❤️",
  "One Dec 23 changed my life, and I want every Dec 23 with you. 🥹",
  "Once Again, Happy Diwali Di Pondatiii! 👻😘❤️",
  "Hari ❤️ Lithu ♾️ Forever 🌹",
  "I LOVE YOU FOREVER & EVER ♾️❤️"
];
/* ================================================= */

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
let cur = 0, TOTAL = 9, timers = [];
const wait = ms => new Promise(r => timers.push(setTimeout(r, ms)));

/* ---- CANVASES: stars + particles ---- */
const bg = $('#bg'), bx = bg.getContext('2d');
const fx = $('#fx'), fc = fx.getContext('2d');
let W, H, stars = [], P = [];

function size() {
  W = bg.width = fx.width = innerWidth;
  H = bg.height = fx.height = innerHeight;
  stars = Array.from({length: 90}, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.8 + 0.3,
    p: Math.random() * 6,
    twinkle: Math.random() * 3 + 1
  }));
}
addEventListener('resize', size);
size();

function loop(t) {
  bx.clearRect(0, 0, W, H);
  stars.forEach(s => {
    const alpha = 0.3 + 0.7 * Math.abs(Math.sin(t / (s.twinkle * 300) + s.p));
    bx.globalAlpha = alpha;
    bx.fillStyle = '#fff';
    bx.beginPath();
    bx.arc(s.x, s.y, s.r, 0, 7);
    bx.fill();
  });
  bx.globalAlpha = 1;

  fc.clearRect(0, 0, W, H);
  P = P.filter(p => p.l > 0);
  P.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    p.vy += p.g; p.vx *= p.f; p.l--;
    fc.globalAlpha = Math.max(p.l / p.m, 0);
    if (p.e) {
      fc.font = p.s + 'px serif';
      fc.fillText(p.e, p.x, p.y);
    } else {
      fc.fillStyle = p.c;
      fc.shadowColor = p.c;
      fc.shadowBlur = 8;
      fc.beginPath();
      fc.arc(p.x, p.y, p.s, 0, 7);
      fc.fill();
      fc.shadowBlur = 0;
    }
  });
  if (P.length > 600) P.splice(0, P.length - 600);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

const rnd = (a, b) => a + Math.random() * (b - a);
const COL = ['#ff6fa5','#ffd27a','#ff3d3d','#b9a3ff','#fff','#ffb347','#ff9bc0'];

function firework(x, y, heart) {
  const c = COL[Math.random() * COL.length | 0];
  const n = reduce ? 15 : (heart ? 46 : 44);
  for (let i = 0; i < n; i++) {
    let vx, vy;
    if (heart) {
      const a = i / n * 6.283;
      vx =  16 * Math.pow(Math.sin(a), 3) * 0.35;
      vy = -(13 * Math.cos(a) - 5 * Math.cos(2*a) - 2 * Math.cos(3*a) - Math.cos(4*a)) * 0.35;
    } else {
      const a = Math.random() * 6.283, s = rnd(1, 5);
      vx = Math.cos(a) * s; vy = Math.sin(a) * s;
    }
    P.push({x, y, vx, vy, g: 0.04, f: 0.985, l: 70, m: 70, s: 2, c});
  }
}

function emoji(x, y, list, n = 12, up = true) {
  for (let i = 0; i < (reduce ? 4 : n); i++) {
    P.push({
      x, y,
      vx: rnd(-3, 3),
      vy: up ? rnd(-4, -1) : rnd(-3, 3),
      g: up ? -0.01 : 0.05,
      f: 0.99, l: 90, m: 90,
      s: rnd(16, 28),
      e: list[Math.random() * list.length | 0]
    });
  }
}

function rain(list, n = 40, ms = 4000) {
  let k = 0;
  const iv = setInterval(() => {
    P.push({
      x: rnd(0, W), y: -20,
      vx: rnd(-1, 1), vy: rnd(1, 3),
      g: 0.01, f: 1, l: 300, m: 300,
      s: rnd(18, 30),
      e: list[Math.random() * list.length | 0]
    });
    if (++k >= n) clearInterval(iv);
  }, ms / n);
}

function allFW(ms) {
  let k = 0;
  const iv = setInterval(() => {
    firework(rnd(W * 0.1, W * 0.9), rnd(H * 0.1, H * 0.5), Math.random() < 0.4);
    if (++k >= ms / 450) clearInterval(iv);
  }, 450);
  timers.push(iv);
}

/* ---- SCENE ENGINE ---- */
function show(n) {
  cur = n;
  $$('.sc').forEach((s, i) => s.classList.toggle('on', i === n - 1));
  $('#prog i').style.width = (n / TOTAL * 100) + '%';
  $('#nx').hidden = true;
  document.body.classList.toggle('pinkbg', n === 6);
  scenes[n]();
}

function ready() {
  $('#nx').hidden = false;
}

$('#nx').onclick = () => show(cur + 1);

async function type(el, txt, sp = 45) {
  el.textContent = '';
  for (const ch of [...txt]) {
    el.textContent += ch;
    await wait(reduce ? 0 : sp);
  }
}

/* ---- SCENES ---- */
const scenes = {

  /* Scene 1 — Welcome */
  1() {
    const iv = setInterval(() => {
      if (cur === 1) emoji(rnd(0, W), H, ['🌸','💗','🌺'], 1);
    }, 900);
    timers.push(iv);
    // Auto-add staggered fade-in
    $$('#s1 .hero-content > *').forEach((el, i) => {
      el.style.animationDelay = (0.3 + i * 0.2) + 's';
    });
  },

  /* Scene 2 — Roses */
  2() {
    const box = $('#flowers');
    if (box.children.length) return;
    let n = 0;
    for (let i = 0; i < 12; i++) {
      const b = document.createElement('button');
      b.className = 'rs';
      b.innerHTML = '<span class="bud"></span><span class="stem"></span>';
      b.onclick = () => {
        if (b.classList.contains('done')) return;
        b.classList.add('done');
        const r = b.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + 25;
        [
          () => emoji(x, y, ['🌹','🌸'], 12, false),
          () => emoji(x, y, ['💗','💖'], 10),
          () => emoji(x, y, ['✨','🌹'], 14, false),
          () => firework(x, y)
        ][i % 4]();
        $('#fcount').textContent = ++n + ' / 12';
        if (n === 12) $('#secret').classList.remove('hide');
      };
      box.append(b);
    }
    $('#secret').onclick = e => {
      e.target.classList.add('hide');
      rain(['🌹','💗','🌸'], 40);
      $('#fmsg').textContent = 'Hari picked every rose for you, Lithu. Every rose reminds him of a beautiful moment with you. 🌹';
      ready();
    };
  },

  /* Scene 3 — Cupid */
  3() {
    $('#shoot').onclick = async e => {
      e.target.classList.add('hide');
      $('#arrow').classList.add('go');
      await wait(2000);
      const h = $('#bigheart'), r = h.getBoundingClientRect();
      h.classList.add('crack');
      firework(r.left + r.width / 2, r.top + 30, true);
      await wait(900);
      emoji(W / 2, H / 2, ['❤️','💖','💗','💕'], 60, false);
      rain(['💗','❤️'], 40, 3000);
      $('#hmsg').textContent = 'You already own the most precious thing in my life... MY HEART. ❤️';
      ready();
    };
  },

  /* Scene 4 — Dec 23 */
  4: async () => {
    $('#first').src = FIRST_MEETING_PHOTO;
    await wait(600);
    $('.polaroid-frame').classList.add('show');
    rain(['🌹','🌸'], 14, 3000);
    await type($('#tw'), FIRST_TEXT, 40);
    await wait(500);
    $('#tw2').textContent = 'That one day became the beginning of my favourite love story. ♾️';
    ready();
  },

  /* Scene 5 — Gallery */
  5() {
    const g = $('#gal');
    if (!g.children.length) buildGal();
    ready();
  },

  /* Scene 6 — Love Letter */
  6() {
    const o = $('#open');
    o.onclick = async () => {
      o.classList.add('hide');
      const env = $('#env');
      env.style.transform = 'scale(0.5) translateY(-40px)';
      env.style.opacity = '0';
      await wait(700);
      env.classList.add('hide');
      const L = $('#letter');
      L.classList.remove('hide');
      rain(['🌹','🌸','💗'], 40, 8000);
      for (const t of LETTER) {
        const p = document.createElement('p');
        p.innerHTML = t.replace(/(Dec 23|forever)/gi, '<span class="hl">$1</span>');
        L.append(p);
        p.scrollIntoView({behavior: 'smooth', block: 'end'});
        await wait(reduce ? 100 : 2600);
      }
      const sig = document.createElement('p');
      sig.className = 'hl';
      sig.style.textAlign = 'right';
      sig.style.marginTop = '12px';
      sig.textContent = '— Forever yours, Hari ❤️ Lithu 🌹';
      L.append(sig);
      ready();
    };
  },

  /* Scene 7 — Diwali */
  7() {
    allFW(3000);
    const tap = e => {
      if (cur !== 7) return;
      const t = e.touches ? e.touches[0] : e;
      firework(t.clientX, t.clientY, Math.random() < 0.25);
    };
    if (!scenes._t) {
      scenes._t = 1;
      $('#s7').addEventListener('pointerdown', tap);
    }
    setTimeout(ready, 4000);
  },

  /* Scene 8 — Proposal */
  8() {
    // Animate the proposal scene elements in sequence
    const content = $$('#s8 .proposal-content > *');
    content.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 400);
    });

    // Petal rain on enter
    rain(['🌹','🌺','💗'], 30, 4000);

    $$('.yes').forEach(b => {
      b.onclick = async () => {
        $('#yes').classList.add('hide');
        $('#ring').style.animation = 'none';
        allFW(5000);
        rain(['🌹','❤️','🌸','💖'], 70, 5000);
        emoji(W / 2, H / 2, ['❤️','💗','💍','🌹'], 80, false);
        await wait(500);
        $('#yay').classList.remove('hide');
        await wait(5000);
        ready();
      };
    });
  },

  /* Scene 9 — Finale */
  9: async () => {
    allFW(60000);
    rain(['🌹','🌹','💗','⭐'], 150, 30000);
    const f = $('#fin');
    f.innerHTML = '';
    for (const [i, t] of FINAL.entries()) {
      const p = document.createElement('p');
      p.className = i === FINAL.length - 1 ? 'script big2' : 'big';
      f.append(p);
      await type(p, t, 35);
      await wait(900);
    }
    // Final photo mosaic
    const mosaic = document.createElement('div');
    mosaic.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:12px;';
    PHOTOS.slice(0, 6).forEach((ph, i) => {
      const img = document.createElement('img');
      img.src = ph.src;
      img.alt = ph.cap;
      img.style.cssText = `width:80px;height:80px;object-fit:cover;border-radius:50%;border:3px solid rgba(255,111,165,0.6);box-shadow:0 0 20px rgba(255,111,165,0.4);opacity:0;transition:opacity 0.6s;animation-delay:${i*0.15}s`;
      img.onerror = () => img.remove();
      mosaic.append(img);
      setTimeout(() => { img.style.opacity = '1'; }, 200 + i * 200);
    });
    f.append(mosaic);
    $('#replay').classList.remove('hide');
  }
};

/* ---- REPLAY ---- */
$('#replay').onclick = () => {
  timers.forEach(t => { clearTimeout(t); clearInterval(t); });
  timers = []; P = [];
  document.body.style.background = '';
  $('#yes').classList.remove('hide');
  $('#yay').classList.add('hide');
  $('#env').classList.remove('hide');
  $('#env').style.transform = '';
  $('#env').style.opacity = '';
  $('#letter').classList.add('hide');
  $('#letter').innerHTML = '';
  $('#open').classList.remove('hide');
  $('#shoot').classList.remove('hide');
  $('#shoot').classList.remove('hide');
  $('#arrow').classList.remove('go');
  $('#bigheart').classList.remove('crack');
  $('#hmsg').textContent = '';
  $('.polaroid-frame').classList.remove('show');
  $('#tw').textContent = '';
  $('#tw2').textContent = '';
  $('#replay').classList.add('hide');
  scenes._t = 0;
  show(1);
};

/* ---- ENTER BUTTON ---- */
$('#enter').onclick = e => {
  const r = e.target.getBoundingClientRect();
  emoji(r.left + r.width / 2, r.top, ['🌸','🌹','💗','✨'], 60, false);
  rain(['🌸','🌹'], 30, 1500);
  setTimeout(() => show(2), 1300);
};

/* ---- GALLERY ---- */
let list = [], idx = 0;

function buildGal() {
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem('upl') || '[]'); } catch (e) {}
  list = PHOTOS.concat(saved);
  const g = $('#gal');
  g.innerHTML = '';
  list.forEach((p, i) => {
    const d = document.createElement('div');
    d.className = 'pol';
    d.style.setProperty('--r', (i % 2 ? 1 : -1) * rnd(0.5, 2.5) + 'deg');
    d.innerHTML = `<img loading="lazy" src="${p.src}" alt="${p.cap || ''}"><small>${p.cap || ''} ${p.date || ''}</small>`;
    d.querySelector('img').onerror = () => d.remove();
    d.onclick = e => { emoji(e.clientX, e.clientY, ['💗','💖'], 6); openLB(i); };
    g.append(d);
  });
}

function openLB(i) {
  idx = (i + list.length) % list.length;
  $('#li').src = list[idx].src;
  $('#lc').textContent = (list[idx].cap || '') + ' ' + (list[idx].date || '');
  $('#lb').classList.remove('hide');
}

$('#lx').onclick = () => $('#lb').classList.add('hide');
$('#lp').onclick = () => openLB(idx - 1);
$('#ln').onclick = () => openLB(idx + 1);

let sx = 0;
$('#lb').addEventListener('touchstart', e => sx = e.touches[0].clientX);
$('#lb').addEventListener('touchend', e => {
  const d = e.changedTouches[0].clientX - sx;
  if (Math.abs(d) > 50) openLB(idx + (d < 0 ? 1 : -1));
});

$('#up').onchange = e => {
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem('upl') || '[]'); } catch (x) {}
  [...e.target.files].forEach(f => {
    const r = new FileReader();
    r.onload = () => {
      saved.push({src: r.result, cap: 'New Memory 💗', date: ''});
      try { localStorage.setItem('upl', JSON.stringify(saved)); } catch (x) {}
      buildGal();
    };
    r.readAsDataURL(f);
  });
};

/* ---- TOOLS ---- */
const aud = $('#aud'); let playing = false;
$('#mus').onclick = () => {
  playing = !playing;
  if (playing) aud.play().catch(() => { playing = false; });
  else aud.pause();
  $('#mus').textContent = playing ? '🔊' : '🎵';
};
$('#fs').onclick = () => {
  const d = document.documentElement;
  try {
    document.fullscreenElement ? document.exitFullscreen() : d.requestFullscreen && d.requestFullscreen();
  } catch (e) {}
};
$('#sec').onclick = () => $('#secmsg').classList.remove('hide');
$('#secmsg').onclick = () => $('#secmsg').classList.add('hide');

/* ---- CUSTOM HEART CURSOR ---- */
(function() {
  const cur = document.createElement('div');
  cur.id = 'cursor';
  cur.textContent = '💗';
  document.body.append(cur);
  let cx = -100, cy = -100;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cur.style.left = cx + 'px';
    cur.style.top  = cy + 'px';
  });
  document.addEventListener('mousedown', () => cur.style.transform = 'translate(-50%,-50%) scale(1.5)');
  document.addEventListener('mouseup',   () => cur.style.transform = 'translate(-50%,-50%) scale(1)');
})();

// Gentle cursor trail (mouse only)
addEventListener('pointermove', e => {
  if (!reduce && e.pointerType === 'mouse' && Math.random() < 0.08) {
    emoji(e.clientX, e.clientY, ['💗'], 1);
  }
});

/* ---- HERO SLIDESHOW ---- */
(function() {
  const container = $('#heroSlideshow');
  const dotsWrap  = $('#slideshowDots');
  if (!container) return;

  const photos = PHOTOS.map(p => p.src);
  let slideIdx = 0, slides = [], dots = [];

  // Build slides
  photos.forEach((src, i) => {
    const s = document.createElement('div');
    s.className = 'hero-slide' + (i === 0 ? ' active' : '');
    s.style.backgroundImage = `url('${src}')`;
    container.append(s);
    slides.push(s);

    const d = document.createElement('div');
    d.className = 'slide-dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goSlide(i);
    dotsWrap.append(d);
    dots.push(d);
  });

  function goSlide(n) {
    slides[slideIdx].classList.remove('active');
    dots[slideIdx].classList.remove('active');
    slideIdx = (n + photos.length) % photos.length;
    slides[slideIdx].classList.add('active');
    dots[slideIdx].classList.add('active');
  }

  // Auto-advance every 4 seconds
  const iv = setInterval(() => {
    if (cur === 1) goSlide(slideIdx + 1);
  }, 4000);
  timers.push(iv);
})();

/* ---- DAYS TOGETHER COUNTER ---- */
(function() {
  // Calculate days since Dec 23 — find the most recent Dec 23 that has passed
  function getDaysTogether() {
    const now  = new Date();
    let year   = now.getFullYear();
    let start  = new Date(year, 11, 23); // Dec = month 11
    if (start > now) start = new Date(year - 1, 11, 23);
    return Math.floor((now - start) / 86400000);
  }

  const days = getDaysTogether();

  // Scene 4 counter
  const dt = $('#daysTogether');
  if (dt) {
    dt.innerHTML = `
      <div class="days-num">${days}</div>
      <div class="days-label">
        <span>days of love since</span>
        <span>Dec 23 ❤️</span>
      </div>`;
  }

  // Hero mini-counter
  const hd = $('#heroDays');
  if (hd) {
    hd.innerHTML = `Together for <span>${days} beautiful days</span> ❤️`;
  }
})();

/* ---- KEYBOARD NAVIGATION ---- */
document.addEventListener('keydown', e => {
  // Lightbox keyboard nav
  const lb = $('#lb');
  if (!lb.classList.contains('hide')) {
    if (e.key === 'ArrowRight') openLB(idx + 1);
    if (e.key === 'ArrowLeft')  openLB(idx - 1);
    if (e.key === 'Escape')     lb.classList.add('hide');
    return;
  }
  // Scene keyboard nav
  if (e.key === 'ArrowRight' && !$('#nx').hidden) show(cur + 1);
});

/* ---- SWIPE TO NAVIGATE SCENES ---- */
(function() {
  let tsx = 0, tsy = 0;
  document.addEventListener('touchstart', e => {
    tsx = e.touches[0].clientX;
    tsy = e.touches[0].clientY;
  }, {passive: true});
  document.addEventListener('touchend', e => {
    // Skip if lightbox is open or we're in the gallery/letter scroll area
    if (!$('#lb').classList.contains('hide')) return;
    if (e.target.closest('#gal') || e.target.closest('#letter')) return;
    const dx = e.changedTouches[0].clientX - tsx;
    const dy = e.changedTouches[0].clientY - tsy;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 55) {
      if (dx < 0 && !$('#nx').hidden) show(cur + 1); // swipe left = next
    }
  }, {passive: true});
})();

/* ---- BOOT ---- */
addEventListener('load', () => {
  setTimeout(() => {
    const loader = $('#loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 1000);
    show(1);
  }, 1600);
});
