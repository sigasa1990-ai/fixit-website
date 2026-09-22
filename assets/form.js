/* FixIT form v2 — mismo payload y APPS_SCRIPT_URL. UX + a11y mejorados. Honeypot no rompe backend. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('quoteForm');
    if (!form) return;
    var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2703gHvfR_B5J7s1z_VEXJFpxUsF4zsURqLXtHFcyPB-IkhgVTohWv9C-LX4oXchEEw/exec';

    var tipoRadios = form.querySelectorAll('input[name="tipo"]');
    var descLabel = document.getElementById('descriptionLabel');
    var descInput = document.getElementById('description');
    var submit = document.getElementById('submitBtn');
    var ticketNote = document.getElementById('ticketNote');
    function updateTipo() {
      var sel = form.querySelector('input[name="tipo"]:checked');
      var isTicket = !!sel && sel.value === 'ticket';
      if (descLabel) descLabel.textContent = isTicket ? 'Describe brevemente el problema' : 'Cuéntanos brevemente qué necesitas';
      if (descInput) descInput.placeholder = isTicket
        ? 'Ej: La impresora de recepción dejó de imprimir desde ayer...'
        : 'Ej: Tenemos 3 equipos y una impresora de red que se desconecta seguido...';
      if (submit) submit.innerHTML = isTicket
        ? '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Reportar falla'
        : '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Enviar solicitud';
      if (ticketNote) ticketNote.hidden = !isTicket;
    }
    tipoRadios.forEach(function (r) { r.addEventListener('change', updateTipo); });
    updateTipo();

    // Validación on-blur con mensajes junto al campo
    function setErr(input, msg) {
      var wrap = input.closest('.form-group');
      if (!wrap) return;
      var e = wrap.querySelector('.field-err');
      if (!e) { e = document.createElement('p'); e.className = 'field-err'; e.id = input.id + '-err'; wrap.appendChild(e); }
      e.textContent = msg || '';
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) input.setAttribute('aria-describedby', (input.getAttribute('data-hint') || '') + ' ' + e.id);
      else input.removeAttribute('aria-describedby');
      input.classList.toggle('invalid', !!msg);
    }
    ['name', 'company', 'phone', 'serviceType'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('blur', function () { validateField(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') validateField(el); });
    });
    function validateField(el) {
      var v = (el.value || '').trim();
      if (el.id === 'phone') {
        var digits = v.replace(/\D/g, '');
        if (!v) { setErr(el, 'Escribe tu WhatsApp para poder contactarte.'); return false; }
        if (digits.length < 10) { setErr(el, 'Revisa el número: debe tener al menos 10 dígitos.'); return false; }
        setErr(el, ''); return true;
      }
      if (!v) { setErr(el, 'Este campo es obligatorio.'); return false; }
      setErr(el, ''); return true;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Honeypot: bots lo llenan; humanos nunca lo ven. No se envía al backend.
      var hp = document.getElementById('website_hp');
      if (hp && hp.value) return;
      var btn = submit, msg = document.getElementById('formMessage');
      var original = btn.innerHTML;
      var ok = true;
      ['name', 'company', 'phone', 'serviceType'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el && !validateField(el)) ok = false;
      });
      if (!ok) {
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Enviando...';
      msg.className = 'reg-msg'; msg.textContent = '';
      var data = {};
      new FormData(form).forEach(function (value, key) { if (key !== 'website_hp') data[key] = value; });
      fetch(APPS_SCRIPT_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      }).then(function () {
        var folio = 'FIX-' + new Date().getFullYear() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
        form.reset(); updateTipo();
        msg.className = 'reg-msg success';
        msg.setAttribute('role', 'status');
        msg.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> Solicitud enviada (' + folio + ', referencia local). Te contactaremos muy pronto por WhatsApp.';
        btn.disabled = false; btn.removeAttribute('aria-busy'); btn.innerHTML = original;
      }).catch(function () {
        msg.className = 'reg-msg error';
        msg.setAttribute('role', 'alert');
        msg.innerHTML = '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Error de conexión. Tus datos siguen en el formulario. Intenta de nuevo o <a href="https://wa.me/526861959581?text=Hola%2C%20quiero%20una%20cotizaci%C3%B3n%20de%20soporte%20t%C3%A9cnico" target="_blank" rel="noopener">escríbenos por WhatsApp</a>.';
        btn.disabled = false; btn.removeAttribute('aria-busy'); btn.innerHTML = original;
      });
    });
  });
})();
