/* ==========================================================================
   PLAYBOOK — PROYECTO LEYENDAS
   Lógica JS del sitio (sin frameworks, vanilla JS)
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Pantalla de intro (hero): salida al hacer clic en "Ingresar al mundo Leyendas" ---- */
  var heroBtn = document.getElementById('hero-enter');
  var hero = document.getElementById('hero');

  if (heroBtn && hero) {
    heroBtn.addEventListener('click', function () {
      hero.classList.add('hero--exit');
      document.body.classList.remove('intro-active');
      window.setTimeout(function () {
        hero.style.display = 'none';
      }, 750);
    });
  }

  /* ---- Logo del menú: vuelve a mostrar la pantalla de intro (hero), no solo hace scroll ---- */
  var logoHomeLink = document.querySelector('.top-nav a[href="#hero"]');

  if (logoHomeLink && hero) {
    logoHomeLink.addEventListener('click', function (e) {
      e.preventDefault();
      hero.style.display = '';
      /* Forzar reflow para que la transición de salida vuelva a jugar al revés */
      void hero.offsetWidth;
      hero.classList.remove('hero--exit');
      document.body.classList.add('intro-active');

      var heroVideo = hero.querySelector('.hero-bg-video');
      if (heroVideo) {
        heroVideo.currentTime = 0;
        heroVideo.play();
      }
    });
  }

  /* ---- Sincroniza --nav-h con el alto REAL del menú (evita gaps por desincronización) ---- */
  var topNav = document.querySelector('.top-nav');

  function syncNavHeight() {
    if (!topNav) return;
    var h = topNav.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-h', h + 'px');
  }
  syncNavHeight();
  window.addEventListener('resize', syncNavHeight);
  window.addEventListener('load', syncNavHeight); /* por si las fuentes cargan tarde y cambian el alto */

  /* ---- Puntos interactivos en Construcción del Logo: se iluminan cerca del cursor ---- */
  var logoConstruction = document.querySelector('.logo-construction');

  if (logoConstruction) {
    logoConstruction.addEventListener('pointermove', function (e) {
      var rect = logoConstruction.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      logoConstruction.style.setProperty('--dmx', x + '%');
      logoConstruction.style.setProperty('--dmy', y + '%');
    });
  }

  /* ---- Experiencia: la línea inferior naranja sigue la posición horizontal del cursor ---- */
  var experienciaCards = document.querySelectorAll('.experiencia-card');

  experienciaCards.forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      card.style.setProperty('--ex', x + '%');
    });
  });

  /* ---- Liquid glass: el brillo especular de .glass-panel sigue al cursor ---- */
  var glassPanels = document.querySelectorAll('.glass-panel');

  glassPanels.forEach(function (panel) {
    panel.addEventListener('pointermove', function (e) {
      var rect = panel.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      panel.style.setProperty('--mx', x + '%');
      panel.style.setProperty('--my', y + '%');
    });
    panel.addEventListener('pointerleave', function () {
      panel.style.setProperty('--mx', '50%');
      panel.style.setProperty('--my', '32%');
    });
  });

  /* ---- Insignias: selección de sub-rango (I, II, III...) al hacer clic ---- */
  var insigniaCards = document.querySelectorAll('.insignia-card');

  insigniaCards.forEach(function (card) {
    var imgs = card.querySelectorAll('.insignia-bg-stack .insignia-bg');
    var pips = card.querySelectorAll('.insignia-subrank');
    if (!imgs.length || !pips.length) return;

    /* Estado inicial: se muestra la primera imagen (I) */
    imgs.forEach(function (img, i) { img.style.opacity = i === 0 ? '1' : '0'; });

    pips.forEach(function (pip) {
      pip.addEventListener('click', function () {
        var target = parseInt(pip.getAttribute('data-target'), 10) || 0;
        if (!imgs[target]) return;

        imgs.forEach(function (img, i) {
          img.style.opacity = i === target ? '1' : '0';
        });
        pips.forEach(function (p) { p.classList.remove('is-active'); });
        pip.classList.add('is-active');
      });
    });
  });

  /* ---- Aquí se irán agregando el resto de comportamientos del playbook ---- */
  /* (carrusel de aplicaciones, modales, lightbox de zoom, etc. según avancemos) */

})();
