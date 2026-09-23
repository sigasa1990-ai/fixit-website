(function () {
  'use strict';

  var API = 'https://backup.fixitsoluciones.com';
  var PLANES = {};
  var planesCargados = false;

  // Servicios que no viven en /backup-plans (los planes de soporte).
  // El precio y el nombre son solo para mostrar en el modal; el backend
  // resuelve el precio real de Stripe por slug.
  var SERVICIOS = {
    'soporte-basico': { nombre: 'Soporte Básico', tipo: 'soporte', precio_mxn: 450 },
    'soporte-profesional': { nombre: 'Soporte Profesional', tipo: 'soporte', precio_mxn: 900 },
    'soporte-empresarial': { nombre: 'Soporte Empresarial', tipo: 'soporte', precio_mxn: 2000 },
  };

  function formatearPrecio(valor) {
    return '$' + Number(valor).toLocaleString('es-MX');
  }

  async function cargarPlanes() {
    try {
      var r = await fetch(API + '/api/public/backup-plans', { headers: { 'Accept': 'application/json' } });
      if (!r.ok) return;
      var planes = await r.json();
      if (!Array.isArray(planes)) return;
      planes.forEach(function (p) {
        PLANES[p.slug] = p;
        var el = document.querySelector('[data-plan-precio="' + p.slug + '"]');
        if (el && p.precio_mxn) el.textContent = Number(p.precio_mxn).toLocaleString('es-MX');
      });
      planesCargados = true;
    } catch (e) { /* se conserva el precio estático */ }
  }

  function restaurarBotonPago() {
    var btn = document.getElementById('bk-submit');
    if (!btn) return;
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-lock" aria-hidden="true"></i> Ir a pago seguro';
  }

  function abrirModal(slug) {
    var modal = document.getElementById('backupModal');
    if (!modal) return;
    restaurarBotonPago();
    document.getElementById('bk-plan').value = slug;
    var titulo = document.getElementById('bk-plan-nombre');
    var plan = PLANES[slug] || SERVICIOS[slug];
    if (titulo) {
      if (!plan) {
        titulo.textContent = 'Configuración mensual recurrente · Pago seguro con Stripe';
      } else if (SERVICIOS[slug]) {
        titulo.textContent = plan.nombre + ' · ' + formatearPrecio(plan.precio_mxn) + ' MXN/mes + IVA';
      } else {
        titulo.textContent = 'Plan ' + plan.nombre + ' · ' + (plan.almacenamiento_gb || '') + ' GB · ' + formatearPrecio(plan.precio_mxn) + ' MXN/mes + IVA';
      }
    }
    var msg = document.getElementById('bk-msg');
    if (msg) { msg.textContent = ''; msg.className = 'bk-msg'; }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    var email = document.getElementById('bk-email');
    if (email) email.focus();
  }

  function cerrarModal() {
    var modal = document.getElementById('backupModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    restaurarBotonPago();
  }

  async function enviar(e) {
    e.preventDefault();
    var btn = document.getElementById('bk-submit');
    var msg = document.getElementById('bk-msg');
    var slug = document.getElementById('bk-plan').value;

    if (!planesCargados) await cargarPlanes();
    var plan = PLANES[slug] || SERVICIOS[slug];
    if (!plan) {
      msg.textContent = 'No pudimos conectar con el servicio de pagos. Intenta de nuevo en un momento o escríbenos por WhatsApp.';
      msg.className = 'bk-msg err';
      return;
    }

    var payload = {
      planId: plan.id || undefined,
      slug: slug,
      email: (document.getElementById('bk-email').value || '').trim(),
      name: (document.getElementById('bk-nombre').value || '').trim(),
      company: (document.getElementById('bk-empresa').value || '').trim(),
      rfc: (document.getElementById('bk-rfc').value || '').trim(),
      taxRegion: 'resto',
    };

    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      msg.textContent = 'Escribe un correo electrónico válido para enviarte el acceso.';
      msg.className = 'bk-msg err';
      return;
    }
    if (!payload.name) {
      msg.textContent = 'Escribe tu nombre completo.';
      msg.className = 'bk-msg err';
      return;
    }

    var textoBoton = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Abriendo pago seguro...';
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, 25000);
    try {
      var r = await fetch(API + '/api/public/backup-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      var data = await r.json().catch(function () { return {}; });
      if (!r.ok || !data.url) throw new Error(data.error || 'No se pudo iniciar el pago');
      clearTimeout(timer);
      window.location.href = data.url;
    } catch (ex) {
      clearTimeout(timer);
      var agotado = ex && ex.name === 'AbortError';
      msg.textContent = (agotado ? 'El servicio tardó demasiado en responder.' : ex.message) + ' — también puedes escribirnos por WhatsApp y lo activamos manualmente.';
      msg.className = 'bk-msg err';
      btn.disabled = false;
      btn.innerHTML = textoBoton;
    }
  }

  window.addEventListener('pageshow', restaurarBotonPago);

  document.addEventListener('DOMContentLoaded', function () {
    cargarPlanes();

    document.querySelectorAll('[data-plan-cta], [data-service-cta]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        abrirModal(b.getAttribute('data-plan-cta') || b.getAttribute('data-service-cta'));
      });
    });

    var modal = document.getElementById('backupModal');
    if (modal) {
      modal.addEventListener('click', function (e) { if (e.target === modal) cerrarModal(); });
      var close = document.getElementById('bk-close');
      if (close) close.addEventListener('click', cerrarModal);
      var form = document.getElementById('bk-form');
      if (form) form.addEventListener('submit', enviar);
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarModal(); });
  });
})();
