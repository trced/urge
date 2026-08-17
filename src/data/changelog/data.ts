/** Le journal des versions, bilingue. Même contenu que CHANGELOG.md :
 *  le fichier du dépôt reste la référence, celui-ci le rend lisible dans
 *  le site sans dépendance de rendu Markdown. */

import type { ChangelogVersion } from './types.ts'

export const changelogVersions: ChangelogVersion[] = [
  {
    version: '0.1.0',
    date: '2026-08-17',
    changes: {
      added: [
        {
          category: 'le registre',
          categoryEn: 'the register',
          text: "L'application : on inscrit une envie au moment où l'on y renonce — un nom, éventuellement un prix et un lieu, la phrase que l'on s'est dite. Le registre se lit du plus récent au plus ancien et ne se réordonne jamais ; entre deux lignes, un creux de quatre jours ou plus est signalé pour ce qu'il est : des jours où l'on n'a rien inscrit",
          textEn:
            'The app: you write down an urge at the moment you give it up — a name, perhaps a price and a place, the sentence you told yourself. The register reads most recent first and never reorders itself; between two lines, a gap of four days or more is shown for what it is: days with nothing written down',
        },
        {
          category: 'la question',
          categoryEn: 'the question',
          text: "Trente jours après le renoncement, une question, une seule : y pensez-vous encore ? Trois réponses — oublié, vaguement, toujours — données une fois et sans retour. La phrase écrite le jour du renoncement est relue au-dessus : sans elle, on répondrait à un nom d'objet plutôt qu'à une envie",
          textEn:
            'Thirty days after giving it up, one question and only one: do you still think about it? Three answers — forgotten, faintly, still — given once, with no going back. The sentence written on the day is read again above it: without it you would be answering a product name rather than an urge',
        },
        {
          category: 'la date de la question',
          categoryEn: 'the question date',
          text: "La date de la question est figée au moment de l'inscription plutôt que recalculée depuis le réglage. Raccourcir le délai ferait échoir d'un coup des lignes qu'on croyait au calme, l'allonger effacerait une question déjà due : le réglage vaut pour ce qu'on inscrira, jamais pour ce qui est inscrit",
          textEn:
            'The question date is fixed when the line is written rather than recomputed from the setting. Shortening the delay would make lines you thought were quiet fall due all at once; lengthening it would erase a question already owed. The setting applies to what you write next, never to what is written',
        },
        {
          category: 'les deux mises en page',
          categoryEn: 'the two layouts',
          text: "Au-delà de 900 px, deux panneaux : le registre à gauche, ce qu'on regarde à droite. Ouvrir une ligne ne quitte pas le registre, et le panneau pose de lui-même la question la plus ancienne échue quand il n'a rien d'autre à montrer. En dessous, un écran à la fois, la feuille d'inscription monte du bas et l'action primaire reste sous le pouce",
          textEn:
            'Above 900 px, two panels: the register on the left, whatever you are looking at on the right. Opening a line does not leave the register, and the panel asks the oldest due question by itself when it has nothing else to show. Below that, one screen at a time, the writing sheet comes up from the bottom and the primary action stays under your thumb',
        },
        {
          category: 'le bilan',
          categoryEn: 'the review',
          text: "Le bilan d'un mois : ce que vous avez répondu d'abord, le registre ensuite, les montants en dernier. Les réponses sont comptées au jour où elles ont été données — un mois compte ce qu'on y a jugé, pas ce qu'on aurait dû y juger. Le total existe mais n'est jamais présenté comme une économie",
          textEn:
            'A month in review: what you answered first, the register next, the amounts last. Answers are counted on the day they were given — a month counts what you judged in it, not what you should have judged. The total exists but is never shown as a saving',
        },
        {
          category: 'les réglages',
          categoryEn: 'settings',
          text: 'Délai avant la question (quinze, trente ou soixante jours), moment où la question se pose, prix demandé ou jamais, thème clair, sombre ou système, langue française, anglaise ou système. Chaque ligne défile ses valeurs au clic',
          textEn:
            'Delay before the question (fifteen, thirty or sixty days), when the question is asked, price asked for or never, light, dark or system theme, French, English or system language. Each row cycles its values on click',
        },
        {
          category: 'les données',
          categoryEn: 'your data',
          text: "Export et import du fichier urge.json, avec le choix entre fusionner et remplacer, et un effacement complet derrière une confirmation explicite. Fusionner n'écrase rien : une ligne déjà jugée garde son verdict, y compris face à un fichier qui prétend le contraire",
          textEn:
            'Export and import of the urge.json file, with a choice between merging and replacing, and a full erase behind an explicit confirmation. Merging overwrites nothing: a line already judged keeps its verdict, even against a file that claims otherwise',
        },
        {
          category: 'envoyer vers',
          categoryEn: 'send to',
          text: "Le partage natif de l'appareil quand il sait recevoir un fichier, un téléchargement sinon. Le fichier ne quitte l'appareil que par ce geste, vers l'application que vous choisissez. Le projet n'a aucun serveur pour le recevoir",
          textEn:
            'The device’s native share when it can take a file, a download otherwise. The file only leaves the device through that gesture, towards the app you pick. The project has no server to receive it',
        },
        {
          category: 'hors ligne',
          categoryEn: 'offline',
          text: "Application web installable et utilisable hors ligne : tout est précaché au téléchargement, et il n'y a aucune requête réseau à l'usage. Une nouvelle version se propose au lieu de s'imposer",
          textEn:
            'Installable, offline-capable progressive web app: everything is precached on download, and there is no network request in use. A new version offers itself instead of imposing itself',
        },
        {
          category: 'le site',
          categoryEn: 'the site',
          text: "Site de présentation en français et en anglais : page d'accueil avec la vraie application embarquée, à propos, conditions d'utilisation, confidentialité, mentions légales et notes de version",
          textEn:
            'Presentation site in French and English: home page with the real app embedded, about page, terms of use, privacy, legal notice and changelog',
        },
        {
          category: 'exemple',
          categoryEn: 'example',
          text: "Mode exemple accessible depuis la présentation : seize lignes calculées depuis aujourd'hui, dont deux questions échues, sans rien écrire sur l'appareil",
          textEn:
            'Example mode reachable from the overview: sixteen lines computed from today, two of them with questions already due, writing nothing to the device',
        },
        {
          category: 'accessibilité',
          categoryEn: 'accessibility',
          text: "Cibles de 44 × 44 px au minimum, anneau de focus visible de 2 px, focus piégé dans la feuille puis restitué, Échap qui ferme. Chaque ligne du registre porte un nom accessible complet — « objectif 35 mm, inscrit le 14 août 2026, oublié » — parce que la colonne de droite ne se lit pas en tabulant",
          textEn:
            'Touch targets of at least 44 × 44 px, a visible 2 px focus ring, focus trapped in the sheet then given back, Escape to close. Every register row carries a full accessible name — “35 mm lens, written down on 14 August 2026, forgotten” — because the right-hand column is not read when tabbing through',
        },
        {
          category: 'le système',
          categoryEn: 'the design system',
          text: "La famille « . » 1.2.0 en tokens CSS : couleur, typographie, espace, forme, mouvement, et les composants partagés. urge. n'ajoute aucune couleur au tronc commun — son vocabulaire est fait de mots, jamais de teintes",
          textEn:
            'The “.” family 1.2.0 as CSS tokens: colour, typography, space, shape, motion, and the shared components. urge. adds no colour to the common trunk — its vocabulary is made of words, never of hues',
        },
        {
          category: 'les tests',
          categoryEn: 'tests',
          text: "Tests unitaires sur la couche pure — dates, échéances, creux du registre, bilan du mois, import, fusion, stockage — et tests d'intégration des vrais parcours : inscrire, répondre, retirer",
          textEn:
            'Unit tests over the pure layer — dates, due dates, register gaps, monthly review, import, merge, storage — and integration tests of the real user paths: write down, answer, remove',
        },
      ],
      changed: [
        {
          category: 'le rappel',
          categoryEn: 'the reminder',
          text: "Le « rappel » esquissé dans la maquette est remplacé par un réglage qui existe vraiment : « poser la question — à l'ouverture ou quand je la demande ». Une application sans serveur ne peut pas réveiller un téléphone à 9 h, et un interrupteur qui promet une notification que le programme n'enverra jamais est un mensonge de plus dans une interface qui en refuse partout ailleurs",
          textEn:
            'The “reminder” sketched in the mock-up is replaced by a setting that actually exists: “ask the question — when I open the app, or when I ask for it”. An app with no server cannot wake a phone at 9 a.m., and a switch promising a notification the program will never send is one more lie in an interface that refuses them everywhere else',
        },
      ],
    },
  },
]
