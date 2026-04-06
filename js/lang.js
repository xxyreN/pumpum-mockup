// Fonts — hide body until loaded, prevent FOUT
document.fonts.ready.then(function () { document.body.classList.add('fonts-ready'); });
setTimeout(function () { document.body.classList.add('fonts-ready'); }, 800);

// Language toggle — minimal, no framework
(function () {
  const STORAGE_KEY = 'pumpum-lang';
  const html = document.documentElement;

  function setLang(lang) {
    html.classList.remove('lang-en', 'lang-es');
    html.classList.add('lang-' + lang);
    html.setAttribute('lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  const saved = localStorage.getItem(STORAGE_KEY) || 'es';
  setLang(saved);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-toggle button');
    if (btn && btn.dataset.lang) setLang(btn.dataset.lang);
  });
})();

// Image fallback — replaces missing images with visible filename labels
(function () {
  function labelMissing(img) {
    const div = document.createElement('div');
    div.className = 'img-missing';
    const src = img.getAttribute('src') || '';
    div.textContent = src.split('/').pop();
    img.replaceWith(div);
  }
  function check(img) {
    if (img.complete && img.naturalWidth === 0) labelMissing(img);
    else img.addEventListener('error', () => labelMissing(img), { once: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('img').forEach(check));
  } else {
    document.querySelectorAll('img').forEach(check);
  }
})();
