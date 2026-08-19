/* ═══════════════════════════════════════════════════════════
   MOTEUR DU SITE — ne pas modifier.
   Ce fichier lit contenu.js et remplit la page.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof CONTENU === 'undefined') {
    document.body.innerHTML = '<p style="padding:3rem;font-family:sans-serif">Le fichier <b>contenu.js</b> est introuvable ou contient une erreur (souvent une virgule ou un guillemet oublié). Ouvre-le et vérifie la dernière ligne que tu as modifiée.</p>';
    return;
  }

  var C = CONTENU;
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var get = function (path) {
    return path.split('.').reduce(function (o, k) { return (o || {})[k]; }, C);
  };
  var $ = function (id) { return document.getElementById(id); };

  /* ── Textes simples via data-c ───────────────────────── */
  document.querySelectorAll('[data-c]').forEach(function (el) {
    var v = get(el.getAttribute('data-c'));
    if (v) el.textContent = v;
  });

  /* ── Titre de l'onglet + description Google ──────────── */
  var e = C.entreprise || {};
  document.title = (e.nom || 'Artisan') + ' — ' + (e.metier || '') + (e.ville ? ' à ' + e.ville : '');
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', (C.hero && C.hero.sous_titre) || '');
  document.documentElement.lang = 'fr';

  /* ── Téléphone : tous les boutons d'appel ────────────── */
  var tel = e.telephone_lien || (e.telephone || '').replace(/[^0-9+]/g, '');
  [['nav-tel', e.telephone], ['hero-tel', 'Appeler ' + (e.telephone || '')],
   ['contact-tel', e.telephone], ['callbar', 'Appeler ' + (e.telephone || '')]
  ].forEach(function (p) {
    var el = $(p[0]);
    if (!el) return;
    el.href = 'tel:' + tel;
    el.textContent = p[1];
  });
  var mailEl = $('contact-mail');
  if (mailEl && e.email) mailEl.innerHTML = '<a href="mailto:' + esc(e.email) + '">' + esc(e.email) + '</a>';

  /* ── Hero : image de fond ────────────────────────────── */
  if (C.hero && C.hero.image) $('hero-bg').style.backgroundImage = 'url("' + C.hero.image + '")';

  /* ── Rassurances ─────────────────────────────────────── */
  $('reassure-grid').innerHTML = (C.rassurances || []).map(function (r) {
    return '<div class="reassure__it"><p class="reassure__t">' + esc(r.titre) +
           '</p><p class="reassure__d">' + esc(r.texte) + '</p></div>';
  }).join('');

  /* ── Prestations ─────────────────────────────────────── */
  $('serv-grid').innerHTML = (C.prestations || []).map(function (s, i) {
    return '<article class="serv__it reveal"><p class="serv__n">' + String(i + 1).padStart(2, '0') +
           '</p><h3 class="serv__t">' + esc(s.titre) + '</h3><p class="serv__d">' + esc(s.texte) + '</p></article>';
  }).join('');

  /* ── Réalisations ────────────────────────────────────── */
  $('work-grid').innerHTML = (C.realisations || []).map(function (w) {
    return '<article class="work__it reveal"><div class="work__img" style="background-image:url(\'' +
           esc(w.image) + '\')"></div><div class="work__cap"><h3 class="work__t">' + esc(w.titre) +
           '</h3><p class="work__m">' + esc(w.lieu) + '</p><p class="work__d">' + esc(w.detail) +
           '</p></div></article>';
  }).join('');

  /* ── Photo de l'artisan ──────────────────────────────── */
  if (C.apropos && C.apropos.photo) $('about-photo').style.backgroundImage = 'url("' + C.apropos.photo + '")';

  /* ── Avis : la section reste masquée s'il n'y en a aucun
        (mieux vaut zéro avis que des faux) ──────────────── */
  if (C.avis && C.avis.length) {
    $('avis').hidden = false;
    $('avis-grid').innerHTML = C.avis.map(function (a) {
      return '<blockquote class="avis__it reveal"><p class="avis__q">« ' + esc(a.texte) +
             ' »</p><p class="avis__a">' + esc(a.auteur) + (a.lieu ? ' — ' + esc(a.lieu) : '') + '</p></blockquote>';
    }).join('');
  }

  /* ── Zone d'intervention ─────────────────────────────── */
  $('zone-list').innerHTML = ((C.zone && C.zone.villes) || []).map(function (v) {
    return '<li>' + esc(v) + '</li>';
  }).join('');

  /* ── Formulaire : affiché seulement si une adresse
        Formspree est renseignée ───────────────────────── */
  var form = $('contact-form');
  if (C.contact && C.contact.formulaire_url) {
    form.hidden = false;
    form.action = C.contact.formulaire_url;
    form.method = 'POST';
  } else {
    document.querySelector('.contact').classList.add('is-solo');
  }

  /* ── Pied de page ────────────────────────────────────── */
  $('foot-nom').textContent = '© ' + new Date().getFullYear() + ' ' + (e.nom || '');
  if (e.siret) $('foot-siret').textContent = 'SIRET ' + e.siret;

  /* ── Barre de navigation au scroll ───────────────────── */
  var nav = $('nav'), callbar = $('callbar'), hero = $('hero');
  var onScroll = function () {
    var y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 40);
    callbar.classList.toggle('is-on', y > hero.offsetHeight * 0.7);
    var bg = $('hero-bg');
    if (bg && y < window.innerHeight) bg.style.transform = 'scale(1.06) translateY(' + (y * 0.25) + 'px)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Apparition des sections ─────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

})();
