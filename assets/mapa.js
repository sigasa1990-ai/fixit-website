/* Mapa interactivo (Leaflet 1.9.4 + OpenStreetMap) para la seccion
   "Cotiza o reporta una falla".
   - Carga Leaflet (JS) solo cuando el mapa entra al viewport (lazy).
   - Si Leaflet no carga, se conserva el SVG de respaldo (.mapa-fallback).
   - No usa Google Maps ni API keys.
   - scrollWheelZoom desactivado al inicio para no bloquear el scroll de la
     pagina en movil; se activa cuando el usuario hace click en el mapa. */
(function () {
  'use strict';

  var LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  var LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  var OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
  var LAT = 32.6245;
  var LNG = -115.4523;
  var ZOOM = 13;

  var figure = document.getElementById('mapa-mexicali');
  var cont = document.getElementById('mapa-leaflet');
  if (!figure || !cont) return;

  var cargando = false;
  var iniciado = false;

  function asegurarCss() {
    if (document.querySelector('link[href="' + LEAFLET_CSS + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = LEAFLET_CSS;
    document.head.appendChild(l);
  }

  function iniciarMapa() {
    if (iniciado || !window.L) return;
    iniciado = true;

    var map = window.L.map(cont, {
      center: [LAT, LNG],
      zoom: ZOOM,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      keyboard: true,
      zoomControl: true,
      attributionControl: true
    });

    window.L.tileLayer(OSM_URL, { maxZoom: 19, attribution: OSM_ATTR }).addTo(map);

    var icono = window.L.divIcon({
      className: 'mapa-pin',
      html: '<svg width="36" height="48" viewBox="0 0 36 48" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M18 2C10.3 2 4 8.3 4 16c0 10.5 14 28 14 28s14-17.5 14-28C32 8.3 25.7 2 18 2z" fill="#FF7A59"/>' +
        '<circle cx="18" cy="16" r="6" fill="#FFFFFF"/></svg>',
      iconSize: [36, 48],
      iconAnchor: [18, 46],
      popupAnchor: [0, -40]
    });

    var marcador = window.L.marker([LAT, LNG], {
      icon: icono,
      title: 'FixIT Soluciones - Mexicali, B.C.',
      alt: 'Ubicacion de FixIT Soluciones en Mexicali, B.C.'
    }).addTo(map);
    marcador.bindPopup('<strong>FixIT Soluciones</strong><br>Mexicali, B.C.');

    /* Zoom con rueda solo despues de interactuar (evita secuestrar el scroll). */
    map.on('click', function () { map.scrollWheelZoom.enable(); });
    map.on('mouseout', function () { map.scrollWheelZoom.disable(); });

    figure.classList.add('mapa-listo');
    map.invalidateSize();
  }

  function cargarLeaflet() {
    if (cargando) return;
    cargando = true;
    asegurarCss();
    var s = document.createElement('script');
    s.src = LEAFLET_JS;
    s.async = true;
    s.onload = iniciarMapa;
    s.onerror = function () { /* se mantiene el SVG de respaldo */ };
    document.head.appendChild(s);
  }

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          cargarLeaflet();
          obs.disconnect();
          break;
        }
      }
    }, { rootMargin: '200px 0px' });
    obs.observe(figure);
  } else {
    cargarLeaflet();
  }
})();
