/* ═══════════════════════════════════════════════════════════════════
   LE SEUL FICHIER À MODIFIER.

   Remplace le texte entre les guillemets " ". C'est tout.
   Ne touche pas aux noms à gauche des deux-points (:).
   Ne supprime pas les virgules à la fin des lignes.

   Après chaque modification : sauvegarde (Ctrl+S) puis actualise
   la page dans le navigateur (F5).
   ═══════════════════════════════════════════════════════════════════ */

const CONTENU = {

  /* ─── 1. L'ENTREPRISE ─────────────────────────────────────────── */
  entreprise: {
    nom: "RÉNOV'ARTISAN",
    metier: "Rénovation tous corps d'état",
    telephone: "06 12 34 56 78",
    telephone_lien: "0612345678",          // sans espaces, pour le bouton Appeler
    email: "contact@renov-artisan.fr",
    site: "www.renov-artisan.fr",
    ville: "Mont-de-Marsan",
    adresse: "Zone artisanale, 40000 Mont-de-Marsan",
    siret: "",
  },

  /* ─── 2. LE MENU DU HAUT ──────────────────────────────────────── */
  menu: [
    { texte: "Prestations", lien: "#prestations" },
    { texte: "Réalisations", lien: "#realisations" },
    { texte: "L'entreprise", lien: "#entreprise" },
    { texte: "Équipe", lien: "#equipe" },
    { texte: "Contact", lien: "#contact" },
  ],

  /* ─── 3. LE HERO — le premier écran ───────────────────────────────
     Règle : promesse CONCRÈTE et LOCALE.
     ✗ "Votre partenaire de confiance pour tous vos projets"
     ✓ "Votre salle de bain refaite en 8 jours, dans les Landes"
     ──────────────────────────────────────────────────────────────── */
  hero: {
    surtitre: "ARTISAN DEPUIS 2012",
    titre: "Vos travaux faits par un artisan qui répond au téléphone",
    bouton: "Demander un devis gratuit",
    image: "images/ghl/ghl-05.jpg",
  },

  /* ─── 4. LES 3 PILIERS — bande sous le hero ───────────────────── */
  piliers: [
    { surtitre: "SAVOIR-FAIRE", titre: "Tous corps d'état" },
    { surtitre: "ENGAGEMENT", titre: "Délais tenus" },
    { surtitre: "GARANTIE", titre: "Décennale incluse" },
  ],

  /* ─── 5. L'ENTREPRISE — section sombre ────────────────────────── */
  entreprise_section: {
    surtitre: "L'ENTREPRISE",
    titre: "Une tradition d'exigence",
    bloc1_titre: "Qualité et finitions",
    bloc1_texte: "Chaque chantier est mené avec les mêmes exigences, qu'il s'agisse d'une salle de bain ou d'une maison entière. Matériaux sélectionnés, finitions soignées, et un résultat qui tient dans le temps.",
    bloc2_titre: "Une équipe qui s'entend",
    bloc2_texte: "Nous travaillons ensemble depuis des années. Les corps de métier se coordonnent sans temps mort, ce qui raccourcit les délais et vous évite d'avoir à gérer cinq interlocuteurs.",
    bloc3_titre: "Honnête et fiable",
    bloc3_texte: "Un devis clair, détaillé ligne par ligne, sans surprise à la fin. Si un imprévu apparaît en cours de chantier, vous êtes prévenu avant que quoi que ce soit ne soit engagé.",
    carte1_titre: "Les chantiers du moment",
    carte1_texte: "De la rénovation d'appartement à l'extension de maison, nous intervenons sur toute la région. Suivez nos chantiers en cours et nos dernières réalisations.",
    carte1_image: "images/ghl/ghl-07.jpg",
    carte2_titre: "Construisons quelque chose de bien. Quand vous voulez.",
    carte2_texte: "Que vous vouliez refaire une pièce, agrandir votre maison ou reprendre un bien entier, on commence par en parler. La visite et le devis ne coûtent rien.",
    carte2_image: "images/ghl/ghl-03.jpg",
  },


  /* ─── AVANT / APRÈS ──────────────────────────────────────────────
     LA section qui vend pour un artisan : on voit le travail.

     Mets DEUX photos du MÊME chantier, prises du MÊME endroit :
     une avant les travaux, une après. C'est ce cadrage identique
     qui rend l'effet spectaculaire.

     Tu n'as que la photo "après" ? Laisse avant: "" — le site
     affichera automatiquement la même image assombrie en guise
     d'avant, en attendant que tu prennes la vraie.
     ──────────────────────────────────────────────────────────────── */
  avantapres: {
    titre: "Voyez le chantier avant de le commander.",
    sous_titre: "À gauche la pièce telle qu'on l'a trouvée. À droite telle qu'on l'a rendue. Même angle, même pièce, 12 jours d'écart.",
    legende: "Glissez la ligne pour comparer — ou laissez faire.",
    avant: "",
    apres: "images/ghl/ghl-02.jpg",
  },

  /* ─── LE QUIZ ────────────────────────────────────────────────────
     Il qualifie le visiteur et lui donne un repère de délai,
     puis l'amène au téléphone. Ajuste les questions et surtout
     les DÉLAIS des résultats à ta façon de travailler.

     Le score s'additionne : chaque réponse ajoute ses points,
     et le résultat affiché est le dernier dont le seuil est atteint.
     Pour supprimer le quiz du site : questions: [],
     ──────────────────────────────────────────────────────────────── */
  quiz: {
    titre: "Votre projet, situé en 4 questions.",
    sous_titre: "Trente secondes pour savoir dans quelle catégorie tombe votre chantier, combien de temps il demande, et par quoi commencer.",
    badge: "VOTRE PROJET",
    bouton: "En parler maintenant",
    questions: [
      {
        question: "De quoi s'agit-il ?",
        reponses: [
          { texte: "Une seule pièce à reprendre", points: 1 },
          { texte: "Plusieurs pièces", points: 3 },
          { texte: "Toute la maison ou l'appartement", points: 5 },
          { texte: "Une extension, un agrandissement", points: 5 },
        ],
      },
      {
        question: "Quelle surface, à peu près ?",
        reponses: [
          { texte: "Moins de 20 m²", points: 1 },
          { texte: "Entre 20 et 60 m²", points: 2 },
          { texte: "Entre 60 et 120 m²", points: 4 },
          { texte: "Plus de 120 m²", points: 5 },
        ],
      },
      {
        question: "Où en êtes-vous ?",
        reponses: [
          { texte: "Je me renseigne, rien n'est décidé", points: 0 },
          { texte: "J'ai une idée du budget", points: 2 },
          { texte: "J'ai déjà un ou deux devis", points: 3 },
          { texte: "Je veux démarrer dès que possible", points: 4 },
        ],
      },
      {
        question: "Le logement sera-t-il habité pendant les travaux ?",
        reponses: [
          { texte: "Oui, on y vit", points: 2 },
          { texte: "Non, il est vide", points: 0 },
          { texte: "C'est un bien que je viens d'acheter", points: 1 },
          { texte: "Je ne sais pas encore", points: 1 },
        ],
      },
    ],
    resultats: [
      {
        seuil: 0,
        titre: "Un chantier court, à caler entre deux autres",
        texte: "Une pièce, une surface contenue : ce type de chantier se planifie vite et se termine sans traîner. Le devis se fait en une visite.",
        reperes: [
          { valeur: "5 à 10 j", label: "SUR PLACE" },
          { valeur: "48 h", label: "POUR LE DEVIS" },
          { valeur: "1", label: "INTERLOCUTEUR" },
        ],
      },
      {
        seuil: 7,
        titre: "Un chantier à coordonner sur plusieurs semaines",
        texte: "Plusieurs corps de métier vont se succéder. L'enjeu n'est pas la difficulté technique, c'est l'ordre de passage — c'est là que les chantiers prennent du retard.",
        reperes: [
          { valeur: "3 à 6 sem.", label: "DE CHANTIER" },
          { valeur: "72 h", label: "POUR LE DEVIS" },
          { valeur: "1 visite", label: "AVANT CHIFFRAGE" },
        ],
      },
      {
        seuil: 13,
        titre: "Une rénovation lourde, à préparer sérieusement",
        texte: "Ce type de projet se prépare avant de commencer : ordre des lots, délais de livraison des matériaux, et le fait de savoir si vous restez sur place. On en parle de vive voix, ça ira plus vite qu'un formulaire.",
        reperes: [
          { valeur: "2 à 4 mois", label: "DE CHANTIER" },
          { valeur: "1 sem.", label: "POUR LE CHIFFRAGE" },
          { valeur: "Visite", label: "INDISPENSABLE" },
        ],
      },
    ],
  },

  /* ─── 6. LES PRESTATIONS — grille de tuiles photos ────────────────
     Entre 4 et 7. Pour en retirer une : supprime la ligne { ... },
     ──────────────────────────────────────────────────────────────── */
  prestations_titre: "Rénovation complète, du sol au plafond",
  prestations: [
    { titre: "Rénovation complète", image: "images/ghl/ghl-02.jpg" },
    { titre: "Salle de bain", image: "images/ghl/ghl-10.jpg" },
    { titre: "Maçonnerie & extension", image: "images/ghl/ghl-07.jpg" },
    { titre: "Aménagement intérieur", image: "images/ghl/ghl-08.jpg" },
    { titre: "Charpente & toiture", image: "images/ghl/ghl-09.jpg" },
    { titre: "Peinture & finitions", image: "images/ghl/ghl-01.jpg" },
    { titre: "Toutes nos prestations", image: "images/ghl/ghl-04.jpg" },
  ],

  /* ─── 7. LES RÉALISATIONS — la section la plus importante ─────────
     Des photos de VRAIS chantiers. Un téléphone récent suffit :
     lumière du jour, photo prise droite, pièce rangée.
     ──────────────────────────────────────────────────────────────── */
  realisations_surtitre: "RÉALISATIONS",
  realisations_titre: "Chantiers terminés",
  realisations_intro: "Quelques chantiers menés ces dernières années, du studio à la maison de bourg.",
  realisations: [
    { categorie: "RÉNOVATION", titre: "Maison de bourg", lieu: "Saint-Sever", image: "images/ghl/ghl-01.jpg" },
    { categorie: "SALLE DE BAIN", titre: "Salle de bain complète", lieu: "Mont-de-Marsan", image: "images/ghl/ghl-10.jpg" },
    { categorie: "EXTENSION", titre: "Extension de 28 m²", lieu: "Aire-sur-l'Adour", image: "images/ghl/ghl-07.jpg" },
    { categorie: "INTÉRIEUR", titre: "Séjour ouvert", lieu: "Grenade-sur-l'Adour", image: "images/ghl/ghl-02.jpg" },
    { categorie: "TOITURE", titre: "Réfection de couverture", lieu: "Villeneuve-de-Marsan", image: "images/ghl/ghl-09.jpg" },
    { categorie: "NEUF", titre: "Maison contemporaine", lieu: "Hagetmau", image: "images/ghl/ghl-08.jpg" },
  ],

  /* ─── 8. QUI NOUS SOMMES ──────────────────────────────────────── */
  apropos: {
    titre: "L'artisan derrière le chantier",
    bouton: "Demander un devis",
    col1_titre: "NOTRE HISTOIRE",
    col1_texte: "J'ai commencé sur les chantiers à 18 ans et monté l'entreprise en 2012, après dix ans passés chez les autres. Ce qui m'a décidé : voir trop de clients laissés sans nouvelles pendant trois semaines au milieu d'un chantier.",
    col2_titre: "NOTRE FAÇON DE TRAVAILLER",
    col2_texte: "La personne qui vient faire le devis est celle qui tient la truelle. Vous avez mon numéro de portable et je réponds. Le chantier est balayé tous les soirs, et les gravats partent à la fin.",
    bandeau: "Votre chantier, mené du premier coup de pioche à la dernière couche de peinture.",
  },

  /* ─── 9. LES CHIFFRES — bande photo ──────────────────────────────
     ⚠️ Mets tes VRAIS chiffres. Un chiffre inventé se retourne
     contre toi le jour où un client te le demande en face.
     Pour masquer complètement cette bande : chiffres: [],
     ──────────────────────────────────────────────────────────────── */
  chiffres_surtitre: "EN QUELQUES CHIFFRES",
  chiffres_titre: "Une entreprise à taille humaine",
  chiffres_image: "images/ghl/ghl-06.jpg",
  chiffres: [
    { nombre: "180", label: "CHANTIERS" },
    { nombre: "14", label: "ANNÉES" },
    { nombre: "4", label: "COMPAGNONS" },
  ],

  /* ─── 10. L'ÉQUIPE ───────────────────────────────────────────────
     Tu travailles seul ? Mets simplement equipe: [],
     et la section disparaît du site.
     ──────────────────────────────────────────────────────────────── */
  equipe_titre: "L'équipe",
  equipe_intro: "Les compagnons qui interviennent sur vos chantiers.",
  equipe: [
    { nom: "Prénom Nom", role: "Gérant, maçon" },
    { nom: "Prénom Nom", role: "Plaquiste" },
    { nom: "Prénom Nom", role: "Carreleur" },
    { nom: "Prénom Nom", role: "Peintre" },
  ],

  /* ─── 11. LA BANDE D'EXPÉRIENCE ──────────────────────────────── */
  bande: {
    surtitre: "AVEC NOUS",
    titre: "Plus de 14 ans sur les chantiers de la région",
    bouton: "Voir nos réalisations",
    lien: "#realisations",
    image: "images/ghl/ghl-04.jpg",
  },

  /* ─── 12. LES AVIS CLIENTS ───────────────────────────────────────
     ⚠️ INTERDIT D'EN INVENTER. C'est une pratique commerciale
     trompeuse (article L121-2 du code de la consommation), et les
     clients repèrent les faux avis en trois secondes.

     Tant que la liste est vide, la section disparaît toute seule.
     Quand tu en as un vrai :
     avis: [ { texte: "...", auteur: "Marie L.", role: "Saint-Sever" } ],
     ──────────────────────────────────────────────────────────────── */
  avis_surtitre: "AVIS CLIENTS",
  avis_titre: "Ce que disent nos clients",
  avis: [],

  /* ─── 13. LA ZONE D'INTERVENTION ─────────────────────────────────
     C'est ce que Google lit pour te faire remonter sur
     "maçon + nom de la ville".
     ──────────────────────────────────────────────────────────────── */
  zone: {
    titre: "Où nous intervenons",
    rayon: "Dans un rayon de 40 km autour de Mont-de-Marsan",
    villes: ["Mont-de-Marsan", "Saint-Sever", "Aire-sur-l'Adour", "Grenade-sur-l'Adour", "Villeneuve-de-Marsan", "Roquefort", "Tartas", "Hagetmau"],
  },

  /* ─── 14. LE CONTACT ─────────────────────────────────────────── */
  contact: {
    titre: "Parlons de votre projet",
    texte: "Appelez directement, ou laissez un message : on rappelle dans la journée.",
    horaires: "Du lundi au vendredi, 8h — 18h",
    // Va sur formspree.io (gratuit), crée un formulaire, colle l'adresse ici.
    // Tant que c'est vide, seul le téléphone s'affiche.
    formulaire_url: "",
  },

};
