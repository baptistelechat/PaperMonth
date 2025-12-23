export const TIP_CATEGORIES = [
  "Productivité",
  "Bien-être",
  "Focus",
  "Numérique",
  "Créativité",
] as const;

export type TipCategory = (typeof TIP_CATEGORIES)[number];

export interface Tip {
  content: string;
  category: TipCategory;
  isCustom?: boolean;
}

export const TIPS: Tip[] = [
  // --- PRODUCTIVITÉ ---
  {
    content:
      "La règle des 2 minutes : si ça prend moins de 2 minutes, faites-le tout de suite.",
    category: "Productivité",
  },
  {
    content: "Fixez-vous 3 objectifs prioritaires par jour (The Rule of 3).",
    category: "Productivité",
  },
  {
    content: "Commencez par la tâche la plus difficile (Eat that frog).",
    category: "Productivité",
  },
  {
    content: "Planifiez votre journée la veille pour mieux démarrer.",
    category: "Productivité",
  },
  {
    content: "Revoyez vos objectifs à long terme chaque semaine.",
    category: "Productivité",
  },
  {
    content:
      "Automatisez les tâches répétitives avec des scripts ou des outils.",
    category: "Productivité",
  },
  {
    content:
      "Déléguez ce que vous ne pouvez pas faire ou ce qui vous prend trop de temps.",
    category: "Productivité",
  },
  {
    content: "Définissez une heure stricte de fin de journée de travail.",
    category: "Productivité",
  },
  {
    content: "Utilisez la matrice d'Eisenhower pour prioriser vos tâches.",
    category: "Productivité",
  },
  {
    content: "Regroupez les tâches similaires (batching) pour gagner du temps.",
    category: "Productivité",
  },
  {
    content: "Apprenez les raccourcis clavier de vos logiciels principaux.",
    category: "Productivité",
  },
  {
    content: "Utilisez un gestionnaire de tâches (Todoist, Things, etc.).",
    category: "Productivité",
  },
  {
    content:
      "Pratiquez le 'Time Boxing' pour allouer du temps fixe à chaque tâche.",
    category: "Productivité",
  },
  {
    content: "Ne confondez pas être occupé et être productif.",
    category: "Productivité",
  },
  {
    content: "Faites une revue hebdomadaire (Weekly Review) chaque vendredi.",
    category: "Productivité",
  },
  {
    content: "Limitez la durée de vos réunions à 30 minutes par défaut.",
    category: "Productivité",
  },
  {
    content: "Refusez les réunions sans ordre du jour clair.",
    category: "Productivité",
  },
  {
    content: "Capturez toutes vos idées immédiatement dans une 'Inbox'.",
    category: "Productivité",
  },
  {
    content: "Traitez vos emails par lots, 2 à 3 fois par jour maximum.",
    category: "Productivité",
  },
  {
    content: "Désabonnez-vous des newsletters que vous ne lisez jamais.",
    category: "Productivité",
  },
  {
    content: "Utilisez des modèles (templates) pour vos emails récurrents.",
    category: "Productivité",
  },
  {
    content: "Décomposez les gros projets en petites tâches actionnables.",
    category: "Productivité",
  },
  {
    content:
      "Appliquez la loi de Parkinson : le travail s'étale pour occuper le temps disponible.",
    category: "Productivité",
  },
  {
    content: "Faites des pauses régulières pour maintenir votre efficacité.",
    category: "Productivité",
  },
  {
    content: "Identifiez votre pic d'énergie dans la journée et protégez-le.",
    category: "Productivité",
  },
  {
    content: "Dites 'non' aux opportunités qui ne servent pas vos objectifs.",
    category: "Productivité",
  },
  {
    content:
      "Gardez votre bureau propre, mais ne passez pas votre temps à ranger.",
    category: "Productivité",
  },
  {
    content: "Utilisez la commande vocale pour dicter des notes rapidement.",
    category: "Productivité",
  },
  {
    content: "Adoptez le 'Zero Inbox' pour garder l'esprit clair.",
    category: "Productivité",
  },
  {
    content: "Faites une liste de choses à ne PAS faire (Not-to-do list).",
    category: "Productivité",
  },
  {
    content: "Préparez vos vêtements et votre sac la veille.",
    category: "Productivité",
  },
  {
    content:
      "Utilisez un second écran pour augmenter votre surface de travail.",
    category: "Productivité",
  },
  {
    content: "Installez un gestionnaire de presse-papiers.",
    category: "Productivité",
  },
  {
    content: "Utilisez des alias de texte pour les phrases fréquentes.",
    category: "Productivité",
  },
  {
    content: "Faites le point sur vos progrès à mi-journée.",
    category: "Productivité",
  },
  {
    content: "Éliminez une tâche inutile de votre liste chaque jour.",
    category: "Productivité",
  },
  {
    content:
      "Utilisez la méthode des '5 pourquoi' pour résoudre les problèmes à la racine.",
    category: "Productivité",
  },
  {
    content: "Standardisez vos processus de travail.",
    category: "Productivité",
  },
  {
    content:
      "Mesurez le temps passé sur vos tâches pour mieux estimer le futur.",
    category: "Productivité",
  },
  {
    content: "Travaillez debout une partie de la journée si possible.",
    category: "Productivité",
  },
  {
    content: "Utilisez la recherche rapide (Spotlight, Raycast, PowerToys).",
    category: "Productivité",
  },
  {
    content: "Nettoyez votre dossier Téléchargements chaque semaine.",
    category: "Productivité",
  },
  {
    content: "Mettez votre téléphone en mode 'Ne pas déranger' par défaut.",
    category: "Productivité",
  },
  {
    content: "Utilisez des écouteurs à réduction de bruit.",
    category: "Productivité",
  },
  {
    content: "Faites une sauvegarde automatique de vos données.",
    category: "Productivité",
  },
  {
    content:
      "Définissez des objectifs SMART (Spécifique, Mesurable, Atteignable, Réaliste, Temporel).",
    category: "Productivité",
  },
  {
    content: "Célébrez vos petites victoires pour rester motivé.",
    category: "Productivité",
  },
  {
    content: "Pardonnez-vous vos jours improductifs, demain est un autre jour.",
    category: "Productivité",
  },
  {
    content: "Lisez 10 pages d'un livre de développement pro par jour.",
    category: "Productivité",
  },
  {
    content: "Écoutez des podcasts éducatifs pendant vos trajets.",
    category: "Productivité",
  },
  {
    content: "Investissez dans un bon fauteuil de bureau.",
    category: "Productivité",
  },
  {
    content: "Ayez toujours un carnet et un stylo sur vous.",
    category: "Productivité",
  },
  {
    content: "Utilisez un minuteur physique pour vos sessions de travail.",
    category: "Productivité",
  },
  {
    content:
      "Faites une 'Brain Dump' (vidage de cerveau) quand vous êtes stressé.",
    category: "Productivité",
  },
  {
    content: "Clarifiez vos valeurs pour prendre des décisions plus vite.",
    category: "Productivité",
  },
  {
    content:
      "Évitez le perfectionnisme, visez le 'fait' plutôt que le 'parfait'.",
    category: "Productivité",
  },
  {
    content:
      "Utilisez la loi de Pareto : 20% des efforts donnent 80% des résultats.",
    category: "Productivité",
  },
  {
    content: "Planifiez vos vacances bien à l'avance.",
    category: "Productivité",
  },
  {
    content: "Déléguez les tâches ménagères si vous le pouvez.",
    category: "Productivité",
  },
  {
    content: "Cuisinez en grande quantité le dimanche (Meal Prep).",
    category: "Productivité",
  },
  {
    content:
      "Utilisez des listes de contrôle (Checklists) pour éviter les erreurs.",
    category: "Productivité",
  },
  {
    content: "Révisez vos abonnements mensuels et annulez l'inutile.",
    category: "Productivité",
  },
  {
    content: "Mettez en place des prélèvements automatiques pour vos factures.",
    category: "Productivité",
  },
  {
    content: "Utilisez un gestionnaire de mots de passe.",
    category: "Productivité",
  },
  {
    content: "Faites des réunions debout pour qu'elles soient plus courtes.",
    category: "Productivité",
  },
  {
    content: "Envoyez l'ordre du jour avant toute réunion.",
    category: "Productivité",
  },
  {
    content: "Prenez des notes pendant les réunions et partagez-les.",
    category: "Productivité",
  },
  {
    content: "Définissez des actions claires à la fin de chaque discussion.",
    category: "Productivité",
  },
  {
    content: "Ne répondez pas au téléphone si vous êtes concentré.",
    category: "Productivité",
  },
  {
    content:
      "Utilisez la réponse automatique d'email quand vous êtes très occupé.",
    category: "Productivité",
  },
  {
    content: "Fermez les onglets de navigateur inutilisés.",
    category: "Productivité",
  },
  {
    content: "Utilisez des favoris pour vos sites les plus visités.",
    category: "Productivité",
  },
  {
    content: "Apprenez à taper au clavier sans regarder (dactylographie).",
    category: "Productivité",
  },
  {
    content: "Mettez à jour vos logiciels automatiquement la nuit.",
    category: "Productivité",
  },
  {
    content: "Redémarrez votre ordinateur régulièrement.",
    category: "Productivité",
  },
  {
    content: "Rangez vos câbles pour un esprit plus clair.",
    category: "Productivité",
  },
  {
    content: "Ayez un système de classement de fichiers simple.",
    category: "Productivité",
  },
  {
    content: "Nommez vos fichiers de manière cohérente (AAAA-MM-JJ_Nom).",
    category: "Productivité",
  },
  {
    content: "Scannez vos documents importants et jetez le papier.",
    category: "Productivité",
  },
  {
    content: "Utilisez la recherche textuelle dans vos images (OCR).",
    category: "Productivité",
  },
  {
    content: "Faites du tri dans vos photos chaque mois.",
    category: "Productivité",
  },
  {
    content: "Limitez votre consommation d'actualités.",
    category: "Productivité",
  },
  {
    content: "Choisissez vos batailles, ne vous dispersez pas.",
    category: "Productivité",
  },
  {
    content: "Soyez ponctuel, cela montre du respect pour le temps des autres.",
    category: "Productivité",
  },
  {
    content: "Préparez des réponses types pour les questions fréquentes.",
    category: "Productivité",
  },
  {
    content:
      "Utilisez des outils de collaboration en temps réel (Miro, Notion).",
    category: "Productivité",
  },
  {
    content: "Formez-vous continuellement sur vos outils de travail.",
    category: "Productivité",
  },
  {
    content: "Demandez du feedback régulièrement pour vous améliorer.",
    category: "Productivité",
  },
  { content: "Sachez quand arrêter de travailler.", category: "Productivité" },
  {
    content:
      "La productivité n'est pas une fin en soi, c'est un moyen de vivre mieux.",
    category: "Productivité",
  },
  // Nouveaux ajouts Productivité
  {
    content: "Faites un bilan mensuel de vos accomplissements.",
    category: "Productivité",
  },
  {
    content:
      "Testez de nouveaux outils, mais gardez seulement ceux qui vous font gagner du temps.",
    category: "Productivité",
  },
  {
    content:
      "Créez un manuel de 'Comment travailler avec moi' pour vos collègues.",
    category: "Productivité",
  },
  {
    content:
      "Utilisez la méthode 'Ivy Lee' : 6 tâches importantes pour le lendemain.",
    category: "Productivité",
  },
  {
    content:
      "Ne commencez pas une nouvelle tâche avant d'avoir fini la précédente.",
    category: "Productivité",
  },
  {
    content: "Utilisez des codes couleurs dans votre agenda.",
    category: "Productivité",
  },
  {
    content: "Regroupez vos appels téléphoniques sur une plage horaire dédiée.",
    category: "Productivité",
  },
  {
    content: "Prenez 5 minutes pour ranger votre bureau avant de partir.",
    category: "Productivité",
  },
  {
    content:
      "Ayez une bouteille d'eau sur votre bureau pour éviter de vous lever sans cesse.",
    category: "Productivité",
  },
  {
    content: "Mettez les applications distrayantes dans des dossiers cachés.",
    category: "Productivité",
  },
  {
    content: "Utilisez un tracker d'habitudes pour vos nouvelles routines.",
    category: "Productivité",
  },
  {
    content:
      "Ne planifiez que 60% de votre temps, laissez de la place aux imprévus.",
    category: "Productivité",
  },
  {
    content:
      "Apprenez à déléguer non seulement l'exécution mais aussi la responsabilité.",
    category: "Productivité",
  },
  {
    content:
      "Faites des points d'étape courts plutôt que des longues réunions de fin de projet.",
    category: "Productivité",
  },
  {
    content:
      "Utilisez la méthode KANBAN (À faire, En cours, Fait) pour visualiser le travail.",
    category: "Productivité",
  },
  {
    content:
      "Définissez des objectifs annuels, trimestriels, mensuels et hebdomadaires.",
    category: "Productivité",
  },
  {
    content: "Trouvez un 'Accountability Partner' pour vous tenir responsable.",
    category: "Productivité",
  },
  {
    content:
      "Éliminez les frictions : gardez vos outils de travail à portée de main.",
    category: "Productivité",
  },
  {
    content: "Faites une chose qui vous fait peur chaque jour.",
    category: "Productivité",
  },
  {
    content: "Ne surestimez pas ce que vous pouvez faire en un jour.",
    category: "Productivité",
  },

  // --- FOCUS ---
  {
    content:
      "Utilisez la technique Pomodoro : 25 min de travail, 5 min de pause.",
    category: "Focus",
  },
  {
    content:
      "Faites une chose à la fois (le multitâche réduit le QI temporairement).",
    category: "Focus",
  },
  {
    content:
      "Désactivez toutes les notifications (PC et Smartphone) pendant le Deep Work.",
    category: "Focus",
  },
  {
    content: "Écoutez de la musique instrumentale, du Lo-Fi ou du bruit blanc.",
    category: "Focus",
  },
  {
    content:
      "Bloquez des créneaux de 'Deep Work' inamovibles dans votre agenda.",
    category: "Focus",
  },
  {
    content: "Apprenez à dire non pour protéger votre attention.",
    category: "Focus",
  },
  {
    content: "Ne consultez pas vos emails ou réseaux sociaux dès le réveil.",
    category: "Focus",
  },
  {
    content:
      "Rangez votre espace de travail à la fin de chaque journée (Clear to Neutral).",
    category: "Focus",
  },
  {
    content:
      "Mettez votre téléphone dans une autre pièce quand vous devez vous concentrer.",
    category: "Focus",
  },
  {
    content:
      "Utilisez des applications comme Forest ou Freedom pour bloquer les distractions.",
    category: "Focus",
  },
  {
    content:
      "Pratiquez la méditation de pleine conscience pour muscler votre attention.",
    category: "Focus",
  },
  {
    content: "Définissez une intention claire avant chaque session de travail.",
    category: "Focus",
  },
  {
    content:
      "Prenez des pauses sans écrans pour vraiment reposer votre cerveau.",
    category: "Focus",
  },
  {
    content:
      "Regardez au loin (20 mètres) toutes les 20 minutes pendant 20 secondes (20-20-20).",
    category: "Focus",
  },
  {
    content: "La volonté est une ressource limitée, utilisez-la le matin.",
    category: "Focus",
  },
  {
    content:
      "Évitez les repas trop lourds le midi pour éviter le coup de barre.",
    category: "Focus",
  },
  {
    content:
      "La caféine est un outil, pas une habitude : utilisez-la stratégiquement.",
    category: "Focus",
  },
  {
    content: "Faites une sieste de 20 minutes (Power Nap) si besoin.",
    category: "Focus",
  },
  {
    content: "Travaillez dans un environnement frais et bien aéré.",
    category: "Focus",
  },
  {
    content: "La lumière naturelle est le meilleur allié de votre vigilance.",
    category: "Focus",
  },
  {
    content:
      "Identifiez vos déclencheurs de distraction internes (ennui, faim, stress).",
    category: "Focus",
  },
  {
    content: "Notez les distractions sur un papier pour les traiter plus tard.",
    category: "Focus",
  },
  {
    content: "Utilisez un casque à réduction de bruit pour créer une bulle.",
    category: "Focus",
  },
  {
    content:
      "Changez d'environnement pour des tâches différentes (ex: lecture au canapé).",
    category: "Focus",
  },
  {
    content: "La constance bat l'intensité : soyez régulier dans vos efforts.",
    category: "Focus",
  },
  {
    content:
      "Entrez dans l'état de 'Flow' en ajustant la difficulté à vos compétences.",
    category: "Focus",
  },
  {
    content:
      "Supprimez les raccourcis vers les réseaux sociaux de votre navigateur.",
    category: "Focus",
  },
  {
    content:
      "Passez votre téléphone en noir et blanc pour le rendre moins attrayant.",
    category: "Focus",
  },
  {
    content:
      "Définissez des plages horaires spécifiques pour répondre aux messages.",
    category: "Focus",
  },
  {
    content: "Informez vos collègues de vos périodes de non-disponibilité.",
    category: "Focus",
  },
  {
    content: "Utilisez un statut 'Ne pas déranger' sur Slack/Teams.",
    category: "Focus",
  },
  {
    content: "Fermez votre porte si vous avez un bureau fermé.",
    category: "Focus",
  },
  {
    content: "Travaillez hors ligne si la tâche le permet.",
    category: "Focus",
  },
  {
    content: "Utilisez le mode plein écran pour vos applications de travail.",
    category: "Focus",
  },
  { content: "Masquez le dock ou la barre des tâches.", category: "Focus" },
  {
    content:
      "Nettoyez votre bureau physique : un espace clair pour un esprit clair.",
    category: "Focus",
  },
  { content: "Ayez toujours de l'eau à portée de main.", category: "Focus" },
  {
    content: "La déshydratation légère diminue la concentration.",
    category: "Focus",
  },
  {
    content:
      "Faites quelques respirations profondes avant de commencer une tâche complexe.",
    category: "Focus",
  },
  {
    content: "Visualisez le résultat final avant de commencer.",
    category: "Focus",
  },
  {
    content: "Commencez petit : dites-vous 'je m'y mets juste pour 5 minutes'.",
    category: "Focus",
  },
  { content: "Réduisez le 'bruit visuel' autour de vous.", category: "Focus" },
  {
    content:
      "Utilisez des lunettes anti-lumière bleue si vous travaillez tard.",
    category: "Focus",
  },
  {
    content:
      "F.lux ou Night Shift sont indispensables pour vos écrans le soir.",
    category: "Focus",
  },
  {
    content: "Le sommeil est le pilier numéro 1 de la concentration.",
    category: "Focus",
  },
  {
    content: "Maintenez une routine de coucher et de lever régulière.",
    category: "Focus",
  },
  { content: "Évitez les écrans 1h avant de dormir.", category: "Focus" },
  {
    content: "Faites du sport le matin pour booster votre vigilance.",
    category: "Focus",
  },
  {
    content: "Le froid (douche froide) peut réveiller votre système nerveux.",
    category: "Focus",
  },
  { content: "Alternez position assise et debout.", category: "Focus" },
  {
    content: "Mâcher du chewing-gum peut parfois aider la concentration.",
    category: "Focus",
  },
  {
    content:
      "Utilisez des huiles essentielles (menthe poivrée, citron) pour l'éveil.",
    category: "Focus",
  },
  {
    content: "Écoutez des battements binauraux (binaural beats) pour le focus.",
    category: "Focus",
  },
  {
    content:
      "Ne laissez pas des tâches inachevées drainer votre attention (Zeigarnik effect).",
    category: "Focus",
  },
  {
    content: "Notez tout pour libérer votre mémoire de travail.",
    category: "Focus",
  },
  { content: "Simplifiez vos outils : less is more.", category: "Focus" },
  { content: "Relisez vos objectifs chaque matin.", category: "Focus" },
  {
    content: "Demandez-vous : 'Est-ce la meilleure utilisation de mon temps ?'",
    category: "Focus",
  },
  { content: "Soyez impitoyable avec les interruptions.", category: "Focus" },
  {
    content: "Le focus est un muscle, entraînez-le progressivement.",
    category: "Focus",
  },
  {
    content: "Acceptez l'ennui, c'est souvent le précurseur de la créativité.",
    category: "Focus",
  },
  {
    content: "Ne cherchez pas la distraction dès que ça devient difficile.",
    category: "Focus",
  },
  {
    content: "Observez vos pensées sans les juger quand vous divaguez.",
    category: "Focus",
  },
  {
    content: "Revenez doucement à la tâche quand vous vous égarez.",
    category: "Focus",
  },
  {
    content: "Faites des exercices de cohérence cardiaque.",
    category: "Focus",
  },
  { content: "Marchez pour réfléchir.", category: "Focus" },
  {
    content: "Le focus profond est rare et précieux, protégez-le.",
    category: "Focus",
  },
  {
    content: "Soyez présent à ce que vous faites, ici et maintenant.",
    category: "Focus",
  },
  {
    content: "La qualité de votre attention détermine la qualité de votre vie.",
    category: "Focus",
  },
  // Nouveaux ajouts Focus
  { content: "Utilisez un fond d'écran minimaliste.", category: "Focus" },
  {
    content:
      "Cachez votre téléphone, même éteint, sa présence réduit la concentration.",
    category: "Focus",
  },
  {
    content: "Travaillez par blocs de 90 minutes (rythmes ultradiens).",
    category: "Focus",
  },
  {
    content: "Identifiez votre chronotype (Lion, Ours, Loup, Dauphin).",
    category: "Focus",
  },
  {
    content:
      "Faites les tâches créatives quand vous êtes un peu fatigué (paradoxal mais vrai).",
    category: "Focus",
  },
  {
    content:
      "Faites les tâches analytiques quand vous êtes au pic de votre forme.",
    category: "Focus",
  },
  {
    content: "Ne faites pas de réunions le matin si possible.",
    category: "Focus",
  },
  {
    content: "Utilisez un sablier pour visualiser le temps qui passe.",
    category: "Focus",
  },
  {
    content: "Évitez le sucre qui provoque des crashs d'énergie.",
    category: "Focus",
  },
  {
    content:
      "La lecture sur papier favorise une meilleure concentration que sur écran.",
    category: "Focus",
  },
  {
    content: "Prenez des notes manuscrites pour mieux mémoriser.",
    category: "Focus",
  },
  {
    content: "Variez l'intensité de votre travail au fil de la semaine.",
    category: "Focus",
  },
  {
    content: "Faites une liste de 'Distractions autorisées' pour vos pauses.",
    category: "Focus",
  },
  {
    content:
      "Utilisez la commande 'Ne pas déranger' de votre téléphone avec un planning.",
    category: "Focus",
  },
  {
    content: "Portez des vêtements confortables pour travailler.",
    category: "Focus",
  },
  {
    content: "Assurez-vous d'avoir un bon éclairage (pas de reflets).",
    category: "Focus",
  },
  {
    content:
      "Testez le travail en bibliothèque ou café pour l'effet de groupe.",
    category: "Focus",
  },
  {
    content:
      "Utilisez la technique des '5 secondes' de Mel Robbins pour vous y mettre.",
    category: "Focus",
  },
  {
    content: "Ne vérifiez vos stats (vues, likes) qu'une fois par semaine.",
    category: "Focus",
  },
  {
    content: "Concentrez-vous sur le processus, pas sur le résultat immédiat.",
    category: "Focus",
  },

  // --- BIEN-ÊTRE ---
  {
    content: "Prenez des pauses régulières pour maintenir votre énergie.",
    category: "Bien-être",
  },
  {
    content: "Hydratez-vous : visez 2L d'eau par jour.",
    category: "Bien-être",
  },
  {
    content: "Dormez 7 à 8h par nuit, c'est non négociable.",
    category: "Bien-être",
  },
  {
    content: "Pratiquez la gratitude : notez 3 choses positives chaque soir.",
    category: "Bien-être",
  },
  {
    content: "Le stoïcisme : ne vous inquiétez que de ce qui dépend de vous.",
    category: "Bien-être",
  },
  { content: "Marchez au moins 30 minutes par jour.", category: "Bien-être" },
  {
    content: "Étirez-vous toutes les heures si vous travaillez assis.",
    category: "Bien-être",
  },
  {
    content: "Ajustez votre écran à la hauteur de vos yeux.",
    category: "Bien-être",
  },
  {
    content: "Investissez dans une chaise ergonomique.",
    category: "Bien-être",
  },
  {
    content: "Respirez par le nez, profondément et calmement.",
    category: "Bien-être",
  },
  {
    content: "Prenez le soleil le matin pour caler votre rythme circadien.",
    category: "Bien-être",
  },
  {
    content: "Mangez des aliments non transformés le plus souvent possible.",
    category: "Bien-être",
  },
  { content: "Réduisez le sucre, surtout le matin.", category: "Bien-être" },
  { content: "Prenez des repas loin de votre écran.", category: "Bien-être" },
  {
    content: "Faites des réunions en marchant (Walking meetings).",
    category: "Bien-être",
  },
  {
    content: "Appelez un proche juste pour prendre des nouvelles.",
    category: "Bien-être",
  },
  {
    content: "Souriez, même si c'est forcé, cela réduit le stress.",
    category: "Bien-être",
  },
  {
    content: "Pratiquez la cohérence cardiaque 3 fois par jour.",
    category: "Bien-être",
  },
  { content: "Faites une 'Digital Detox' le week-end.", category: "Bien-être" },
  { content: "Lisez de la fiction pour vous évader.", category: "Bien-être" },
  {
    content: "Passez du temps dans la nature (bains de forêt).",
    category: "Bien-être",
  },
  {
    content: "Ayez des plantes vertes dans votre espace de travail.",
    category: "Bien-être",
  },
  {
    content: "Écoutez votre corps : reposez-vous quand vous êtes malade.",
    category: "Bien-être",
  },
  {
    content: "Ne culpabilisez pas de ne rien faire (Niksen).",
    category: "Bien-être",
  },
  {
    content: "Pratiquez un hobby manuel pour reposer votre cerveau.",
    category: "Bien-être",
  },
  { content: "Riez tous les jours.", category: "Bien-être" },
  { content: "Faites du bénévolat ou aidez quelqu'un.", category: "Bien-être" },
  {
    content: "Soyez bienveillant envers vous-même (autocompassion).",
    category: "Bien-être",
  },
  {
    content: "Ne vous comparez pas aux autres sur les réseaux sociaux.",
    category: "Bien-être",
  },
  {
    content: "Tenez un journal pour vider vos pensées.",
    category: "Bien-être",
  },
  {
    content: "Apprenez à reconnaître vos émotions sans les juger.",
    category: "Bien-être",
  },
  {
    content: "Faites le lit chaque matin, c'est une première victoire.",
    category: "Bien-être",
  },
  { content: "Aérez votre chambre avant de dormir.", category: "Bien-être" },
  {
    content: "Prenez une douche chaude le soir pour vous détendre.",
    category: "Bien-être",
  },
  { content: "Massez-vous les mains et la nuque.", category: "Bien-être" },
  {
    content: "Écoutez de la musique qui vous rend joyeux.",
    category: "Bien-être",
  },
  { content: "Dansez sur votre chanson préférée.", category: "Bien-être" },
  { content: "Câlinez votre animal de compagnie.", category: "Bien-être" },
  { content: "Regardez les étoiles ou les nuages.", category: "Bien-être" },
  {
    content:
      "Apprenez à respirer avec le ventre (respiration diaphragmatique).",
    category: "Bien-être",
  },
  { content: "Limitez la caféine après 14h.", category: "Bien-être" },
  {
    content: "Évitez l'alcool avant de dormir, cela perturbe le sommeil.",
    category: "Bien-être",
  },
  {
    content: "Mangez des noix ou des fruits pour le goûter.",
    category: "Bien-être",
  },
  { content: "Prenez des vacances régulièrement.", category: "Bien-être" },
  {
    content: "Déconnectez totalement du travail pendant vos congés.",
    category: "Bien-être",
  },
  {
    content: "Ayez une activité physique intense 2 à 3 fois par semaine.",
    category: "Bien-être",
  },
  { content: "Faites du yoga ou du stretching.", category: "Bien-être" },
  {
    content: "Apprenez à dire 'ça suffit' pour aujourd'hui.",
    category: "Bien-être",
  },
  {
    content: "Célébrez les anniversaires et les fêtes.",
    category: "Bien-être",
  },
  { content: "Entourez-vous de personnes positives.", category: "Bien-être" },
  { content: "Éloignez-vous des relations toxiques.", category: "Bien-être" },
  { content: "Soyez curieux des autres.", category: "Bien-être" },
  { content: "Pratiquez l'écoute active.", category: "Bien-être" },
  { content: "Faites un compliment sincère par jour.", category: "Bien-être" },
  { content: "Remerciez les gens qui vous aident.", category: "Bien-être" },
  { content: "Gardez une posture ouverte et droite.", category: "Bien-être" },
  {
    content: "Prenez soin de votre apparence pour vous sentir bien.",
    category: "Bien-être",
  },
  { content: "Faites des bilans de santé réguliers.", category: "Bien-être" },
  { content: "Ne négligez pas vos dents et vos yeux.", category: "Bien-être" },
  {
    content: "Apprenez quelque chose de nouveau juste pour le plaisir.",
    category: "Bien-être",
  },
  { content: "Voyagez ou explorez votre propre ville.", category: "Bien-être" },
  { content: "Cuisinez un nouveau plat.", category: "Bien-être" },
  {
    content: "Le bonheur est une habitude, cultivez-la.",
    category: "Bien-être",
  },
  { content: "Acceptez l'imperfection.", category: "Bien-être" },
  { content: "Vivez le moment présent (Carpe Diem).", category: "Bien-être" },
  { content: "Votre santé est votre plus grand atout.", category: "Bien-être" },
  { content: "Soyez votre propre meilleur ami.", category: "Bien-être" },
  // Nouveaux ajouts Bien-être
  { content: "Investissez dans un matelas de qualité.", category: "Bien-être" },
  {
    content: "Utilisez un humidificateur d'air en hiver.",
    category: "Bien-être",
  },
  {
    content: "Faites des exercices pour les yeux (yoga des yeux).",
    category: "Bien-être",
  },
  {
    content: "Prenez des compléments de vitamine D si nécessaire.",
    category: "Bien-être",
  },
  {
    content: "Écoutez des bruits de nature pour vous relaxer.",
    category: "Bien-être",
  },
  {
    content: "Faites un massage des pieds avec une balle de tennis.",
    category: "Bien-être",
  },
  {
    content: "Prenez un bain de pieds chaud après une longue journée.",
    category: "Bien-être",
  },
  {
    content: "Portez des vêtements dans lesquels vous vous sentez confiant.",
    category: "Bien-être",
  },
  {
    content: "Rangez votre maison pour apaiser votre esprit.",
    category: "Bien-être",
  },
  { content: "Donnez ce que vous n'utilisez plus.", category: "Bien-être" },
  {
    content: "Pardonnez aux autres pour vous libérer vous-même.",
    category: "Bien-être",
  },
  {
    content: "Pratiquez l'autodérision, ne vous prenez pas trop au sérieux.",
    category: "Bien-être",
  },
  { content: "Faites une liste de vos forces.", category: "Bien-être" },
  { content: "Regardez des photos de moments heureux.", category: "Bien-être" },
  {
    content: "Faites un câlin de 20 secondes (libère de l'ocytocine).",
    category: "Bien-être",
  },
  { content: "Dites 'Je t'aime' à vos proches.", category: "Bien-être" },
  {
    content: "Passez du temps avec des enfants ou des animaux.",
    category: "Bien-être",
  },
  {
    content: "Faites un don à une cause qui vous tient à cœur.",
    category: "Bien-être",
  },
  { content: "Apprenez à recevoir les compliments.", category: "Bien-être" },
  {
    content: "Soyez patient avec vous-même lors de l'apprentissage.",
    category: "Bien-être",
  },

  // --- NUMÉRIQUE ---
  {
    content:
      "Utilisez un gestionnaire de mots de passe (Bitwarden, 1Password).",
    category: "Numérique",
  },
  {
    content: "Activez l'authentification à double facteur (2FA) partout.",
    category: "Numérique",
  },
  {
    content: "Faites des sauvegardes régulières (Règle 3-2-1).",
    category: "Numérique",
  },
  {
    content: "Nettoyez votre bureau numérique (Desktop) chaque semaine.",
    category: "Numérique",
  },
  {
    content: "Videz votre dossier Téléchargements régulièrement.",
    category: "Numérique",
  },
  {
    content: "Désinstallez les applications que vous n'utilisez plus.",
    category: "Numérique",
  },
  {
    content: "Mettez à jour votre OS et vos logiciels pour la sécurité.",
    category: "Numérique",
  },
  {
    content: "Utilisez des noms de fichiers explicites et datés.",
    category: "Numérique",
  },
  {
    content:
      "Organisez vos dossiers par grandes catégories (PRO, PERSO, ADMIN).",
    category: "Numérique",
  },
  {
    content: "Utilisez la recherche plutôt que de naviguer dans les dossiers.",
    category: "Numérique",
  },
  {
    content: "Maîtrisez les raccourcis clavier de votre OS.",
    category: "Numérique",
  },
  {
    content: "Utilisez un bloqueur de publicités (uBlock Origin).",
    category: "Numérique",
  },
  {
    content: "Nettoyez vos cookies et votre cache de temps en temps.",
    category: "Numérique",
  },
  {
    content: "Utilisez un navigateur respectueux de la vie privée.",
    category: "Numérique",
  },
  {
    content: "Ne cliquez jamais sur des liens suspects dans les emails.",
    category: "Numérique",
  },
  {
    content:
      "Vérifiez l'expéditeur des emails avant d'ouvrir les pièces jointes.",
    category: "Numérique",
  },
  {
    content: "Utilisez un VPN sur les réseaux Wi-Fi publics.",
    category: "Numérique",
  },
  {
    content: "Chiffrez votre disque dur (BitLocker, FileVault).",
    category: "Numérique",
  },
  {
    content: "Fermez votre session quand vous quittez votre poste.",
    category: "Numérique",
  },
  {
    content:
      "Utilisez un filtre de confidentialité sur votre écran en déplacement.",
    category: "Numérique",
  },
  {
    content: "Réduisez la luminosité de votre écran le soir.",
    category: "Numérique",
  },
  {
    content: "Utilisez le mode sombre pour économiser vos yeux et la batterie.",
    category: "Numérique",
  },
  { content: "Calibrez les couleurs de votre écran.", category: "Numérique" },
  {
    content: "Nettoyez physiquement votre écran et votre clavier.",
    category: "Numérique",
  },
  {
    content:
      "Utilisez un support pour ordinateur portable pour vos cervicales.",
    category: "Numérique",
  },
  {
    content: "Investissez dans une souris ergonomique verticale.",
    category: "Numérique",
  },
  {
    content: "Utilisez un clavier mécanique pour le confort de frappe.",
    category: "Numérique",
  },
  {
    content: "Gérez vos câbles avec des attaches ou des gaines.",
    category: "Numérique",
  },
  { content: "Ayez toujours un chargeur de secours.", category: "Numérique" },
  {
    content: "Utilisez une batterie externe pour vos déplacements.",
    category: "Numérique",
  },
  {
    content: "Numérisez vos papiers importants et stockez-les dans le cloud.",
    category: "Numérique",
  },
  {
    content: "Triez vos photos et supprimez les doublons.",
    category: "Numérique",
  },
  {
    content: "Créez des albums photo pour retrouver vos souvenirs.",
    category: "Numérique",
  },
  {
    content: "Désactivez la lecture automatique des vidéos.",
    category: "Numérique",
  },
  {
    content: "Limitez votre temps d'écran avec des applications dédiées.",
    category: "Numérique",
  },
  {
    content: "Suivez votre temps d'utilisation des applications.",
    category: "Numérique",
  },
  {
    content: "Faites le tri dans vos amis sur les réseaux sociaux.",
    category: "Numérique",
  },
  {
    content: "Ne scrollez pas indéfiniment (Doomscrolling).",
    category: "Numérique",
  },
  {
    content: "Préférez les appels vidéo aux longs échanges de texte.",
    category: "Numérique",
  },
  { content: "Utilisez des outils de dictée vocale.", category: "Numérique" },
  {
    content: "Apprenez à utiliser l'IA générative pour gagner du temps.",
    category: "Numérique",
  },
  {
    content: "Vérifiez toujours les informations générées par l'IA.",
    category: "Numérique",
  },
  {
    content: "Automatisez le tri de vos emails avec des filtres.",
    category: "Numérique",
  },
  {
    content: "Utilisez la fonction 'Snooze' pour les emails non urgents.",
    category: "Numérique",
  },
  {
    content:
      "Archivez vos emails traités, ne les laissez pas dans la boîte de réception.",
    category: "Numérique",
  },
  {
    content: "Utilisez des signatures d'email professionnelles.",
    category: "Numérique",
  },
  {
    content: "Ne mettez pas tout le monde en copie (CC) inutilement.",
    category: "Numérique",
  },
  {
    content: "Soyez concis dans vos communications écrites.",
    category: "Numérique",
  },
  {
    content: "Utilisez des listes à puces pour rendre vos textes lisibles.",
    category: "Numérique",
  },
  {
    content: "Relisez-vous avant d'envoyer un message.",
    category: "Numérique",
  },
  { content: "Utilisez un correcteur orthographique.", category: "Numérique" },
  {
    content: "Apprenez les bases du Markdown pour formater vos textes.",
    category: "Numérique",
  },
  {
    content: "Utilisez des outils de capture d'écran (Snip & Sketch).",
    category: "Numérique",
  },
  {
    content: "Enregistrez votre écran pour faire des tutoriels rapides.",
    category: "Numérique",
  },
  {
    content: "Partagez des liens plutôt que des fichiers lourds.",
    category: "Numérique",
  },
  {
    content: "Comprimez vos images avant de les envoyer.",
    category: "Numérique",
  },
  {
    content: "Utilisez le format PDF pour les documents finaux.",
    category: "Numérique",
  },
  { content: "Signez vos documents électroniquement.", category: "Numérique" },
  {
    content: "Utilisez des outils de gestion de projet (Trello, Notion, Jira).",
    category: "Numérique",
  },
  {
    content: "Synchronisez vos calendriers sur tous vos appareils.",
    category: "Numérique",
  },
  { content: "Mettez des rappels pour tout.", category: "Numérique" },
  {
    content: "Utilisez des widgets pour avoir l'info en un coup d'œil.",
    category: "Numérique",
  },
  {
    content: "Personnalisez votre fond d'écran pour qu'il vous inspire.",
    category: "Numérique",
  },
  {
    content: "La technologie doit vous servir, pas vous asservir.",
    category: "Numérique",
  },
  {
    content: "Déconnectez pour mieux vous reconnecter.",
    category: "Numérique",
  },
  // Nouveaux ajouts Numérique
  {
    content: "Désactivez les badges de notification rouges (Pastilles).",
    category: "Numérique",
  },
  {
    content:
      "Utilisez un fond d'écran noir pour économiser de la batterie (OLED).",
    category: "Numérique",
  },
  {
    content: "Nettoyez le port de chargement de votre téléphone.",
    category: "Numérique",
  },
  {
    content: "Utilisez des câbles de qualité certifiée.",
    category: "Numérique",
  },
  {
    content: "Redémarrez votre box internet une fois par mois.",
    category: "Numérique",
  },
  {
    content: "Changez le mot de passe par défaut de vos objets connectés.",
    category: "Numérique",
  },
  { content: "Utilisez une couverture de webcam.", category: "Numérique" },
  {
    content: "Apprenez à utiliser les bureaux virtuels.",
    category: "Numérique",
  },
  {
    content: "Utilisez la fonction 'Rechercher sur la page' (Ctrl+F).",
    category: "Numérique",
  },
  { content: "Faites attention à votre e-réputation.", category: "Numérique" },
  {
    content: "Utilisez des alias d'email pour éviter le spam.",
    category: "Numérique",
  },
  {
    content: "Ne partagez pas votre localisation en temps réel inutilement.",
    category: "Numérique",
  },
  {
    content: "Révisez les permissions de vos applications mobiles.",
    category: "Numérique",
  },
  {
    content: "Utilisez le mode avion pour charger votre téléphone plus vite.",
    category: "Numérique",
  },
  { content: "Faites du ménage dans vos contacts.", category: "Numérique" },
  {
    content: "Utilisez des raccourcis textes sur mobile.",
    category: "Numérique",
  },
  {
    content: "Désactivez le vibreur pour les notifications non urgentes.",
    category: "Numérique",
  },
  {
    content: "Utilisez la lecture vocale pour les longs articles.",
    category: "Numérique",
  },
  {
    content: "Sauvegardez les articles à lire plus tard (Pocket, Instapaper).",
    category: "Numérique",
  },
  {
    content: "Utilisez le mode 'Lecteur' de votre navigateur.",
    category: "Numérique",
  },

  // --- CRÉATIVITÉ ---
  {
    content: "Ayez toujours un carnet sur vous pour noter vos idées.",
    category: "Créativité",
  },
  {
    content: "La créativité est un muscle, exercez-le chaque jour.",
    category: "Créativité",
  },
  {
    content: "Connectez des idées qui n'ont rien à voir (Pensée latérale).",
    category: "Créativité",
  },
  {
    content: "Posez-vous la question 'Et si... ?' plus souvent.",
    category: "Créativité",
  },
  {
    content: "Changez de perspective : regardez le problème à l'envers.",
    category: "Créativité",
  },
  { content: "La contrainte favorise la créativité.", category: "Créativité" },
  {
    content: "Copiez les maîtres pour apprendre, puis trouvez votre style.",
    category: "Créativité",
  },
  {
    content: "N'ayez pas peur de faire de mauvaises choses au début.",
    category: "Créativité",
  },
  { content: "La quantité mène à la qualité.", category: "Créativité" },
  { content: "Sortez de votre zone de confort.", category: "Créativité" },
  {
    content: "Voyagez, même mentalement, pour trouver l'inspiration.",
    category: "Créativité",
  },
  {
    content: "Lisez des livres hors de votre domaine d'expertise.",
    category: "Créativité",
  },
  {
    content: "Discutez avec des gens différents de vous.",
    category: "Créativité",
  },
  {
    content: "Faites des siestes pour laisser votre inconscient travailler.",
    category: "Créativité",
  },
  { content: "Marchez pour débloquer vos idées.", category: "Créativité" },
  {
    content: "Prenez une douche, c'est là que viennent les meilleures idées.",
    category: "Créativité",
  },
  {
    content: "Pratiquez l'écriture libre (Free writing) le matin.",
    category: "Créativité",
  },
  {
    content: "Dessinez, même si vous ne savez pas dessiner (Sketchnoting).",
    category: "Créativité",
  },
  {
    content: "Utilisez des cartes mentales (Mind Mapping).",
    category: "Créativité",
  },
  {
    content: "Faites des listes de 10 idées par jour.",
    category: "Créativité",
  },
  { content: "Soyez curieux de tout.", category: "Créativité" },
  { content: "Observez le monde comme un enfant.", category: "Créativité" },
  { content: "Observez le monde qui vous entoure.", category: "Créativité" }, // Restauré
  {
    content: "Demandez 'Pourquoi ?' cinq fois de suite.",
    category: "Créativité",
  },
  {
    content: "Échouez vite et apprenez de vos échecs.",
    category: "Créativité",
  },
  {
    content: "Ne jugez pas vos idées lors du brainstorming.",
    category: "Créativité",
  },
  { content: "Collaborez avec d'autres créatifs.", category: "Créativité" },
  { content: "Montrez votre travail, même imparfait.", category: "Créativité" },
  { content: "Acceptez la critique constructive.", category: "Créativité" },
  {
    content: "Ignorez les trolls et les critiques destructives.",
    category: "Créativité",
  },
  {
    content: "Créez pour vous-même avant de créer pour les autres.",
    category: "Créativité",
  },
  {
    content: "Amusez-vous, le jeu est essentiel à la création.",
    category: "Créativité",
  },
  {
    content: "Détournez les objets de leur fonction première.",
    category: "Créativité",
  },
  { content: "Simplifiez, enlevez le superflu.", category: "Créativité" },
  {
    content: "Combinez deux concepts existants pour en créer un nouveau.",
    category: "Créativité",
  },
  {
    content: "Utilisez des analogies et des métaphores.",
    category: "Créativité",
  },
  {
    content: "Changez votre routine pour stimuler votre cerveau.",
    category: "Créativité",
  },
  { content: "Visitez des musées et des expositions.", category: "Créativité" },
  {
    content: "Regardez des films d'auteurs différents.",
    category: "Créativité",
  },
  { content: "Écoutez des styles de musique variés.", category: "Créativité" },
  {
    content: "Apprenez une nouvelle langue ou un instrument.",
    category: "Créativité",
  },
  {
    content: "Bricolez, faites quelque chose de vos mains.",
    category: "Créativité",
  },
  {
    content: "Jardinez, la nature est la plus grande créatrice.",
    category: "Créativité",
  },
  { content: "Cuisinez sans recette.", category: "Créativité" },
  { content: "Rêvez éveillé.", category: "Créativité" },
  {
    content: "L'ennui est le terreau de l'imagination.",
    category: "Créativité",
  },
  {
    content: "Prenez du temps pour l'ennui, c'est là que naissent les idées.",
    category: "Créativité",
  }, // Restauré
  { content: "Notez vos rêves au réveil.", category: "Créativité" },
  {
    content: "Utilisez la méthode SCAMPER pour innover.",
    category: "Créativité",
  },
  { content: "Faites des collages (Vision Board).", category: "Créativité" },
  { content: "Racontez des histoires (Storytelling).", category: "Créativité" },
  {
    content: "Utilisez l'humour pour dédramatiser et innover.",
    category: "Créativité",
  },
  {
    content: "Soyez patient, les grandes idées prennent du temps.",
    category: "Créativité",
  },
  {
    content: "Ne forcez pas l'inspiration, préparez le terrain.",
    category: "Créativité",
  },
  {
    content: "L'artiste vole, mais il vole avec goût.",
    category: "Créativité",
  },
  { content: "Restez humble, on apprend toujours.", category: "Créativité" },
  { content: "Partagez vos connaissances.", category: "Créativité" },
  {
    content: "Créez un environnement propice à la création.",
    category: "Créativité",
  },
  { content: "Mettez de la couleur dans votre vie.", category: "Créativité" },
  { content: "Faites confiance à votre intuition.", category: "Créativité" },
  { content: "La créativité demande du courage.", category: "Créativité" },
  { content: "Soyez original, soyez vous-même.", category: "Créativité" },
  { content: "La perfection est l'ennemie du bien.", category: "Créativité" },
  { content: "Commencez avant d'être prêt.", category: "Créativité" },
  { content: "Finissez ce que vous commencez.", category: "Créativité" },
  {
    content: "Célébrez le processus, pas juste le résultat.",
    category: "Créativité",
  },
  {
    content: "Vous êtes créatif, ne l'oubliez jamais.",
    category: "Créativité",
  },
  // Nouveaux ajouts Créativité
  {
    content: "Faites des associations de mots aléatoires.",
    category: "Créativité",
  },
  {
    content: "Dessinez avec votre main non dominante.",
    category: "Créativité",
  },
  { content: "Écrivez une histoire en 50 mots.", category: "Créativité" },
  {
    content: "Prenez un chemin différent pour aller travailler.",
    category: "Créativité",
  },
  {
    content: "Observez les nuages et trouvez des formes.",
    category: "Créativité",
  },
  {
    content: "Revisitez vos vieux projets abandonnés.",
    category: "Créativité",
  },
  {
    content: "Faites un brainstorming inversé (comment rater ce projet ?).",
    category: "Créativité",
  },
  {
    content: "Imaginez comment un enfant de 5 ans résoudrait ce problème.",
    category: "Créativité",
  },
  {
    content: "Limitez vos outils (ex: dessiner avec un seul stylo).",
    category: "Créativité",
  },
  {
    content: "Faites du 'People Watching' dans un lieu public.",
    category: "Créativité",
  },
  {
    content: "Écoutez un album en entier sans rien faire d'autre.",
    category: "Créativité",
  },
  { content: "Regardez un film sans le son.", category: "Créativité" },
  {
    content: "Lisez un magazine sur un sujet que vous ignorez totalement.",
    category: "Créativité",
  },
  {
    content: "Construisez quelque chose avec des LEGO.",
    category: "Créativité",
  },
  {
    content: "Faites des origamis pour vous concentrer et créer.",
    category: "Créativité",
  },
  { content: "Écrivez une lettre à votre futur moi.", category: "Créativité" },
  {
    content: "Imaginez que vous avez des ressources illimitées.",
    category: "Créativité",
  },
  {
    content: "Faites une liste de 100 choses que vous aimez.",
    category: "Créativité",
  },
  { content: "Changez l'ordre de vos meubles.", category: "Créativité" },
  {
    content: "Utilisez la méthode des six chapeaux de Bono.",
    category: "Créativité",
  },
];
