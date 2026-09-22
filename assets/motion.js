/* FixIT motion — header, menú accesible, progreso, flotantes. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scrolled
  var hdr = document.getElementById('hdr');
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 40);
        var bar = document.getElementById('scrollProgress');
        if (bar) {
          var h = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ')';
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú accesible
  var mb = document.getElementById('menuBtn'), nm = document.getElementById('navMenu');
  var lastFocus = null;
  function setMenu(open) {
    if (!nm || !mb) return;
    nm.classList.toggle('open', open);
    mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    mb.querySelector('i').className = open ? 'fa-solid fa-times' : 'fa-solid fa-bars';
    if (open) { lastFocus = document.activeElement; var f = nm.querySelector('a'); if (f) f.focus(); }
    else if (lastFocus) { try { lastFocus.focus(); } catch (e) {} }
  }
  if (mb && nm) {
    mb.addEventListener('click', function () { setMenu(!nm.classList.contains('open')); });
    nm.querySelectorAll('a').forEach(function (l) { l.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nm.classList.contains('open')) setMenu(false); });
    document.addEventListener('click', function (e) {
      if (nm.classList.contains('open') && !nm.contains(e.target) && !mb.contains(e.target)) setMenu(false);
    });
  }

  // El contenido es estático (sin animaciones de entrada); el movimiento narrativo vive en ambient.js
  // back-to-top + wa-float inteligente
  var btt = document.getElementById('backToTop');
  var footer = document.getElementById('contact');
  function top(e) { if (e) e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
  if (btt) btt.addEventListener('click', top);
  var ftl = document.getElementById('footerTopLink');
  if (ftl) ftl.addEventListener('click', top);
  if (btt && footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es.forEach(function (en) { btt.classList.toggle('show', en.isIntersecting); }); }, { threshold: 0.12 }).observe(footer);
  }
  var waFloat = document.querySelector('.wa-float');
  var quote = document.getElementById('cotizar');
  if (waFloat && quote && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es.forEach(function (en) { waFloat.classList.toggle('hidden-near-form', en.isIntersecting); }); }, { threshold: 0.15 }).observe(quote);
  }

  // Cookies
  try {
    if (!localStorage.getItem('cookiesAccepted')) document.getElementById('cookieBanner').classList.add('show');
    document.getElementById('cookieAccept').addEventListener('click', function () {
      localStorage.setItem('cookiesAccepted', 'true');
      document.getElementById('cookieBanner').classList.remove('show');
    });
  } catch (e) {}
})();
