/* ═══════════════════════════════════════════════════════════
   MOTEUR DU SITE — ne pas modifier.
   Lit contenu.js, remplit la page, gère les effets de scroll.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof CONTENU === 'undefined') {
    document.body.innerHTML = '<p style="padding:3rem;font-family:sans-serif;font-size:17px;line-height:1.6">Le fichier <b>contenu.js</b> est introuvable ou contient une erreur (souvent une virgule ou un guillemet oublié).<br>Ouvre-le et vérifie la dernière ligne que tu as modifiée.</p>';
    return;
  }

  var C = CONTENU;
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var get = function (p) { return p.split('.').reduce(function (o, k) { return (o || {})[k]; }, C); };
  var $ = function (id) { return document.getElementById(id); };
  var bg = function (el, url) { if (el && url) el.style.backgroundImage = 'url("' + url + '")'; };
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ── Textes simples ──────────────────────────────────── */
  document.querySelectorAll('[data-c]').forEach(function (el) {
    var v = get(el.getAttribute('data-c'));
    if (v) el.textContent = v;
  });

  /* ── Identité, onglet, description ───────────────────── */
  var e = C.entreprise || {};
  document.title = (e.nom || 'Artisan') + ' — ' + (e.metier || '') + (e.ville ? ' à ' + e.ville : '');
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', ((C.hero && C.hero.titre) || '') + ' ' + (e.ville ? '— ' + e.ville : ''));
  $('nav-nom').textContent = e.nom || '';

  /* ── Menu ────────────────────────────────────────────── */
  $('nav-links').innerHTML = (C.menu || []).map(function (m) {
    return '<a href="' + esc(m.lien) + '">' + esc(m.texte) + '</a>';
  }).join('');

  /* ── Téléphone partout ───────────────────────────────── */
  var tel = e.telephone_lien || (e.telephone || '').replace(/[^0-9+]/g, '');
  [['nav-tel', e.telephone], ['contact-tel', e.telephone], ['callbar', 'Appeler ' + (e.telephone || '')]]
    .forEach(function (p) {
      var el = $(p[0]); if (!el) return;
      el.href = 'tel:' + tel; el.textContent = p[1];
    });
  var mailEl = $('contact-mail');
  if (mailEl && e.email) mailEl.innerHTML = '<a href="mailto:' + esc(e.email) + '">' + esc(e.email) + '</a>';

  /* ── Hero ────────────────────────────────────────────── */
  if (C.hero && C.hero.image) $('hero-img').src = C.hero.image;

  /* ── Piliers ─────────────────────────────────────────── */
  $('pillars').innerHTML = (C.piliers || []).map(function (p) {
    return '<div class="pillars__it"><p class="pillars__s">' + esc(p.surtitre) +
           '</p><p class="pillars__t">' + esc(p.titre) + '</p></div>';
  }).join('');

  /* ── Cartes entreprise ───────────────────────────────── */
  var es = C.entreprise_section || {};
  bg($('ent-card1'), es.carte1_image);
  bg($('ent-card2'), es.carte2_image);

  /* ── Tuiles prestations ──────────────────────────────── */
  $('tiles').innerHTML = (C.prestations || []).map(function (s) {
    return '<article class="tile reveal"><div class="tile__bg" style="background-image:url(\'' + esc(s.image) +
           '\')"></div><div class="tile__cap"><h3 class="tile__t">' + esc(s.titre) +
           '</h3><span class="tile__go">DEMANDER UN DEVIS →</span></div></article>';
  }).join('');
  $('tiles').querySelectorAll('.tile').forEach(function (t) {
    t.addEventListener('click', function () { location.hash = '#contact'; });
    t.style.cursor = 'pointer';
  });

  /* Remplit toujours la derniere ligne : grille de 12 colonnes,
     4 tuiles par ligne, et la ligne incomplete s'etale. */
  var etaler = function (sel, parLigne) {
    var els = document.querySelectorAll(sel);
    var n = els.length, plein = Math.floor(n / parLigne) * parLigne;
    var reste = n - plein, spanReste = reste ? Math.floor(12 / reste) : 0;
    els.forEach(function (el, i) {
      el.style.gridColumn = 'span ' + (i < plein ? 12 / parLigne : spanReste);
    });
  };
  etaler('.tiles .tile', 4);

  /* ── Réalisations ────────────────────────────────────── */
  $('works').innerHTML = (C.realisations || []).map(function (w) {
    return '<article class="work reveal"><div class="work__bg" style="background-image:url(\'' + esc(w.image) +
           '\')"></div><div class="work__cap"><p class="work__c">' + esc(w.categorie) +
           '</p><h3 class="work__t">' + esc(w.titre) + '</h3><p class="work__l">' + esc(w.lieu) +
           '</p></div></article>';
  }).join('');

  etaler('.works .work', 3);

  /* ── Chiffres : masqués si la liste est vide ─────────── */
  if (C.chiffres && C.chiffres.length) {
    $('chiffres').hidden = false;
    bg($('stats-bg'), C.chiffres_image);
    $('stats-grid').innerHTML = C.chiffres.map(function (s) {
      return '<div class="stats__it"><p class="stats__n" data-n="' + esc(s.nombre) + '">0</p>' +
             '<p class="stats__l">' + esc(s.label) + '</p></div>';
    }).join('');
  }

  /* ── Équipe : masquée si la liste est vide ───────────── */
  if (C.equipe && C.equipe.length) {
    $('equipe').hidden = false;
    $('team').innerHTML = C.equipe.map(function (m) {
      return '<div class="team__it reveal"><div class="team__av"' +
             (m.photo ? ' style="background-image:url(\'' + esc(m.photo) + '\')"' : '') +
             '></div><p class="team__n">' + esc(m.nom) + '</p><p class="team__r">' + esc(m.role) + '</p></div>';
    }).join('');
  }

  /* ── Bande expérience ────────────────────────────────── */
  var bd = C.bande || {};
  bg($('band-bg'), bd.image);
  var bBtn = $('band-btn');
  if (bBtn) { bBtn.href = bd.lien || '#contact'; bBtn.textContent = bd.bouton || ''; }

  /* ── Avis : masqués s'il n'y en a aucun de réel ──────── */
  if (C.avis && C.avis.length) {
    $('avis').hidden = false;
    $('avis-grid').innerHTML = C.avis.map(function (a) {
      return '<blockquote class="avis__it reveal"><p class="avis__q">« ' + esc(a.texte) +
             ' »</p><p class="avis__a">' + esc(a.auteur) + (a.role ? ' — ' + esc(a.role) : '') + '</p></blockquote>';
    }).join('');
  }

  /* ── Zone ────────────────────────────────────────────── */
  $('zone-list').innerHTML = ((C.zone && C.zone.villes) || []).map(function (v) {
    return '<li>' + esc(v) + '</li>';
  }).join('');

  /* ── Formulaire ──────────────────────────────────────── */
  var form = $('contact-form');
  if (C.contact && C.contact.formulaire_url) {
    form.hidden = false; form.action = C.contact.formulaire_url; form.method = 'POST';
  } else {
    document.querySelector('.contact').classList.add('is-solo');
  }

  /* ── Pied de page ────────────────────────────────────── */
  $('foot-row').innerHTML = [
    e.adresse ? ['ADRESSE', e.adresse] : null,
    e.telephone ? ['TÉLÉPHONE', '<a href="tel:' + tel + '">' + esc(e.telephone) + '</a>'] : null,
    e.email ? ['EMAIL', '<a href="mailto:' + esc(e.email) + '">' + esc(e.email) + '</a>'] : null,
    e.site ? ['SITE', esc(e.site)] : null
  ].filter(Boolean).map(function (p) {
    return '<div class="foot__it"><span class="foot__k">' + p[0] + '</span><span>' + p[1] + '</span></div>';
  }).join('');
  $('foot-copy').textContent = '© ' + new Date().getFullYear() + ' ' + (e.nom || '') +
    (e.siret ? ' — SIRET ' + e.siret : '') + '. Tous droits réservés.';


  /* ═══ AVANT / APRÈS ═══════════════════════════════════
     Balayage automatique en boucle (l'effet se comprend
     sans rien faire), que le visiteur peut reprendre à la
     main en glissant. */
  (function () {
    var ap = C.avantapres || {};
    var wrap = $('ba'), before = $('ba-before'), after = $('ba-after'), line = $('ba-line');
    if (!wrap || !ap.apres) { if (wrap) wrap.closest('section').hidden = true; return; }

    after.style.backgroundImage = 'url("' + ap.apres + '")';
    /* Pas de photo "avant" fournie → on affiche la même image
       assombrie et désaturée, en attendant la vraie. */
    before.style.backgroundImage = 'url("' + (ap.avant || ap.apres) + '")';
    if (!ap.avant) before.classList.add('is-auto');

    var pos = 50, cible = 50, manuel = false, t0 = null, visible = false;
    var pose = function (v) {
      pos = Math.max(0, Math.min(100, v));
      before.style.clipPath = 'inset(0 ' + (100 - pos) + '% 0 0)';
      line.style.left = pos + '%';
    };
    pose(50);

    if (!reduce) {
      var boucle = function (t) {
        if (!t0) t0 = t;
        if (!manuel && visible) {
          /* va-et-vient doux : 0 → 100 → 0 en 9 s */
          var p = ((t - t0) / 9000) % 1;
          var v = p < 0.5 ? p * 2 : (1 - p) * 2;
          pose(6 + v * 88);
        }
        requestAnimationFrame(boucle);
      };
      requestAnimationFrame(boucle);
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; },
        { threshold: 0.25 }).observe(wrap);
    }

    var frame = wrap.querySelector('.ba__frame');
    var suit = function (clientX) {
      var r = frame.getBoundingClientRect();
      pose(((clientX - r.left) / r.width) * 100);
    };
    var prendre = function (ev) {
      manuel = true;
      suit(ev.touches ? ev.touches[0].clientX : ev.clientX);
    };
    frame.addEventListener('mousedown', prendre);
    frame.addEventListener('mousemove', function (ev) { if (manuel) suit(ev.clientX); });
    frame.addEventListener('touchstart', prendre, { passive: true });
    frame.addEventListener('touchmove', function (ev) { if (manuel) suit(ev.touches[0].clientX); }, { passive: true });
    /* on rend la main à l'animation quand la souris quitte le cadre */
    frame.addEventListener('mouseleave', function () { manuel = false; t0 = null; });
    window.addEventListener('mouseup', function () { if (manuel) { manuel = false; t0 = null; } });
  })();

  /* ═══ QUIZ ════════════════════════════════════════════ */
  (function () {
    var q = C.quiz || {}, body = $('qz-body'), fill = $('qz-fill');
    if (!body || !q.questions || !q.questions.length) {
      if (body) body.closest('section').hidden = true; return;
    }
    var i = 0, score = 0;

    var resultat = function () {
      var r = (q.resultats || []).filter(function (x) { return score >= (x.seuil || 0); }).pop()
              || (q.resultats || [])[0];
      if (!r) return;
      fill.style.width = '100%';
      body.innerHTML =
        '<div class="qz__res">' +
          '<span class="qz__badge">' + esc(q.badge || 'VOTRE PROJET') + '</span>' +
          '<h3 class="qz__rt">' + esc(r.titre) + '</h3>' +
          '<p class="qz__rp">' + esc(r.texte) + '</p>' +
          (r.reperes && r.reperes.length
            ? '<div class="qz__facts">' + r.reperes.map(function (f) {
                return '<div class="qz__fact"><p class="qz__fv">' + esc(f.valeur) +
                       '</p><p class="qz__fl">' + esc(f.label) + '</p></div>';
              }).join('') + '</div>'
            : '') +
          '<a class="btn btn--gold" href="tel:' + tel + '">' + esc(q.bouton || 'Appeler') + '</a>' +
          '<button class="qz__again" type="button">Refaire le test</button>' +
        '</div>';
      body.querySelector('.qz__again').addEventListener('click', function () { i = 0; score = 0; poser(); });
    };

    var poser = function () {
      if (i >= q.questions.length) return resultat();
      var qu = q.questions[i];
      fill.style.width = ((i / q.questions.length) * 100) + '%';
      body.innerHTML =
        '<p class="qz__step">QUESTION ' + (i + 1) + ' / ' + q.questions.length + '</p>' +
        '<h3 class="qz__q">' + esc(qu.question) + '</h3>' +
        '<div class="qz__opts">' + qu.reponses.map(function (r, k) {
          return '<button class="qz__opt" type="button" data-k="' + k + '">' +
                 '<span class="qz__dot"></span>' + esc(r.texte) + '</button>';
        }).join('') + '</div>' +
        (i > 0 ? '<button class="qz__back" type="button">← Question précédente</button>' : '');

      body.querySelectorAll('.qz__opt').forEach(function (b) {
        b.addEventListener('click', function () {
          score += (qu.reponses[+b.dataset.k].points || 0);
          i++; poser();
        });
      });
      var back = body.querySelector('.qz__back');
      if (back) back.addEventListener('click', function () { i--; poser(); });
    };
    poser();
  })();

  /* ═══ EFFETS DE SCROLL ═══════════════════════════════ */

  var nav = $('nav'), callbar = $('callbar'), hero = $('hero'), bar = $('progress');
  var bands = [];
  var sb = $('stats-bg'), bb = $('band-bg');
  if (sb) bands.push(sb);
  if (bb) bands.push(bb);

  var ticking = false;
  var onScroll = function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, vh = window.innerHeight;

      nav.classList.toggle('is-stuck', y > 40);
      callbar.classList.toggle('is-on', y > hero.offsetHeight * 0.65);

      var h = document.documentElement.scrollHeight - vh;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';

      /* Parallaxe des bandes photo — piloté en JS sur TOUS les
         viewports : iOS casse position:fixed, et deux fonds fixes
         se chevauchent (piège documenté sur la landing Cécile). */
      if (!reduce) {
        bands.forEach(function (el) {
          var r = el.parentElement.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          var prog = (vh - r.top) / (vh + r.height);
          el.style.transform = 'translate3d(0,' + ((prog - 0.5) * r.height * 0.18) + 'px,0)';
        });
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ── Apparition des sections ─────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ── Compteurs animés ────────────────────────────────── */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, cible = parseInt(el.dataset.n, 10);
      cio.unobserve(el);
      if (isNaN(cible) || reduce) { el.textContent = el.dataset.n; return; }
      var t0 = null, dur = 1400;
      var step = function (t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(cible * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stats__n').forEach(function (el) { cio.observe(el); });

  /* ── Menu mobile ─────────────────────────────────────── */
  var burger = $('burger');
  if (burger) {
    burger.addEventListener('click', function () { nav.classList.toggle('is-open'); });
    $('nav-links').addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') nav.classList.remove('is-open');
    });
  }

})();
