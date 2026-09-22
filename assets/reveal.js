/* FixIT — revelado progresivo de contenido (IntersectionObserver) + desvanecido del hero con el scroll.
   Sin dependencias. Cada bloque se anima UNA sola vez.
   Con prefers-reduced-motion todo aparece visible de inmediato. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  /* Activa el estado inicial oculto SOLO si este script corre (fallback: contenido siempre visible) */
  document.documentElement.classList.add('rv-ready');

  /* 1) Hero: visible al cargar; se desvanece al iniciar el scroll (rAF, sin librerías) */
  var heroCopy = document.querySelector('.hero-copy');
  if (heroCopy) {
    var ticking = false;
    var updateHero = function () {
      var y = window.scrollY || window.pageYOffset || 0;
      var span = (window.innerHeight || 800) * 0.55;
      var o = 1 - Math.min(1, y / span);
      heroCopy.style.opacity = String(o);
      heroCopy.style.transform = 'translateY(' + (-40 * (1 - o)).toFixed(1) + 'px)';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateHero); }
    }, { passive: true });
    updateHero();
  }

  /* 2) Stagger dentro de grupos (planes, testimonios) */
  document.querySelectorAll('[data-rv-group]').forEach(function (group) {
    var items = group.querySelectorAll('.rv');
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i * 90) + 'ms';
      var ph = el.querySelector('.rv-photo');
      if (ph) ph.style.transitionDelay = (i * 90 + 130) + 'ms';
    });
  });

  /* 3) Revelado al entrar en viewport (una sola vez por elemento) */
  var els = document.querySelectorAll('.rv');
  function show(el) {
    el.classList.add('in');
    var ph = el.querySelector('.rv-photo');
    if (ph) ph.classList.add('in');
  }
  if (!('IntersectionObserver' in window)) {
    els.forEach(show);
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      show(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
