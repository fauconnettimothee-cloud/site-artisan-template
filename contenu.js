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
    // Numéro WhatsApp au format international, sans + ni espaces
    // (33 pour la France, 32 Belgique, 41 Suisse). Sert au bouton
    // du questionnaire : le message arrive tout rédigé.
    whatsapp: "33612345678",
    email: "contact@renov-artisan.fr",
    site: "www.renov-artisan.fr",
    ville: "Grenoble",
    adresse: "38000 Grenoble",
    siret: "",
  },

  /* ─── 2. LE MENU DU HAUT ──────────────────────────────────────── */
  menu: [
    { texte: "Avant / après", lien: "#avantapres" },
    { texte: "Ce qu'on fait", lien: "#prestations" },
    { texte: "Avis", lien: "#avis" },
    { texte: "Contact", lien: "#contact" },
  ],

  /* ─── 3. LE HERO — le premier écran ───────────────────────────────
     Règle : promesse CONCRÈTE et LOCALE.
     ✗ "Votre partenaire de confiance pour tous vos projets"
     ✓ "Votre salle de bain refaite en 8 jours, dans les Landes"
     ──────────────────────────────────────────────────────────────── */
  hero: {
    // Laisse vide pour ne rien afficher au-dessus du titre.
    surtitre: "",
    // Le H1 : court, il doit accrocher. Le détail va dans le sous-titre.
    titre: "Un artisan de confiance pour tous vos projets",
    // Le sous-titre porte la promesse complète : à qui je parle,
    // ce qui les bloque aujourd'hui, ce qu'ils obtiennent, et sans quoi.
    sous_titre: "Vous voulez rénover sans relancer dix fois, sans devis qui gonfle en cours de route et sans chantier qui traîne six mois.",
    bouton: "Demander un devis gratuit",
    // Sous les boutons, une rangée de mots cliquables (salle de bain,
    // cuisine, plomberie…) qui mènent aux sections correspondantes.
    // Elle se construit toute seule à partir des chantiers et des
    // prestations plus bas. Mets false pour ne pas l'afficher.
    raccourcis: true,
    // Deux versions de la photo d'accueil : large pour ordinateur,
    // haute pour telephone. Remplace les deux fichiers dans images/.
    // La photo d'accueil, en deux formats : large pour ordinateur,
    // haute pour téléphone.
    image: "images/hero-apres-desktop.jpg",
    image_mobile: "images/hero-apres-mobile.jpg",

    // ── Accueil animé « avant / après » (facultatif) ──
    // Renseigne ces deux lignes pour que la photo d'accueil se
    // transforme toute seule, comme les chantiers plus bas.
    // Il faut DEUX photos ENTIÈRES de la même pièce, prises du
    // MÊME endroit : une avant les travaux, une après.
    // Laisse vide ("") pour une photo d'accueil fixe.
    image_avant: "images/hero-avant-desktop.jpg",
    image_avant_mobile: "images/hero-avant-mobile.jpg",
  },

  /* ─── AVANT / APRÈS ──────────────────────────────────────────────
     LA section qui vend. On ne lit pas un artisan, on le regarde.

     Pour chaque chantier, mets DEUX photos prises du MÊME endroit :
     une avant les travaux, une après. C'est le cadrage identique
     qui rend l'effet spectaculaire.

     Pour ajouter un chantier : copie un bloc { ... }, colle-le,
     change les textes et les deux images. Pour en retirer un :
     supprime son bloc. Les numéros se recalculent tout seuls.
     ──────────────────────────────────────────────────────────────── */
  avantapres: {
    titre: "Le même endroit, avant et après nous.",
    sous_titre: "Quatre chantiers menés cette année. Glissez la ligne pour comparer — ou laissez faire.",
    chantiers: [
      {
        titre: "Salle de bain",
        lieu: "Voiron",
        duree: "12 jours",
        detail: "Dépose complète, plomberie refaite, faïence et douche à l'italienne.",
        avant: "images/chantiers/sdb-avant.jpg",
        apres: "images/chantiers/sdb-apres.jpg",
      },
      {
        titre: "Cuisine",
        lieu: "Grenoble",
        duree: "3 semaines",
        detail: "Ouverture sur le séjour, îlot central, électricité et plomberie reprises.",
        avant: "images/chantiers/cuisine-avant.jpg",
        apres: "images/chantiers/cuisine-apres.jpg",
      },
      {
        titre: "Salon",
        lieu: "Meylan",
        duree: "4 semaines",
        detail: "Plafond repris, murs redressés, parquet posé et cheminée remise en service.",
        avant: "images/chantiers/sejour-avant.jpg",
        apres: "images/chantiers/sejour-apres.jpg",
      },
      {
        titre: "Balcon",
        lieu: "Crolles",
        duree: "2 semaines",
        detail: "Étanchéité, garde-corps changé, terrasse bois et jardinières sur mesure.",
        avant: "images/chantiers/balcon-avant.jpg",
        apres: "images/chantiers/balcon-apres.jpg",
      },
    ],
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

  /* ─── QUELS TRAVAUX ? — par pièce ───────────────────────────────
     Le client ne pense pas « maçonnerie », il pense « ma salle de
     bain ». On liste donc des PIÈCES, pas des corps de métier.

     ⚠️ Chaque image doit montrer EXACTEMENT la pièce annoncée.
     Une photo de toiture sous le mot « cuisine » et le visiteur
     décroche. Vérifie chaque ligne.
     ──────────────────────────────────────────────────────────────── */
  prestations_titre: "Quels travaux peut-on faire chez vous ?",
  prestations_intro: "Une pièce entière à reprendre, ou juste un métier à faire intervenir : dans les deux cas, on peut vous aider.",
  prestations: [
    { titre: "Votre salle de bain",    image: "images/chantiers/sdb-apres.jpg" },
    { titre: "Votre cuisine",          image: "images/chantiers/cuisine-apres.jpg" },
    { titre: "Votre salon",          image: "images/chantiers/sejour-apres.jpg" },
    { titre: "Votre balcon",           image: "images/chantiers/balcon-apres.jpg" },
    { titre: "La plomberie",           image: "images/metiers/plomberie.jpg" },
    { titre: "Le carrelage",           image: "images/metiers/carrelage.jpg" },
    { titre: "La peinture",            image: "images/metiers/peinture.jpg" },
  ],

  /* ─── LES AVIS ──────────────────────────────────────────────────
     ⚠️ N'INVENTE JAMAIS UN AVIS. C'est une pratique commerciale
     trompeuse (article L121-2 du code de la consommation) et les
     clients repèrent les faux en trois secondes.

     Mets ici de VRAIS clients, avec leurs mots à eux. Demande-leur
     l'autorisation pour la photo — un visage vaut trois étoiles.
     Pas encore d'avis ? Mets avis: [] et la section disparaît.
     ──────────────────────────────────────────────────────────────── */
  avis_surtitre: "AVIS CLIENTS",
  avis_titre: "Ce que disent ceux qui nous ont fait confiance",
  avis: [
    {
      texte: "Rien à redire, ni sur l'artisan ni sur son équipe. Rigoureux du début à la fin, et surtout proactifs : quand un imprévu est tombé, ils sont arrivés avec la solution avant même que je pose la question. Efficaces, et le chantier a avancé sans que j'aie à courir derrière qui que ce soit.",
      auteur: "Sofiane",
      role: "Grenoble",
      photo: "images/avis/soso.jpg",
    },
  ],

  /* ─── OÙ NOUS INTERVENONS ───────────────────────────────────────
     La carte est générée automatiquement à partir des coordonnées
     ci-dessous. Pour trouver les tiennes : va sur openstreetmap.org,
     clic droit sur ta ville → « Afficher l'adresse » — la latitude et
     la longitude s'affichent dans l'URL.
     ──────────────────────────────────────────────────────────────── */
  zone: {
    titre: "Où nous intervenons",
    surtitre: "ZONE D'INTERVENTION",
    texte: "Nous sommes basés à Grenoble, et nous nous déplaçons partout en France, en Suisse et en Belgique.",
    // Le point sur la carte = là où tu es basé
    latitude: 45.1885,
    longitude: 5.7245,
    pays: ["France", "Belgique", "Suisse"],
  },

  /* ─── LE QUESTIONNAIRE WHATSAPP ──────────────────────────────────
     Le visiteur répond à 4 questions, et le bouton final ouvre
     WhatsApp avec un message DÉJÀ RÉDIGÉ qui récapitule tout.
     L'artisan reçoit un projet qualifié, pas un « bonjour ».

     La 2ᵉ question s'adapte au pays choisi à la 1ʳᵉ.
     Pour désactiver ce questionnaire : questions: [],
     ──────────────────────────────────────────────────────────────── */
  geo: {
    titre: "Dites-nous où et quoi, on vous répond aujourd'hui.",
    sous_titre: "Quatre questions, trente secondes. Vous partez avec un message déjà rédigé — vous n'avez plus qu'à l'envoyer.",
    bouton: "Envoyer sur WhatsApp",
    // Ce que le visiteur voit avant de cliquer sur le bouton final
    recap_titre: "Votre message est prêt",
    recap_texte: "Vérifiez, puis envoyez. On répond dans la journée.",
    questions: [
      {
        cle: "pays",
        question: "Où se situe votre projet ?",
        reponses: [
          { texte: "France" },
          { texte: "Belgique" },
          { texte: "Suisse" },
        ],
      },
      {
        cle: "region",
        question: "Dans quelle région ?",
        // Les choix dépendent du pays répondu juste avant
        selon_pays: {
          "France": ["Auvergne-Rhône-Alpes", "Provence-Alpes-Côte d'Azur", "Occitanie",
                        "Nouvelle-Aquitaine", "Île-de-France", "Grand Est",
                        "Bourgogne-Franche-Comté", "Hauts-de-France", "Normandie",
                        "Bretagne", "Pays de la Loire", "Centre-Val de Loire", "Corse"],
          "Belgique": ["Bruxelles-Capitale", "Wallonie", "Flandre"],
          "Suisse": ["Genève", "Vaud", "Valais", "Fribourg", "Neuchâtel",
                        "Berne", "Zurich", "Tessin", "Autre canton"],
        },
      },
      {
        cle: "projet",
        question: "De quel chantier s'agit-il ?",
        reponses: [
          { texte: "Une salle de bain" },
          { texte: "Une cuisine" },
          { texte: "Une pièce à vivre" },
          { texte: "Une rénovation complète" },
        ],
      },
      {
        cle: "delai",
        question: "Pour quand ?",
        reponses: [
          { texte: "Dès que possible" },
          { texte: "Dans les 3 mois" },
          { texte: "Cette année" },
          { texte: "Je me renseigne" },
        ],
      },
    ],
    // Le message envoyé. Les {mots entre accolades} sont remplacés
    // par les réponses. Ne change pas les accolades, seulement le texte.
    // Le message envoyé, ligne par ligne. Les {mots entre accolades}
    // sont remplacés par les réponses. Une ligne vide = un saut de ligne.
    message: [
      "Bonjour, je vous contacte depuis votre site.",
      "",
      "Projet : {projet}",
      "Où : {region}, {pays}",
      "Démarrage : {delai}",
      "",
      "Pouvez-vous me dire si vous intervenez chez moi, et sous quel délai ?",
    ],
  },

  /* ─── 14. LE CONTACT ─────────────────────────────────────────── */
  contact: {
    surtitre: "PARLONS-EN",
    titre: "Un appel, et vous saurez où vous en êtes.",
    texte: "Dites-nous ce que vous voulez faire. On vous dit franchement si c'est pour nous, sous quel délai, et ce que ça implique. Sans engagement.",
    horaires: "Du lundi au vendredi, 8h — 18h",
    // Va sur formspree.io (gratuit), crée un formulaire, colle l'adresse ici.
    // Tant que c'est vide, seul le téléphone s'affiche.
    formulaire_url: "",
  },

};
