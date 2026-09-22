(function () {
  'use strict';
  function aplicar() {
    var mod = window.FIXIT_PRECIOS;
    if (!mod) return;
    var planes = {};
    mod.PLANES.forEach(function (p) { planes[p.slug] = p; });
    document.querySelectorAll('[data-soporte-precio]').forEach(function (el) {
      var p = planes[el.getAttribute('data-soporte-precio')];
      if (p) el.textContent = p.precioTexto;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aplicar);
  else aplicar();
})();
