/* ═══════════════════════════════════════════════════════════════════
   LE SEUL FICHIER À MODIFIER.

   Remplace le texte entre les guillemets " ". C'est tout.
   Ne touche pas aux noms à gauche des deux-points (:).
   Ne supprime pas les virgules à la fin des lignes.

   Après chaque modification : sauvegarde (Ctrl+S) puis actualise
   la page dans le navigateur (F5).
   ═══════════════════════════════════════════════════════════════════ */

const CONTENU = {

  /* ─────────────────────────────────────────────────────────────────
     1. L'ENTREPRISE — apparaît partout sur le site
     ───────────────────────────────────────────────────────────────── */
  entreprise: {
    nom: "Rénov'Artisan",
    metier: "Rénovation tous corps d'état",
    telephone: "06 12 34 56 78",
    // Le numéro sans espaces ni points, pour que le bouton "Appeler" fonctionne
    telephone_lien: "0612345678",
    email: "contact@renov-artisan.fr",
    // Laisse vide "" si pas d'adresse publique
    ville: "Mont-de-Marsan",
    // Année de création — sert à calculer "X ans d'expérience"
    annee_creation: "2012",
    siret: "",
  },

  /* ─────────────────────────────────────────────────────────────────
     2. LE HERO — le premier écran, celui qui décide de tout

     Règle : la promesse doit être CONCRÈTE et LOCALE.
     ✗ "Votre partenaire de confiance pour tous vos projets"
     ✓ "Votre salle de bain refaite en 8 jours, dans les Landes"
     ───────────────────────────────────────────────────────────────── */
  hero: {
    surtitre: "Artisan depuis 2012 · Landes & Gers",
    titre: "Vos travaux faits par un artisan qui répond au téléphone",
    sous_titre: "Rénovation intérieure, maçonnerie, salle de bain. Devis gratuit sous 48h, chantier propre, délais tenus.",
    bouton: "Demander un devis gratuit",
    // Image de fond du hero — mets ta photo dans le dossier images/
    image: "images/hero.jpg",
  },

  /* ─────────────────────────────────────────────────────────────────
     3. LES 3 RASSURANCES — juste sous le hero

     Ce que le client se demande AVANT de t'appeler.
     ───────────────────────────────────────────────────────────────── */
  rassurances: [
    { titre: "Devis gratuit sous 48h", texte: "Je me déplace, je mesure, je chiffre. Sans engagement." },
    { titre: "Assurance décennale", texte: "Couverture complète sur tous les travaux réalisés." },
    { titre: "Chantier laissé propre", texte: "Évacuation des gravats et nettoyage inclus, systématiquement." },
  ],

  /* ─────────────────────────────────────────────────────────────────
     4. LES PRESTATIONS

     Entre 3 et 6. Moins il y en a, plus c'est crédible.
     Pour en retirer une : supprime la ligne entière { ... },
     ───────────────────────────────────────────────────────────────── */
  prestations: [
    { titre: "Rénovation complète", texte: "Appartement ou maison, de la démolition aux finitions. Un seul interlocuteur du début à la fin." },
    { titre: "Salle de bain", texte: "Plomberie, carrelage, faïence, meuble. Salle de bain livrée clé en main." },
    { titre: "Maçonnerie", texte: "Ouverture de mur, dalle béton, muret, terrasse. Structure et gros œuvre." },
    { titre: "Peinture & finitions", texte: "Préparation des supports, enduit, peinture intérieure et extérieure." },
    { titre: "Pose de cuisine", texte: "Montage, raccordements eau et électricité, plan de travail." },
    { titre: "Isolation", texte: "Combles, murs, planchers. Confort thermique et facture de chauffage en baisse." },
  ],

  /* ─────────────────────────────────────────────────────────────────
     5. QUI JE SUIS — la section qui fait la différence

     Écris à la première personne. Raconte un vrai truc.
     Le client choisit un artisan, pas une entreprise.
     ───────────────────────────────────────────────────────────────── */
  apropos: {
    titre: "L'artisan derrière le chantier",
    texte: "J'ai commencé sur les chantiers à 18 ans, et j'ai monté mon entreprise en 2012 après dix ans passés chez les autres. Ce qui m'a décidé : voir trop de clients laissés sans nouvelles pendant trois semaines au milieu d'un chantier. Chez moi, vous avez mon numéro de portable et je réponds. Je travaille seul ou avec deux compagnons selon la taille du chantier, ce qui veut dire que la personne qui vient faire le devis est celle qui tient la truelle.",
    // Ta photo — en tenue de travail, sur un chantier. Pas en costume.
    photo: "images/artisan.jpg",
    signature: "Prénom Nom, gérant",
  },

  /* ─────────────────────────────────────────────────────────────────
     6. LES RÉALISATIONS — la section la plus importante du site

     Des photos de VRAIS chantiers. Avant/après si possible.
     Un téléphone récent suffit largement : lumière du jour,
     photo prise droit, pièce rangée.

     Pour ajouter un chantier : copie une ligne { ... }, et colle-la.
     ───────────────────────────────────────────────────────────────── */
  realisations: [
    { titre: "Salle de bain complète", lieu: "Saint-Sever", detail: "12 jours de chantier", image: "images/chantier-1.jpg" },
    { titre: "Ouverture de mur porteur", lieu: "Mont-de-Marsan", detail: "Cuisine ouverte sur séjour", image: "images/chantier-2.jpg" },
    { titre: "Rénovation d'une maison de bourg", lieu: "Aire-sur-l'Adour", detail: "110 m² entièrement repris", image: "images/chantier-3.jpg" },
    { titre: "Terrasse béton désactivé", lieu: "Grenade-sur-l'Adour", detail: "45 m² avec évacuation des eaux", image: "images/chantier-4.jpg" },
  ],

  /* ─────────────────────────────────────────────────────────────────
     7. LES AVIS CLIENTS

     ⚠️ INTERDIT D'EN INVENTER. C'est une pratique commerciale
     trompeuse (article L121-2 du code de la consommation), et les
     clients repèrent les faux avis en trois secondes.

     Tant que tu n'as pas de vrais avis : laisse la liste vide
     comme ci-dessous, la section disparaît toute seule du site.

     Quand tu en as : avis: [ { texte: "...", auteur: "Marie L.", lieu: "Tarbes" } ],
     ───────────────────────────────────────────────────────────────── */
  avis: [],

  /* ─────────────────────────────────────────────────────────────────
     8. LA ZONE D'INTERVENTION

     Les villes où tu te déplaces. C'est ce que Google lit pour
     te faire remonter sur "maçon + nom de la ville".
     ───────────────────────────────────────────────────────────────── */
  zone: {
    titre: "Où j'interviens",
    rayon: "Dans un rayon de 40 km autour de Mont-de-Marsan",
    villes: ["Mont-de-Marsan", "Saint-Sever", "Aire-sur-l'Adour", "Grenade-sur-l'Adour", "Villeneuve-de-Marsan", "Roquefort", "Tartas", "Hagetmau"],
  },

  /* ─────────────────────────────────────────────────────────────────
     9. LE CONTACT — la dernière marche
     ───────────────────────────────────────────────────────────────── */
  contact: {
    titre: "Parlons de votre projet",
    texte: "Appelez-moi directement, ou laissez-moi un message : je rappelle dans la journée.",
    horaires: "Du lundi au vendredi, 8h — 18h",
    // Mets ici l'adresse email qui recevra les demandes.
    // Va sur formspree.io (gratuit), crée un formulaire, colle l'adresse obtenue ici.
    // Tant que c'est vide, le formulaire est masqué et seul le téléphone s'affiche.
    formulaire_url: "",
  },

};
