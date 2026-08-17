/** Dictionnaire français — référence. en.ts en est le miroir typé :
 *  une clé manquante ou en trop échoue à la compilation.
 *  Convention de clé : domaine.composant.clé. */

export const fr = {
  // ————— commun —————
  'common.brand': 'urge.',
  'common.tagline': 'une chose. bien faite.',
  'common.close': 'fermer',
  'common.cancel': 'annuler',
  'common.skipToContent': 'aller au contenu',

  // ————— application · navigation —————
  'app.nav.register': 'registre',
  'app.nav.review': 'bilan',
  'app.nav.settings': 'réglages',
  'app.nav.label': 'sections',

  // ————— application · mode exemple —————
  'app.demo.label': 'exemple',
  'app.demo.note': "rien n'est enregistré sur cet appareil",
  'app.demo.leave': 'ouvrir mon registre',
  // Seize lignes « nom | où | pourquoi ». Des objets ordinaires, aucun
  // jugement : ce sont des envies, pas des fautes.
  'app.demo.entries': `veste en laine, seconde main | vinted | Elle était exactement à ma taille.
objectif 35 mm | digit-photo | Photographier les gens, pas les paysages.
machine à pâtes | brocante de Vanves | Les dimanches d'hiver.
abonnement annuel, appli de méditation | en ligne | Dormir mieux sans y penser.
enceinte portable | fnac | Pour le balcon, l'été.
chaise de bureau d'occasion | leboncoin | Le dos, en fin de journée.
bottines en cuir | boutique, rue de Turenne | Les miennes ont deux hivers.
sac de voyage 40 L | bellroy.com | Deux semaines au Portugal en septembre.
cafetière filtre | site du fabricant | Trois cafés par jour, autant les faire bien.
lampe d'architecte, seconde main | leboncoin | La lumière du bureau est mauvaise le soir.
coffret de thé en vrac | comptoir, rue Rambuteau | Pour remplacer le café de l'après-midi.
tapis de yoga | en ligne | Le cours du mardi, que je n'ai pas repris.
vélo gravel | magasin, rue Oberkampf | Sortir de Paris le dimanche sans voiture.
casque à réduction de bruit | amazon | Le bruit du plateau, tous les matins.
roman en grand format | librairie du quartier | Tout le monde en parlait cette semaine-là.
console portable | micromania | Le trajet du matin, quarante minutes.`,

  // ————— application · premier lancement —————
  'app.intro.count': '{n} sur 3',
  'app.intro.skip': 'passer',
  'app.intro.next': 'suivant',
  'app.intro.open': 'ouvrir le registre',
  'app.intro.label': 'premier lancement',
  'app.intro.oneTitle': "Ce n'est pas une liste d'envies.",
  'app.intro.oneBody':
    "Une envie s'inscrit ici au moment où vous y renoncez, jamais au moment où elle arrive. Une liste d'objets désirés serait une liste de courses déguisée.",
  'app.intro.twoTitle': 'Trente jours plus tard, une question.',
  'app.intro.twoBody':
    "Y pensez-vous encore ? Trois réponses possibles : oublié, vaguement, toujours. C'est cette réponse, et rien d'autre, qui dit quelque chose de vrai.",
  'app.intro.threeTitle': "Rien ne sort d'ici.",
  'app.intro.threeBody':
    "Le registre reste sur cet appareil. Aucun compte, aucune synchronisation, aucun prix suivi. Le total existe, mais il ne vous est jamais présenté comme une économie.",

  // ————— application · registre —————
  'app.register.title': 'le registre',
  'app.register.label': 'registre',
  'app.register.order': 'du plus récent au plus ancien',
  'app.register.add': '+ inscrire un renoncement',
  'app.register.count.one': '{n} inscrit · {pending}',
  'app.register.count.other': '{n} inscrits · {pending}',
  'app.register.pending.one': '{n} en attente de verdict',
  'app.register.pending.other': '{n} en attente de verdict',
  'app.register.due': 'y pensez-vous encore ?',
  'app.register.dueCount.one': '{n} envie échue',
  'app.register.dueCount.other': '{n} envies échues',
  'app.register.gap.one': '{n} jour sans rien inscrire',
  'app.register.gap.other': '{n} jours sans rien inscrire',
  'app.register.hide': 'masquer',
  // « objectif 35 mm, inscrit le 14 août 2026, oublié »
  'app.register.rowAria': '{name}, inscrit le {date}, {status}',

  // ————— application · état vide —————
  'app.empty.title': 'Aucun renoncement inscrit.',
  'app.empty.body':
    "Inscrivez la prochaine envie à laquelle vous renoncez ; la question viendra {delay} plus tard.",
  'app.empty.note': "Le registre reste sur cet appareil.",

  // ————— application · statuts —————
  'app.status.forgotten': 'oublié',
  'app.status.faint': 'vaguement',
  'app.status.still': 'toujours',
  'app.status.due': 'à répondre',
  'app.status.waiting': 'question le {date}',
  'app.status.judged': 'jugé · {verdict}',
  'app.status.dueLong': 'question échue',
  'app.status.pendingLong': 'en attente de verdict',

  // ————— application · inscrire —————
  'app.capture.label': 'inscrire un renoncement',
  'app.capture.heading': 'un renoncement',
  'app.capture.name': "Ce que je n'achète pas",
  'app.capture.namePlaceholder': 'objectif 35 mm',
  'app.capture.nameError': "Nommez l'objet : c'est la seule chose obligatoire.",
  'app.capture.price': 'Prix',
  'app.capture.pricePlaceholder': '429',
  'app.capture.where': 'Où',
  'app.capture.wherePlaceholder': 'digit-photo',
  'app.capture.why': 'Pourquoi je le voulais',
  'app.capture.whyPlaceholder': 'La raison, en une phrase.',
  'app.capture.hint': 'La question reviendra le {date}.',
  'app.capture.save': 'inscrire',

  // ————— application · la question —————
  'app.question.label': 'y pensez-vous encore ?',
  'app.question.heading': 'Y pensez-vous encore ?',
  'app.question.position': '{n} sur {total}',
  'app.question.waiting.one': '{n} question en attente',
  'app.question.waiting.other': '{n} questions en attente',
  'app.question.askedOn': 'question du {date}',
  'app.question.renouncedOn': 'renoncé le {date}',
  'app.question.later': 'répondre plus tard',
  'app.question.once': 'une seule réponse, pas de retour',
  'app.question.forgotten': "je n'y pensais plus",
  'app.question.faint': 'ça revient parfois',
  'app.question.still': 'je le veux encore',
  'app.question.answerAria': '{name} : {verdict}, {gloss}',

  // ————— application · rien à répondre —————
  'app.idle.title': 'Aucune question en attente.',
  'app.idle.body':
    "Une envie s'inscrit au moment où l'on y renonce. {delay} plus tard, urge. la ramène ici et pose une question, une seule : y pensez-vous encore ?",
  'app.idle.label': 'en un mot',
  'app.idle.next': 'prochaine question',
  'app.idle.written': 'inscrits',
  'app.idle.judged': 'jugés',
  'app.idle.waiting': 'en attente',
  'app.idle.none': '—',

  // ————— application · une envie en détail —————
  'app.detail.label': 'envie en détail',
  'app.detail.back': '← le registre',
  'app.detail.price': 'prix relevé',
  'app.detail.noPrice': 'non demandé',
  'app.detail.where': 'où',
  'app.detail.nowhere': '—',
  'app.detail.written': 'inscrit le',
  'app.detail.ask': 'question posée le',
  'app.detail.askFuture': 'question prévue le',
  'app.detail.why': 'pourquoi je le voulais',
  'app.detail.noWhy': 'Aucune raison écrite.',
  'app.detail.timeline': 'chronologie',
  'app.detail.stepWritten': 'inscrit — renoncement',
  'app.detail.stepAsked': 'question posée',
  'app.detail.stepComing': 'question à venir',
  'app.detail.stepAnswer': 'réponse — {verdict}',
  'app.detail.stepAnswerMeta': '{n} jours après le renoncement',
  'app.detail.stepNone': 'sans réponse',
  'app.detail.stepNoneDue': 'la question attend',
  'app.detail.stepNoneLater': 'la question viendra le {date}',
  'app.detail.answerNow': 'répondre maintenant',
  'app.detail.remove': 'retirer du registre',
  'app.detail.removeTitle': 'Retirer « {name} » ?',
  'app.detail.removeBody':
    'La ligne et sa réponse disparaissent du registre. Le compte du mois est recalculé.',
  'app.detail.removeConfirm': 'retirer',

  // ————— application · bilan —————
  'app.review.label': 'bilan',
  'app.review.prevAria': 'mois précédent',
  'app.review.nextAria': 'mois suivant',
  'app.review.thisMonth': 'ce mois-ci',
  'app.review.backToMonth': 'revenir à {month}',
  'app.review.backHint': 'revenir à {month}',
  'app.review.answers': 'ce que vous avez répondu',
  'app.review.answered.one': 'sur {n} réponse ce mois-ci',
  'app.review.answered.other': 'sur {n} réponses ce mois-ci',
  'app.review.noAnswers': 'aucune question posée ce mois-ci',
  'app.review.noFaint': 'rien qui revient',
  'app.review.noStill': 'rien qui tient {delay}',
  'app.review.example': '{name} · inscrit le {date}',
  'app.review.readingOne.one':
    '{n} réponse sur {total} oubliée : le mois n’a rien coûté à personne.',
  'app.review.readingOne.other':
    '{n} réponses sur {total} oubliées : le mois n’a rien coûté à personne.',
  'app.review.readingStill.one':
    '{n} sur {total} tient encore. C’est celle-là qui mérite une seconde question.',
  'app.review.readingStill.other':
    '{n} sur {total} tiennent encore. Ce sont celles-là qui méritent une seconde question.',
  'app.review.readingNone':
    'Aucune question ce mois-ci. Le registre attend, c’est son état normal.',
  'app.review.register': 'le registre ce mois-ci',
  'app.review.written': 'renoncements inscrits',
  'app.review.asked': 'questions posées',
  'app.review.pending': 'en attente de verdict',
  'app.review.money': 'montants, pour mémoire',
  'app.review.monthMoney': 'inscrit ce mois-ci',
  'app.review.allMoney': 'depuis le début',
  'app.review.stillMoney': 'dont encore désiré',
  'app.review.moneyNote':
    "Ce total n'est pas une économie. C'est seulement la somme de ce que vous n'avez pas acheté, et elle ne dit rien de ce que vous vouliez vraiment.",
  'app.review.moneyHidden':
    "Les prix ne sont pas demandés : il n'y a rien à totaliser.",

  // ————— application · réglages —————
  'app.settings.title': 'réglages',
  'app.settings.label': 'réglages',
  'app.settings.question': 'la question',
  'app.settings.delay': 'délai avant la question',
  'app.settings.delayAria': 'délai avant la question : {value}, changer',
  'app.settings.ask': 'poser la question',
  'app.settings.askAria': 'poser la question : {value}, changer',
  'app.settings.askOnOpen': "à l'ouverture",
  'app.settings.askOnDemand': 'quand je la demande',
  'app.settings.price': 'demander le prix',
  'app.settings.priceAria': 'demander le prix : {value}, changer',
  'app.settings.priceAsked': 'oui',
  'app.settings.priceNever': 'jamais',
  'app.settings.cycleNote': 'Une ligne se change en la touchant : la valeur défile.',
  'app.settings.delayNote':
    'Le délai vaut pour ce que vous inscrirez ; les questions déjà promises gardent leur date.',
  'app.settings.appearance': 'apparence',
  'app.settings.theme': 'thème',
  'app.settings.themeAria': 'thème : {value}, changer',
  'app.settings.themeSystem': 'système',
  'app.settings.themeLight': 'clair',
  'app.settings.themeDark': 'sombre',
  'app.settings.lang': 'langue',
  'app.settings.langAria': 'langue : {value}, changer',
  'app.settings.langSystem': 'système',
  'app.settings.langFr': 'français',
  'app.settings.langEn': 'anglais',
  'app.settings.data': 'les données',
  'app.settings.export': 'exporter le registre',
  'app.settings.exportValue': 'fichier JSON',
  'app.settings.send': 'envoyer le registre',
  'app.settings.sendValue': 'vers une application',
  'app.settings.import': 'importer un registre',
  'app.settings.importValue': 'urge.json',
  'app.settings.intro': 'revoir la présentation',
  'app.settings.introValue': 'trois écrans',
  'app.settings.erase': 'effacer le registre',
  'app.settings.eraseTitle': 'Effacer tout le registre ?',
  'app.settings.eraseBody':
    '{count} et leurs réponses seront effacées de cet appareil. Rien ne peut les rappeler.',
  'app.settings.eraseConfirm': 'effacer',
  'app.settings.lines.one': '{n} ligne',
  'app.settings.lines.other': '{n} lignes',
  'app.settings.where': 'données',
  'app.settings.whereValue': 'sur cet appareil',
  'app.settings.storageOff': 'stockage indisponible',
  'app.settings.storageOffValue': 'session seulement',
  'app.settings.version': 'version',
  'app.settings.source': 'code source',
  'app.settings.sourceValue': 'github',
  'app.settings.licence': 'licence',
  'app.settings.licenceValue': 'AGPL-3.0-or-later',

  // ————— application · import —————
  'app.import.title': 'Registre lu.',
  'app.import.body.one':
    '{n} ligne dans le fichier. Fusionner l’ajoute au registre ; remplacer met le fichier à la place.',
  'app.import.body.other':
    '{n} lignes dans le fichier. Fusionner les ajoute au registre ; remplacer met le fichier à la place.',
  'app.import.merge': 'fusionner',
  'app.import.replace': 'remplacer',
  'app.import.failTitle': 'Fichier illisible.',
  'app.import.failUnreadable':
    "Ce fichier n'est pas du JSON. Rien n'a été touché.",
  'app.import.failSchema':
    "Ce fichier n'a pas la forme d'un registre urge. Rien n'a été touché.",
  'app.import.failVersion':
    "Ce fichier vient d'une autre version du format. Rien n'a été touché.",

  // ————— application · ce qui vient de se passer —————
  'app.notice.saved': 'Inscrit, pas acheté.',
  'app.notice.savedBody': 'La question reviendra le {date} : y pensez-vous encore ?',
  'app.notice.answered.one': '{n} réponse enregistrée.',
  'app.notice.answered.other': '{n} réponses enregistrées.',
  'app.notice.answeredBody':
    "Le registre ne change pas d'ordre : seule la ligne du verdict est complétée.",
  'app.notice.removed': 'Ligne retirée.',
  'app.notice.removedBody':
    'Le registre ne garde aucune trace de ce qui en sort.',
  'app.notice.exported': 'Registre exporté.',
  'app.notice.exportedBody.one':
    '{n} ligne écrite dans un fichier JSON, sur cet appareil.',
  'app.notice.exportedBody.other':
    '{n} lignes écrites dans un fichier JSON, sur cet appareil.',
  'app.notice.shared': 'Registre envoyé.',
  'app.notice.sharedBody':
    "Le fichier est parti vers l'application que vous avez choisie. Le projet n'a aucun serveur pour le recevoir.",
  'app.notice.imported.one': '{n} ligne ajoutée.',
  'app.notice.imported.other': '{n} lignes ajoutées.',
  'app.notice.importedBody':
    'Les lignes déjà présentes ont été laissées telles quelles ; une réponse déjà donnée ne se remplace pas.',
  'app.notice.replaced': 'Registre remplacé.',
  'app.notice.replacedBody':
    'Le contenu du fichier a pris la place du registre précédent.',
  'app.notice.erased': 'Registre effacé.',
  'app.notice.erasedBody': "Il ne reste rien de ce qui était inscrit ici.",

  // ————— application · durées —————
  'app.days.one': '{n} jour',
  'app.days.other': '{n} jours',

  // ————— application · mise à jour —————
  'update.available': 'Une nouvelle version est prête.',
  'update.action': 'recharger',

  // ————— site · navigation —————
  'site.nav.home': 'présentation',
  'site.nav.about': 'à propos',
  'site.nav.changelog': 'notes de version',
  'site.nav.app': "l'application",
  'site.nav.source': 'code source',
  'site.nav.lang': 'EN',
  'site.nav.langAria': 'switch to English',

  // ————— site · pied de page —————
  'site.footer.project': 'projet',
  'site.footer.repo': 'dépôt',
  'site.footer.releases': 'versions',
  'site.footer.issues': 'signaler',
  'site.footer.about': 'à propos',
  'site.footer.changelog': 'notes de version',
  'site.footer.licence': 'licence',
  'site.footer.licenceName': 'AGPL-3.0-or-later',
  'site.footer.contribute': 'contribuer',
  'site.footer.licenceNote':
    'Logiciel libre. Toute version modifiée mise à disposition doit être publiée aux mêmes conditions.',
  'site.footer.legal': 'mentions',
  'site.footer.terms': "conditions d'utilisation",
  'site.footer.privacy': 'confidentialité',
  'site.footer.notice': 'mentions légales',
  'site.footer.contact': 'contact',
  'site.footer.version': 'version {version}',

  // ————— site · présentation —————
  'site.home.metaTitle': 'urge. — une envie, trente jours, une question',
  'site.home.metaDescription':
    "urge. inscrit ce à quoi vous renoncez, puis pose une seule question trente jours plus tard : y pensez-vous encore ? Local, hors ligne, sans compte.",
  'site.home.title': 'Une envie. Trente jours. Une question.',
  'site.home.lede':
    "urge. n'est pas une liste d'envies. On y inscrit ce à quoi on renonce, au moment où on y renonce. Trente jours plus tard, une seule question revient : y pensez-vous encore ?",
  'site.home.cta': "ouvrir l'application",
  'site.home.ctaNote': 'aucun compte · rien à installer · hors ligne',
  'site.home.demo': "voir un registre d'exemple",
  'site.home.demoNote':
    "L'exemple est calculé depuis aujourd'hui et n'écrit rien sur l'appareil.",
  'site.home.previewCaption': "l'application, en vrai, avec des données d'exemple",
  'site.home.app': "l'application",
  'site.home.appBody':
    "Un registre à gauche, ce qu'on regarde à droite. Sur un téléphone, un écran à la fois et la feuille d'inscription qui monte du bas.",
  'site.home.appHint.write': 'inscrire : un nom suffit, le reste est facultatif',
  'site.home.appHint.due': "une envie échue s'annonce en tête du registre",
  'site.home.appHint.answer': 'répondre : trois mots, une seule fois',
  'site.home.appHint.review': 'le bilan compte les réponses, pas les envies',
  'site.home.ready': 'Prêt à inscrire le premier renoncement ?',
  'site.home.readyNote': "Cela prend le temps d'écrire un nom.",
  'site.home.start': 'commencer',
  'site.home.loop': 'la boucle',
  'site.home.loop.renounce': 'renoncer',
  'site.home.loop.renounceBody':
    "Vous alliez acheter quelque chose, et vous ne le faites pas. C'est à ce moment-là, et seulement là, que la ligne s'écrit : un nom, éventuellement un prix, la phrase que vous vous êtes dite.",
  'site.home.loop.wait': 'attendre',
  'site.home.loop.waitBody':
    "Rien ne se passe pendant trente jours. Aucune relance, aucun compteur qui monte, aucun encouragement. Le registre reste là où vous l'avez laissé.",
  'site.home.loop.answer': 'répondre',
  'site.home.loop.answerBody':
    "Le trentième jour, la question revient avec votre phrase. Oublié, vaguement, toujours. Une seule réponse, définitive : c'est elle qui vaut quelque chose, pas le montant.",
  'site.home.rules': 'ce que urge. ne fait pas',
  'site.home.rule.wishlist': "aucune liste d'envies : on n'inscrit que ce à quoi on renonce",
  'site.home.rule.savings': "aucune économie affichée, aucun objectif d'épargne",
  'site.home.rule.price': 'aucun prix suivi, aucun lien vers une boutique',
  'site.home.rule.streak': 'aucune série, aucun score, aucun badge',
  'site.home.rule.account': 'aucun compte, aucune synchronisation, aucun partage',
  'site.home.rule.track': 'aucun traceur, aucune mesure, aucune publicité',
  'site.home.rulesNote':
    "Une envie à laquelle on tient encore n'est pas un échec. C'est un renseignement, et c'est tout ce que le registre prétend donner.",
  'site.home.fact.unit': 'unité',
  'site.home.fact.unitValue': 'un renoncement, une question, une réponse',
  'site.home.fact.answers': 'réponses',
  'site.home.fact.answersValue': 'oublié · vaguement · toujours',
  'site.home.fact.data': 'données',
  'site.home.fact.dataValue': 'localStorage, export et import urge.json',
  'site.home.fact.langs': 'langues',
  'site.home.fact.langsValue': 'français, anglais, ou celle du système',
  'site.home.fact.install': 'installation',
  'site.home.fact.installValue': 'application web, hors ligne une fois chargée',
  'site.home.fact.licence': 'licence',
  'site.home.fact.licenceValue': 'AGPL-3.0-or-later',

  // ————— site · à propos —————
  'site.about.metaTitle': 'à propos — urge.',
  'site.about.metaDescription':
    "Pourquoi urge. n'inscrit que les renoncements, pourquoi la question vient trente jours plus tard, et où vivent les données.",
  'site.about.title': 'Une question, posée au bon moment.',
  'site.about.lede':
    "urge. ne cherche pas à vous faire dépenser moins. Il cherche à savoir ce que vous vouliez vraiment, et la seule façon de le savoir est d'attendre.",
  'site.about.whyTitle': 'Pourquoi trente jours',
  'site.about.whyBody':
    "Une envie d'impulsion ne survit presque jamais à un mois. Posée le jour même, la question ne dit rien : tout paraît nécessaire au moment où on le désire. Trente jours plus tard, la réponse est nette, et elle se donne en un mot. Le délai se règle — quinze, trente ou soixante jours — mais il ne descend pas sous quinze jours : en deçà, on interroge encore l'envie plutôt que son souvenir.",
  'site.about.noTitle': "Pourquoi ce n'est pas une liste d'envies",
  'site.about.noBody':
    "Une liste d'objets désirés est une liste de courses différée : on y revient pour acheter. Ici, la ligne ne s'écrit qu'après le renoncement. Rien n'y attend d'être acheté, et l'application n'offre aucun moyen de dire « finalement, je l'ai pris » : un registre n'a pas à tenir le compte des rechutes.",
  'site.about.moneyTitle': "Pourquoi le total n'est pas une économie",
  'site.about.moneyBody':
    "La somme de ce que vous n'avez pas acheté existe dans le bilan : la cacher reviendrait à faire semblant qu'elle n'est pas calculable. Mais elle n'est jamais présentée comme un gain : l'argent non dépensé n'est pas de l'argent gagné, et une envie oubliée à quatre euros vous apprend autant qu'une à quatre cents.",
  'site.about.dataTitle': 'Où vivent les données',
  'site.about.dataBody':
    "Tout est dans le stockage local de votre navigateur, sous une seule clé, dans le format exact que produit l'export. Aucun compte, aucun serveur, aucune requête réseau à l'usage. Effacer les données du site supprime tout, définitivement. C'est ce que coûte l'absence de serveur. Exportez de temps en temps.",
  'site.about.familyTitle': 'La famille « . »',
  'site.about.familyBody':
    "urge. fait partie d'une famille de micro-applications qui partagent un même système : monospace, angles droits, deux gris et une encre, aucune illustration, aucune ombre, aucun emoji. Chacune fait une seule chose et refuse d'en faire deux.",
  'site.about.openTitle': 'Logiciel libre',
  'site.about.openBody':
    "Le code est publié sous AGPL-3.0-or-later. Vous pouvez l'utiliser, l'étudier, le modifier et le redistribuer ; toute version modifiée mise à disposition d'autrui doit l'être aux mêmes conditions, source comprise.",

  // ————— site · notes de version —————
  'site.changelog.metaTitle': 'notes de version — urge.',
  'site.changelog.metaDescription':
    'Ce qui a changé dans urge., version par version.',
  'site.changelog.title': 'notes de version',
  'site.changelog.lede':
    "Ce qui a changé, dit en clair. Les versions suivent le versionnage sémantique ; le journal complet est dans le dépôt.",
  'site.changelog.type.added': 'ajouté',
  'site.changelog.type.changed': 'changé',
  'site.changelog.type.fixed': 'corrigé',
  'site.changelog.type.performance': 'performance',

  // ————— site · conditions —————
  'site.legal.terms.metaTitle': "conditions d'utilisation — urge.",
  'site.legal.terms.metaDescription':
    "Les conditions d'utilisation de urge. : un logiciel libre, sans compte, fourni sans garantie.",
  'site.legal.terms.title': "conditions d'utilisation",
  'site.legal.terms.updated': 'à jour au {date}',
  'site.legal.terms.serviceTitle': 'Le service',
  'site.legal.terms.serviceBody':
    "urge. est une application web qui s'exécute entièrement dans votre navigateur. Il n'y a ni compte, ni inscription, ni abonnement, ni paiement. L'usage est libre et gratuit.",
  'site.legal.terms.dataTitle': 'Vos données',
  'site.legal.terms.dataBody':
    "Le registre est enregistré dans le stockage local de votre navigateur. Vous en êtes seul détenteur : personne d'autre n'y a accès, et le projet n'en conserve aucune copie. Sauvegardez-le par l'export.",
  'site.legal.terms.warrantyTitle': 'Garantie',
  'site.legal.terms.warrantyBody':
    "Le logiciel est fourni « en l'état », sans garantie d'aucune sorte. La perte de données consécutive à un effacement du stockage du navigateur, à une panne ou à une erreur du logiciel ne peut engager la responsabilité des auteurs.",
  'site.legal.terms.licenceTitle': 'Licence',
  'site.legal.terms.licenceBody':
    "Le code source est distribué sous licence AGPL-3.0-or-later. Le texte de la licence prévaut sur la présente page pour tout ce qui concerne vos droits sur le logiciel.",

  // ————— site · confidentialité —————
  'site.legal.privacy.metaTitle': 'confidentialité — urge.',
  'site.legal.privacy.metaDescription':
    "urge. ne collecte rien : aucun compte, aucun traceur, aucune requête réseau à l'usage.",
  'site.legal.privacy.title': 'confidentialité',
  'site.legal.privacy.updated': 'à jour au {date}',
  'site.legal.privacy.shortTitle': 'En une phrase',
  'site.legal.privacy.shortBody':
    "urge. ne collecte aucune donnée personnelle, n'utilise aucun traceur et n'envoie rien nulle part.",
  'site.legal.privacy.collectTitle': 'Ce qui est collecté',
  'site.legal.privacy.collectBody':
    "Rien. Pas de compte, pas de cookie de mesure, pas d'outil d'analyse, pas de publicité, pas de service tiers chargé à l'exécution. L'application ne fait aucune requête réseau une fois chargée.",
  'site.legal.privacy.storedTitle': 'Ce qui est enregistré',
  'site.legal.privacy.storedBody':
    "Le registre — les renoncements, leurs réponses et vos réglages — est écrit dans le stockage local de votre navigateur, sur votre appareil. Ce n'est pas un cookie et rien n'en est transmis. Vous pouvez tout exporter, puis tout effacer, depuis les réglages.",
  'site.legal.privacy.hostTitle': "L'hébergeur",
  'site.legal.privacy.hostBody':
    "Le site est hébergé par Vercel Inc., qui conserve des journaux techniques de connexion (adresse IP, agent utilisateur) pour la fourniture du service. Ces journaux échappent au projet, qui n'y a pas accès.",
  'site.legal.privacy.rightsTitle': 'Vos droits',
  'site.legal.privacy.rightsBody':
    "Aucune donnée n'étant collectée, il n'y a rien à consulter, rectifier ou supprimer auprès du projet. Vos données sont entre vos mains : l'export vous en donne une copie, l'effacement les supprime définitivement.",

  // ————— site · mentions légales —————
  'site.legal.notice.metaTitle': 'mentions légales — urge.',
  'site.legal.notice.metaDescription':
    'Éditeur, hébergeur et propriété intellectuelle du site urge.',
  'site.legal.notice.title': 'mentions légales',
  'site.legal.notice.editorTitle': 'Éditeur',
  'site.legal.notice.editorBody':
    'urge. est un projet personnel de logiciel libre, sans structure commerciale. Contact : {contact}.',
  'site.legal.notice.hostTitle': 'Hébergeur',
  'site.legal.notice.hostBody':
    'Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com.',
  'site.legal.notice.propertyTitle': 'Propriété intellectuelle',
  'site.legal.notice.propertyBody':
    "Le code source est publié sous licence AGPL-3.0-or-later. La typographie JetBrains Mono est distribuée sous licence SIL Open Font License 1.1.",

  // ————— site · page absente —————
  'site.notfound.metaTitle': 'page introuvable — urge.',
  'site.notfound.metaDescription': "Cette page n'existe pas.",
  'site.notfound.title': "Cette page n'existe pas.",
  'site.notfound.body':
    "Le lien est peut-être ancien, ou l'adresse mal recopiée. Le registre, lui, est toujours là.",
  'site.notfound.action': 'revenir à la présentation',
} as const

export type MessageKey = keyof typeof fr
