const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// ---------- Gallery ----------
const galleryGrid = $('#galleryGrid');
let currentPhoto = 0;

function renderGallery() {
  galleryGrid.innerHTML = SITE_MEDIA.photos.map((p, i) => `
    <button class="gallery-card reveal" data-index="${i}" type="button">
      <img src="${p.src}" alt="${escapeHtml(p.title)}" loading="lazy">
      <span><b>${escapeHtml(p.title)}</b><small>${escapeHtml(p.note || '')}</small></span>
    </button>`).join('');
  $$('.gallery-card').forEach(card => card.addEventListener('click', () => openLightbox(+card.dataset.index)));
}

function escapeHtml(text='') { return text.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

const lightbox = $('#lightbox'), lightboxImg = $('#lightboxImg'), lightboxCaption = $('#lightboxCaption');
function openLightbox(index) {
  currentPhoto = index;
  const p = SITE_MEDIA.photos[index];
  lightboxImg.src = p.src; lightboxImg.alt = p.title;
  lightboxCaption.textContent = `${p.title}${p.note ? ' — ' + p.note : ''}`;
  lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll');
}
function closeLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); }
function changePhoto(step) { openLightbox((currentPhoto + step + SITE_MEDIA.photos.length) % SITE_MEDIA.photos.length); }
$('#closeLightbox').onclick = closeLightbox; $('#prevPhoto').onclick = () => changePhoto(-1); $('#nextPhoto').onclick = () => changePhoto(1);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

// ---------- Videos ----------
const videoGrid = $('#videoGrid');
function renderVideos() {
  if (!SITE_MEDIA.videos.length) {
    videoGrid.innerHTML = `<div class="empty-video"><div>♡</div><h3>Your videos go here.</h3><p>Put your .mp4/.webm files in <code>media/videos/</code>, then add them to <code>media.js</code>.</p></div>`;
    return;
  }
  videoGrid.innerHTML = SITE_MEDIA.videos.map(v => `<article class="video-card"><video controls preload="metadata" playsinline src="${v.src}"></video><h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.note||'')}</p></article>`).join('');
}

// ---------- Music ----------
const music = $('#bgMusic'), musicBtn = $('#musicBtn');
if (SITE_MEDIA.music) { music.src = SITE_MEDIA.music; musicBtn.classList.add('ready'); }
musicBtn.addEventListener('click', async () => {
  if (!SITE_MEDIA.music) { alert('Add your music file in media/music/ and set SITE_MEDIA.music in media.js first.'); return; }
  if (music.paused) { await music.play(); musicBtn.innerHTML = 'Ⅱ <span>Music</span>'; } else { music.pause(); musicBtn.innerHTML = '♪ <span>Music</span>'; }
});

// ---------- Smooth navigation ----------
$$('[data-scroll]').forEach(btn => btn.addEventListener('click', () => $(btn.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const target=$(a.getAttribute('href')); if(target){e.preventDefault(); target.scrollIntoView({behavior:'smooth'});} }));

// ---------- Reveal animations ----------
const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }), {threshold:.08});
$$('.reveal').forEach(el => observer.observe(el));

// ---------- Floating hearts ----------
const hearts = $('#hearts');
for(let i=0;i<24;i++) { const h=document.createElement('span'); h.textContent=Math.random()>.25?'♡':'✦'; h.style.left=Math.random()*100+'%'; h.style.animationDelay=(Math.random()*12)+'s'; h.style.animationDuration=(9+Math.random()*10)+'s'; h.style.fontSize=(8+Math.random()*14)+'px'; hearts.appendChild(h); }

// ---------- Keyboard ----------
document.addEventListener('keydown', e => { if(e.key==='Escape') closeLightbox(); if(lightbox.classList.contains('open')) { if(e.key==='ArrowRight') changePhoto(1); if(e.key==='ArrowLeft') changePhoto(-1); } });

renderGallery(); renderVideos();
