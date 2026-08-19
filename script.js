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
  /* liens simples : href + libellé */
  [['nav-tel', e.telephone], ['ctabar-tel', e.telephone]].forEach(function (p) {
    var el = $(p[0]); if (!el) return;
    el.href = 'tel:' + tel; el.textContent = p[1];
  });
  /* liens composés : href seulement, leur contenu est déjà en place */
  ['contact-tel', 'callbar'].forEach(function (id) {
    var el = $(id); if (el) el.href = 'tel:' + tel;
  });
  var num = $('contact-telnum'); if (num) num.textContent = e.telephone || '';
  var cbn = $('callbar-num'); if (cbn) cbn.textContent = e.telephone || '';
  var mailEl = $('contact-mail');
  if (mailEl && e.email) mailEl.innerHTML = '<a href="mailto:' + esc(e.email) + '">' + esc(e.email) + '</a>';
  var cz = $('contact-zone');
  if (cz) cz.textContent = ((C.zone && C.zone.pays) || []).join(', ');

  /* ── Surtitre du hero : affiché seulement s'il existe ── */
  var sur = document.querySelector('.hero__sur');
  if (sur && C.hero && C.hero.surtitre) sur.hidden = false;

  /* ── Hero ────────────────────────────────────────────── */
  var H = C.hero || {};
  if (H.image) $('hero-img').src = H.image;
  if (H.image_mobile) $('hero-src-m').srcset = H.image_mobile;

  /* Accueil animé : seulement si une photo « avant » est fournie.
     Sinon la photo reste fixe — aucun poids inutile au chargement. */
  if (H.image_avant) {
    var hb = $('hero-before'), hl = $('hero-line');
    $('hero-bimg').src = H.image_avant;
    if (H.image_avant_mobile) $('hero-bsrc-m').srcset = H.image_avant_mobile;
    hb.hidden = false; hl.hidden = false;
    if (!reduce) {
      var t0 = null;
      var balaie = function (t) {
        if (!t0) t0 = t;
        var p = (((t - t0) / 11000) % 1);
        var v = p < 0.5 ? p * 2 : (1 - p) * 2;
        var x = 8 + v * 84;
        hb.style.clipPath = 'inset(0 ' + (100 - x) + '% 0 0)';
        hl.style.left = x + '%';
        requestAnimationFrame(balaie);
      };
      requestAnimationFrame(balaie);
    }
  }

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

  /* ── Avis : masqués s'il n'y en a aucun de réel ──────── */
  if (C.avis && C.avis.length) {
    $('avis').hidden = false;
    $('avis-grid').innerHTML = C.avis.map(function (a) {
      return '<figure class="temo__it reveal">' +
             (a.photo ? '<div class="temo__ph" style="background-image:url(&quot;' + esc(a.photo) + '&quot;)"></div>' : '') +
             '<blockquote class="temo__q">« ' + esc(a.texte) + ' »</blockquote>' +
             '<figcaption class="temo__who"><span class="temo__n">' + esc(a.auteur) + '</span>' +
             (a.role ? '<span class="temo__r">' + esc(a.role) + '</span>' : '') + '</figcaption></figure>';
    }).join('');
  }

  /* ── Zone : pays d'intervention ──────────────────────── */
  var pl = $('geo-pays');
  if (pl) pl.innerHTML = ((C.zone && C.zone.pays) || []).map(function (v) {
    return '<li>' + esc(v) + '</li>';
  }).join('');

  /* ── Formulaire ──────────────────────────────────────── */
  var form = $('contact-form');
  if (C.contact && C.contact.formulaire_url) {
    form.hidden = false; form.action = C.contact.formulaire_url; form.method = 'POST';
  } else {
    /* pas de formulaire : la carte se recentre sur une colonne */
    document.querySelector('.ct').classList.add('is-solo');
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
     Un comparateur par chantier. Chacun balaie tout seul en
     boucle (l'effet se comprend sans rien faire) et se laisse
     reprendre à la souris ou au doigt. */
  (function () {
    var ap = C.avantapres || {}, liste = $('ba-list');
    var chantiers = (ap.chantiers || []).filter(function (c) { return c && c.apres; });
    if (!liste || !chantiers.length) {
      if (liste) liste.closest('section').hidden = true;
      return;
    }

    liste.innerHTML = chantiers.map(function (c, i) {
      var meta = [c.lieu, c.duree].filter(Boolean)
                 .map(function (x, k) { return k ? '<b>' + esc(x) + '</b>' : esc(x); }).join(' · ');
      return '<article class="ba reveal" data-i="' + i + '">' +
        '<div class="ba__head">' +
          '<span class="ba__num">' + ('0' + (i + 1)).slice(-2) + '</span>' +
          '<div class="ba__meta">' +
            '<h3 class="ba__t">' + esc(c.titre) + '</h3>' +
            (meta ? '<p class="ba__sub">' + meta + '</p>' : '') +
            (c.detail ? '<p class="ba__detail">' + esc(c.detail) + '</p>' : '') +
          '</div>' +
        '</div>' +
        '<div class="ba__frame">' +
          '<div class="ba__after" style="background-image:url(\'' + esc(c.apres) + '\')"></div>' +
          '<div class="ba__before' + (c.avant ? '' : ' is-auto') + '" style="background-image:url(\'' +
            esc(c.avant || c.apres) + '\')"></div>' +
          '<div class="ba__line"><span class="ba__grip"></span></div>' +
          '<span class="ba__tag ba__tag--l">AVANT</span>' +
          '<span class="ba__tag ba__tag--r">APRÈS</span>' +
        '</div>' +
      '</article>';
    }).join('');

    liste.querySelectorAll('.ba').forEach(function (bloc, idx) {
      var frame = bloc.querySelector('.ba__frame'),
          before = bloc.querySelector('.ba__before'),
          line = bloc.querySelector('.ba__line');
      var manuel = false, t0 = null, visible = false;

      var pose = function (v) {
        v = Math.max(0, Math.min(100, v));
        before.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
        line.style.left = v + '%';
      };
      pose(50);

      if (!reduce) {
        /* décalage par chantier : les comparateurs ne balaient pas
           tous en même temps, l'oeil accroche mieux */
        var offset = idx * 2200;
        var boucle = function (t) {
          if (!t0) t0 = t - offset;
          if (!manuel && visible) {
            var p = (((t - t0) / 9000) % 1);
            var v = p < 0.5 ? p * 2 : (1 - p) * 2;
            pose(6 + v * 88);
          }
          requestAnimationFrame(boucle);
        };
        requestAnimationFrame(boucle);
        new IntersectionObserver(function (en) { visible = en[0].isIntersecting; },
          { threshold: 0.2 }).observe(frame);
      }

      var suit = function (x) {
        var r = frame.getBoundingClientRect();
        pose(((x - r.left) / r.width) * 100);
      };
      var prendre = function (ev) {
        manuel = true;
        suit(ev.touches ? ev.touches[0].clientX : ev.clientX);
      };
      frame.addEventListener('mousedown', prendre);
      frame.addEventListener('mousemove', function (ev) { if (manuel) suit(ev.clientX); });
      frame.addEventListener('touchstart', prendre, { passive: true });
      frame.addEventListener('touchmove', function (ev) { if (manuel) suit(ev.touches[0].clientX); }, { passive: true });
      frame.addEventListener('mouseleave', function () { manuel = false; t0 = null; });
      window.addEventListener('mouseup', function () { if (manuel) { manuel = false; t0 = null; } });
    });
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


  /* ═══ CARTE ═══════════════════════════════════════════
     Leaflet + OpenStreetMap. setView AVANT d'ajouter les
     couches, sinon la projection plante. */
  (function () {
    var el = $('map'), z = C.zone || {};
    if (!el || z.latitude == null) return;
    var demarre = function () {
      if (typeof L === 'undefined') return setTimeout(demarre, 200);
      var centre = [z.latitude, z.longitude];
      var map = L.map(el, {
        dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
        boxZoom: false, keyboard: false, zoomControl: false, attributionControl: true
      });
      map.setView([47.2, 4.6], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap', maxZoom: 12
      }).addTo(map);
      L.circle(centre, { radius: 90000, color: '#FBBE3F', weight: 2, fillColor: '#FBBE3F', fillOpacity: .16 }).addTo(map);
      L.marker(centre).addTo(map).bindTooltip(C.entreprise.ville || '', { permanent: true, direction: 'top', className: 'geo__tip' });
      setTimeout(function () { map.invalidateSize(); }, 300);
    };
    demarre();
  })();

  /* ═══ QUESTIONNAIRE → WHATSAPP ════════════════════════
     4 questions, la 2ᵉ s'adapte au pays choisi, puis le
     message part tout rédigé sur WhatsApp. */
  (function () {
    var g = C.geo || {}, body = $('gq-body'), fill = $('gq-fill');
    if (!body || !g.questions || !g.questions.length) {
      if (body) body.closest('#zone') && (body.closest('.geo__right').style.display = 'none');
      return;
    }
    var i = 0, rep = {};
    var wa = (C.entreprise && C.entreprise.whatsapp || '').replace(/[^0-9]/g, '');

    var ICONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.1-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.4 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4l-.6-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>';

    var resultat = function () {
      fill.style.width = '100%';
      var lignes = (g.message || []).map(function (l) {
        return l.replace(/\{(\w+)\}/g, function (_, k) { return rep[k] || ''; });
      });
      var texte = lignes.join('\n');
      body.innerHTML =
        '<p class="gq__rt">' + esc(g.recap_titre || 'Votre message est prêt') + '</p>' +
        '<p class="gq__rs">' + esc(g.recap_texte || '') + '</p>' +
        '<div class="gq__recap">' + esc(texte) + '</div>' +
        '<a class="gq__wa" target="_blank" rel="noopener" href="https://wa.me/' + wa +
          '?text=' + encodeURIComponent(texte) + '">' + ICONE + esc(g.bouton || 'Envoyer sur WhatsApp') + '</a>' +
        '<button class="gq__again" type="button">Recommencer</button>';
      body.querySelector('.gq__again').addEventListener('click', function () { i = 0; rep = {}; poser(); });
    };

    var poser = function () {
      if (i >= g.questions.length) return resultat();
      var q = g.questions[i];
      /* la question « région » se construit à partir du pays répondu */
      var choix = q.selon_pays ? (q.selon_pays[rep[g.questions[i - 1].cle]] || []).map(function (t) { return { texte: t }; })
                               : (q.reponses || []);
      if (!choix.length) { i++; return poser(); }
      var large = choix.length > 6;
      fill.style.width = ((i / g.questions.length) * 100) + '%';
      body.innerHTML =
        '<p class="gq__step">QUESTION ' + (i + 1) + ' / ' + g.questions.length + '</p>' +
        '<h4 class="gq__q">' + esc(q.question) + '</h4>' +
        '<div class="gq__opts' + (large ? ' gq__grid' : '') + '">' + choix.map(function (r, k) {
          return '<button class="gq__opt" type="button" data-k="' + k + '">' +
                 (large ? '' : '<span class="gq__dot"></span>') + esc(r.texte) + '</button>';
        }).join('') + '</div>' +
        (i > 0 ? '<button class="gq__back" type="button">← Retour</button>' : '');

      body.querySelectorAll('.gq__opt').forEach(function (b) {
        b.addEventListener('click', function () {
          rep[q.cle] = choix[+b.dataset.k].texte;
          i++; poser();
        });
      });
      var back = body.querySelector('.gq__back');
      if (back) back.addEventListener('click', function () { i--; poser(); });
    };
    poser();
  })();

  /* ═══ EFFETS DE SCROLL ═══════════════════════════════ */

  var nav = $('nav'), callbar = $('callbar'), hero = $('hero'), bar = $('progress');
  var bands = [];

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

  /* ── Menu mobile ─────────────────────────────────────── */
  var burger = $('burger');
  if (burger) {
    burger.addEventListener('click', function () { nav.classList.toggle('is-open'); });
    $('nav-links').addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') nav.classList.remove('is-open');
    });
  }

})();
