/* FixIT — Fuente única de verdad de los planes de soporte remoto.
   La consume la landing (assets/precios-landing.js) y el cotizador (cotizador.html).
   Si cambias un precio aquí, ambas páginas quedan sincronizadas. */
(function (global) {
  'use strict';

  var LIMITE_EQUIPOS = 15;

  function redondearDecena(n) {
    return Math.round(n / 10) * 10;
  }

  function mxn(n) {
    return '$' + Number(n).toLocaleString('es-MX');
  }

  var PLANES = [
    {
      slug: 'basico',
      nombre: 'Plan Básico',
      nombreCotizador: 'Remoto Básico',
      equiposTexto: '1 equipo',
      equiposMin: 1,
      equiposMax: 1,
      popular: false,
      features: [
        'Impresoras, redes y configuración básica',
        'Mantenimiento preventivo remoto',
        'Respuesta en 24–48h por WhatsApp',
        '1 equipo cubierto'
      ]
    },
    {
      slug: 'profesional',
      nombre: 'Plan Profesional',
      nombreCotizador: 'Remoto Profesional',
      equiposTexto: '2 a 3 equipos',
      equiposMin: 2,
      equiposMax: 3,
      popular: true,
      features: [
        'Todo lo del plan Básico',
        'Diagnóstico y resolución',
        'Reporte mensual de servicios atendidos',
        'De 2 a 3 equipos cubiertos'
      ]
    },
    {
      slug: 'empresarial',
      nombre: 'Plan Empresarial',
      nombreCotizador: 'Remoto Empresarial',
      equiposTexto: '4 a 10 equipos',
      equiposMin: 4,
      equiposMax: 10,
      popular: false,
      features: [
        'Todo lo del plan Profesional',
        'De 4 a 10 equipos cubiertos'
      ]
    }
  ];

  function precioRemoto(equipos) {
    var n = parseInt(equipos, 10);
    if (isNaN(n)) n = 1;
    n = Math.max(1, Math.min(LIMITE_EQUIPOS, n));
    if (n <= 1) return { min: 450, max: 450 };
    if (n <= 3) {
      var p = redondearDecena(700 + (n - 2) * 200);
      return { min: p, max: p };
    }
    if (n <= 10) {
      var e = redondearDecena(1500 + (n - 4) * (500 / 6));
      return { min: e, max: e };
    }
    return { min: null, max: null };
  }

  function precioTextoDe(plan) {
    var r = plan.rango || precioRemoto(plan.equiposMin);
    if (r.min === null) return 'A cotizar';
    if (r.min === r.max) return mxn(r.min);
    return mxn(r.min) + ' a ' + mxn(r.max);
  }

  PLANES.forEach(function (p) {
    var rMin = precioRemoto(p.equiposMin);
    var rMax = precioRemoto(p.equiposMax);
    p.rango = { min: rMin.min, max: rMax.max };
    p.precioTexto = precioTextoDe(p);
  });

  function calcularRemoto(equipos) {
    var n = parseInt(equipos, 10);
    if (isNaN(n)) n = 1;
    n = Math.max(1, Math.min(LIMITE_EQUIPOS, n));
    var r = precioRemoto(n);
    if (n <= 1) {
      return {
        nombre: 'Remoto Básico',
        plan: 'basico',
        precioMin: 450,
        precioMax: 450,
        detalle: '1 equipo cubierto · respuesta 24–48h',
        beneficios: 'respuesta 24–48h'
      };
    }
    if (n <= 3) {
      return {
        nombre: 'Remoto Profesional',
        plan: 'profesional',
        precioMin: r.min,
        precioMax: r.max,
        detalle: n + ' equipos cubiertos · respuesta el mismo día · soporte remoto ilimitado',
        beneficios: 'respuesta el mismo día · soporte remoto ilimitado'
      };
    }
    if (n <= 10) {
      return {
        nombre: 'Remoto Empresarial',
        plan: 'empresarial',
        precioMin: r.min,
        precioMax: r.max,
        detalle: n + ' equipos cubiertos · reporte mensual',
        beneficios: 'reporte mensual'
      };
    }
    return {
      nombre: 'Cotización personalizada',
      plan: null,
      precioMin: null,
      precioMax: null,
      detalle: 'Más de 10 equipos — cotizar caso por caso',
      beneficios: 'cotización a la medida según el número de equipos'
    };
  }

  global.FIXIT_PRECIOS = {
    PLANES: PLANES,
    LIMITE_EQUIPOS: LIMITE_EQUIPOS,
    precioRemoto: precioRemoto,
    calcularRemoto: calcularRemoto,
    redondearDecena: redondearDecena
  };
})(typeof window !== 'undefined' ? window : this);
