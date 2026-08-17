/** English dictionary — a typed mirror of fr.ts.
 *  A missing or extra key fails the build. */

import type { MessageKey } from './fr.ts'

export const en: Record<MessageKey, string> = {
  // ————— common —————
  'common.brand': 'urge.',
  'common.tagline': 'one thing. done well.',
  'common.close': 'close',
  'common.cancel': 'cancel',
  'common.skipToContent': 'skip to content',

  // ————— app · navigation —————
  'app.nav.register': 'register',
  'app.nav.review': 'review',
  'app.nav.settings': 'settings',
  'app.nav.label': 'sections',

  // ————— app · example mode —————
  'app.demo.label': 'example',
  'app.demo.note': 'nothing is written to this device',
  'app.demo.leave': 'open my register',
  'app.demo.entries': `wool jacket, second hand | vinted | It was exactly my size.
35 mm lens | digit-photo | To photograph people, not landscapes.
pasta machine | Vanves flea market | Winter Sundays.
meditation app, yearly plan | online | To sleep better without thinking about it.
portable speaker | currys | For the balcony, in summer.
second-hand desk chair | gumtree | My back, at the end of the day.
leather boots | shop on Redchurch Street | Mine have had two winters.
40 L travel bag | bellroy.com | Two weeks in Portugal in September.
filter coffee machine | maker's site | Three coffees a day, may as well make them well.
architect's lamp, second hand | gumtree | The light at my desk is bad in the evening.
loose-leaf tea box | counter on Rambuteau Street | To replace the afternoon coffee.
yoga mat | online | The Tuesday class I never went back to.
gravel bike | shop on Oberkampf Street | To get out of the city on Sundays without a car.
noise-cancelling headphones | amazon | The noise of the open-plan office, every morning.
hardback novel | the bookshop round the corner | Everyone was talking about it that week.
handheld console | game | The morning commute, forty minutes.`,

  // ————— app · first run —————
  'app.intro.count': '{n} of 3',
  'app.intro.skip': 'skip',
  'app.intro.next': 'next',
  'app.intro.open': 'open the register',
  'app.intro.label': 'first run',
  'app.intro.oneTitle': 'This is not a wishlist.',
  'app.intro.oneBody':
    'An urge is written down here the moment you give it up — never the moment it arrives. A list of things you want would be a shopping list in disguise.',
  'app.intro.twoTitle': 'Thirty days later, one question.',
  'app.intro.twoBody':
    'Do you still think about it? Three possible answers: forgotten, faintly, still. That answer, and nothing else, says something true.',
  'app.intro.threeTitle': 'Nothing leaves this device.',
  'app.intro.threeBody':
    'The register stays here. No account, no sync, no price tracking. The total exists, but it is never shown to you as a saving.',

  // ————— app · register —————
  'app.register.title': 'the register',
  'app.register.label': 'register',
  'app.register.order': 'most recent first',
  'app.register.add': '+ write down a refusal',
  'app.register.count.one': '{n} written · {pending}',
  'app.register.count.other': '{n} written · {pending}',
  'app.register.pending.one': '{n} awaiting a verdict',
  'app.register.pending.other': '{n} awaiting a verdict',
  'app.register.due': 'do you still think about it?',
  'app.register.dueCount.one': '{n} urge due',
  'app.register.dueCount.other': '{n} urges due',
  'app.register.gap.one': '{n} day with nothing written down',
  'app.register.gap.other': '{n} days with nothing written down',
  'app.register.hide': 'hide',
  'app.register.rowAria': '{name}, written down on {date}, {status}',

  // ————— app · empty state —————
  'app.empty.title': 'Nothing written down yet.',
  'app.empty.body':
    'Write down the next urge you give up on; the question comes {delay} later.',
  'app.empty.note': 'The register stays on this device.',

  // ————— app · statuses —————
  'app.status.forgotten': 'forgotten',
  'app.status.faint': 'faintly',
  'app.status.still': 'still',
  'app.status.due': 'to answer',
  'app.status.waiting': 'question on {date}',
  'app.status.judged': 'judged · {verdict}',
  'app.status.dueLong': 'question due',
  'app.status.pendingLong': 'awaiting a verdict',

  // ————— app · writing one down —————
  'app.capture.label': 'write down a refusal',
  'app.capture.heading': 'a refusal',
  'app.capture.name': 'What I am not buying',
  'app.capture.namePlaceholder': '35 mm lens',
  'app.capture.nameError': 'Name the thing: it is the only required field.',
  'app.capture.price': 'Price',
  'app.capture.pricePlaceholder': '429',
  'app.capture.where': 'Where',
  'app.capture.wherePlaceholder': 'digit-photo',
  'app.capture.why': 'Why I wanted it',
  'app.capture.whyPlaceholder': 'The reason, in one sentence.',
  'app.capture.hint': 'The question comes back on {date}.',
  'app.capture.save': 'write it down',

  // ————— app · the question —————
  'app.question.label': 'do you still think about it?',
  'app.question.heading': 'Do you still think about it?',
  'app.question.position': '{n} of {total}',
  'app.question.waiting.one': '{n} question waiting',
  'app.question.waiting.other': '{n} questions waiting',
  'app.question.askedOn': 'question of {date}',
  'app.question.renouncedOn': 'given up on {date}',
  'app.question.later': 'answer later',
  'app.question.once': 'one answer only, no going back',
  'app.question.forgotten': 'it had left my mind',
  'app.question.faint': 'it comes back sometimes',
  'app.question.still': 'I still want it',
  'app.question.answerAria': '{name}: {verdict}, {gloss}',

  // ————— app · nothing to answer —————
  'app.idle.title': 'No question waiting.',
  'app.idle.body':
    'An urge is written down the moment you give it up. {delay} later, urge. brings it back here and asks one question, only one: do you still think about it?',
  'app.idle.label': 'in short',
  'app.idle.next': 'next question',
  'app.idle.written': 'written down',
  'app.idle.judged': 'judged',
  'app.idle.waiting': 'waiting',
  'app.idle.none': '—',

  // ————— app · one urge in full —————
  'app.detail.label': 'urge in full',
  'app.detail.back': '← the register',
  'app.detail.price': 'price noted',
  'app.detail.noPrice': 'not asked for',
  'app.detail.where': 'where',
  'app.detail.nowhere': '—',
  'app.detail.written': 'written down on',
  'app.detail.ask': 'question asked on',
  'app.detail.askFuture': 'question due on',
  'app.detail.why': 'why I wanted it',
  'app.detail.noWhy': 'No reason written down.',
  'app.detail.timeline': 'timeline',
  'app.detail.stepWritten': 'written down — given up',
  'app.detail.stepAsked': 'question asked',
  'app.detail.stepComing': 'question to come',
  'app.detail.stepAnswer': 'answer — {verdict}',
  'app.detail.stepAnswerMeta': '{n} days after giving it up',
  'app.detail.stepNone': 'no answer',
  'app.detail.stepNoneDue': 'the question is waiting',
  'app.detail.stepNoneLater': 'the question comes on {date}',
  'app.detail.answerNow': 'answer now',
  'app.detail.remove': 'remove from the register',
  'app.detail.removeTitle': 'Remove “{name}”?',
  'app.detail.removeBody':
    'The line and its answer leave the register. The month is counted again.',
  'app.detail.removeConfirm': 'remove',

  // ————— app · review —————
  'app.review.label': 'review',
  'app.review.prevAria': 'previous month',
  'app.review.nextAria': 'next month',
  'app.review.thisMonth': 'this month',
  'app.review.backToMonth': 'back to {month}',
  'app.review.backHint': 'back to {month}',
  'app.review.answers': 'what you answered',
  'app.review.answered.one': 'of {n} answer this month',
  'app.review.answered.other': 'of {n} answers this month',
  'app.review.noAnswers': 'no question asked this month',
  'app.review.noFaint': 'nothing that comes back',
  'app.review.noStill': 'nothing that lasts {delay}',
  'app.review.example': '{name} · written down on {date}',
  'app.review.readingOne.one':
    '{n} answer out of {total} forgotten: the month cost no one anything.',
  'app.review.readingOne.other':
    '{n} answers out of {total} forgotten: the month cost no one anything.',
  'app.review.readingStill.one':
    '{n} out of {total} is still wanted. That is the one worth a second question.',
  'app.review.readingStill.other':
    '{n} out of {total} are still wanted. Those are the ones worth a second question.',
  'app.review.readingNone':
    'No question this month. The register is waiting, which is its normal state.',
  'app.review.register': 'the register this month',
  'app.review.written': 'refusals written down',
  'app.review.asked': 'questions asked',
  'app.review.pending': 'awaiting a verdict',
  'app.review.money': 'amounts, for the record',
  'app.review.monthMoney': 'written down this month',
  'app.review.allMoney': 'since the beginning',
  'app.review.stillMoney': 'of which still wanted',
  'app.review.moneyNote':
    'This total is not a saving. It is only the sum of what you did not buy, and it says nothing about what you really wanted.',
  'app.review.moneyHidden':
    'Prices are not asked for: nothing to total up, and that is quite all right.',

  // ————— app · settings —————
  'app.settings.title': 'settings',
  'app.settings.label': 'settings',
  'app.settings.question': 'the question',
  'app.settings.delay': 'delay before the question',
  'app.settings.delayAria': 'delay before the question: {value}, change',
  'app.settings.ask': 'ask the question',
  'app.settings.askAria': 'ask the question: {value}, change',
  'app.settings.askOnOpen': 'when I open the app',
  'app.settings.askOnDemand': 'when I ask for it',
  'app.settings.price': 'ask for the price',
  'app.settings.priceAria': 'ask for the price: {value}, change',
  'app.settings.priceAsked': 'yes',
  'app.settings.priceNever': 'never',
  'app.settings.cycleNote': 'A row changes on touch: the value cycles.',
  'app.settings.delayNote':
    'The delay applies to what you write down next; questions already promised keep their date.',
  'app.settings.appearance': 'appearance',
  'app.settings.theme': 'theme',
  'app.settings.themeAria': 'theme: {value}, change',
  'app.settings.themeSystem': 'system',
  'app.settings.themeLight': 'light',
  'app.settings.themeDark': 'dark',
  'app.settings.lang': 'language',
  'app.settings.langAria': 'language: {value}, change',
  'app.settings.langSystem': 'system',
  'app.settings.langFr': 'French',
  'app.settings.langEn': 'English',
  'app.settings.data': 'your data',
  'app.settings.export': 'export the register',
  'app.settings.exportValue': 'JSON file',
  'app.settings.send': 'send the register',
  'app.settings.sendValue': 'to an app',
  'app.settings.import': 'import a register',
  'app.settings.importValue': 'urge.json',
  'app.settings.intro': 'see the introduction again',
  'app.settings.introValue': 'three screens',
  'app.settings.erase': 'erase the register',
  'app.settings.eraseTitle': 'Erase the whole register?',
  'app.settings.eraseBody':
    '{count} and their answers will be erased from this device. Nothing can bring them back.',
  'app.settings.eraseConfirm': 'erase',
  'app.settings.lines.one': '{n} line',
  'app.settings.lines.other': '{n} lines',
  'app.settings.where': 'data',
  'app.settings.whereValue': 'on this device',
  'app.settings.storageOff': 'storage unavailable',
  'app.settings.storageOffValue': 'this session only',
  'app.settings.version': 'version',
  'app.settings.source': 'source code',
  'app.settings.sourceValue': 'github',
  'app.settings.licence': 'licence',
  'app.settings.licenceValue': 'AGPL-3.0-or-later',

  // ————— app · import —————
  'app.import.title': 'Register read.',
  'app.import.body.one':
    '{n} line in the file. Merging adds it to the register; replacing puts the file in its place.',
  'app.import.body.other':
    '{n} lines in the file. Merging adds them to the register; replacing puts the file in its place.',
  'app.import.merge': 'merge',
  'app.import.replace': 'replace',
  'app.import.failTitle': 'File unreadable.',
  'app.import.failUnreadable': 'This file is not JSON. Nothing was touched.',
  'app.import.failSchema':
    'This file does not have the shape of a urge register. Nothing was touched.',
  'app.import.failVersion':
    'This file comes from another version of the format. Nothing was touched.',

  // ————— app · what just happened —————
  'app.notice.saved': 'Written down, not bought.',
  'app.notice.savedBody':
    'The question comes back on {date}: do you still think about it?',
  'app.notice.answered.one': '{n} answer recorded.',
  'app.notice.answered.other': '{n} answers recorded.',
  'app.notice.answeredBody':
    'The register keeps its order: only the verdict line is filled in.',
  'app.notice.removed': 'Line removed.',
  'app.notice.removedBody': 'The register keeps no trace of what leaves it.',
  'app.notice.exported': 'Register exported.',
  'app.notice.exportedBody.one':
    '{n} line written to a JSON file, on this device.',
  'app.notice.exportedBody.other':
    '{n} lines written to a JSON file, on this device.',
  'app.notice.shared': 'Register sent.',
  'app.notice.sharedBody':
    'The file went to the app you picked. The project has no server to receive it.',
  'app.notice.imported.one': '{n} line added.',
  'app.notice.imported.other': '{n} lines added.',
  'app.notice.importedBody':
    'Lines already present were left as they were; an answer already given is never replaced.',
  'app.notice.replaced': 'Register replaced.',
  'app.notice.replacedBody':
    'The contents of the file took the place of the previous register.',
  'app.notice.erased': 'Register erased.',
  'app.notice.erasedBody': 'Nothing is left of what was written here.',

  // ————— app · durations —————
  'app.days.one': '{n} day',
  'app.days.other': '{n} days',

  // ————— app · update —————
  'update.available': 'A new version is ready.',
  'update.action': 'reload',

  // ————— site · navigation —————
  'site.nav.home': 'overview',
  'site.nav.about': 'about',
  'site.nav.changelog': 'changelog',
  'site.nav.app': 'the app',
  'site.nav.source': 'source code',
  'site.nav.lang': 'FR',
  'site.nav.langAria': 'passer en français',

  // ————— site · footer —————
  'site.footer.project': 'project',
  'site.footer.repo': 'repository',
  'site.footer.releases': 'releases',
  'site.footer.issues': 'report an issue',
  'site.footer.about': 'about',
  'site.footer.changelog': 'changelog',
  'site.footer.licence': 'licence',
  'site.footer.licenceName': 'AGPL-3.0-or-later',
  'site.footer.contribute': 'contribute',
  'site.footer.licenceNote':
    'Free software. Any modified version made available to others must be published under the same terms.',
  'site.footer.legal': 'legal',
  'site.footer.terms': 'terms of use',
  'site.footer.privacy': 'privacy',
  'site.footer.notice': 'legal notice',
  'site.footer.contact': 'contact',
  'site.footer.version': 'version {version}',

  // ————— site · overview —————
  'site.home.metaTitle': 'urge. — one urge, thirty days, one question',
  'site.home.metaDescription':
    'urge. writes down what you give up on, then asks a single question thirty days later: do you still think about it? Local, offline, no account.',
  'site.home.title': 'One urge. Thirty days. One question.',
  'site.home.lede':
    'urge. is not a wishlist. You write down what you give up on, at the moment you give it up. Thirty days later, one question comes back: do you still think about it?',
  'site.home.cta': 'open the app',
  'site.home.ctaNote': 'no account · nothing to install · works offline',
  'site.home.demo': 'see an example register',
  'site.home.demoNote':
    'The example is computed from today and writes nothing to the device.',
  'site.home.previewCaption': 'the real app, with example data',
  'site.home.app': 'the app',
  'site.home.appBody':
    'The register on the left, whatever you are looking at on the right. On a phone, one screen at a time, and the writing sheet comes up from the bottom.',
  'site.home.appHint.write': 'writing down: a name is enough, the rest is optional',
  'site.home.appHint.due': 'a due urge announces itself at the top of the register',
  'site.home.appHint.answer': 'answering: three words, once only',
  'site.home.appHint.review': 'the review counts answers, not urges',
  'site.home.ready': 'Ready to write down the first one?',
  'site.home.readyNote': 'It takes as long as writing a name.',
  'site.home.start': 'start',
  'site.home.loop': 'the loop',
  'site.home.loop.renounce': 'give it up',
  'site.home.loop.renounceBody':
    'You were about to buy something, and you do not. That is when the line is written, and only then: a name, perhaps a price, the sentence you told yourself.',
  'site.home.loop.wait': 'wait',
  'site.home.loop.waitBody':
    'Nothing happens for thirty days. No reminder, no counter going up, no encouragement. The register stays where you left it.',
  'site.home.loop.answer': 'answer',
  'site.home.loop.answerBody':
    'On the thirtieth day the question comes back, with your sentence. Forgotten, faintly, still. One answer, final: that is what is worth something, not the amount.',
  'site.home.rules': 'what urge. does not do',
  'site.home.rule.wishlist':
    'no wishlist: only what you give up on gets written down',
  'site.home.rule.savings': 'no savings shown, no savings goal',
  'site.home.rule.price': 'no price tracking, no link to any shop',
  'site.home.rule.streak': 'no streak, no score, no badge',
  'site.home.rule.account': 'no account, no sync, no sharing',
  'site.home.rule.track': 'no tracker, no analytics, no advertising',
  'site.home.rulesNote':
    'An urge you still want is not a failure. It is a piece of information, and that is all the register claims to give.',
  'site.home.fact.unit': 'unit',
  'site.home.fact.unitValue': 'one refusal, one question, one answer',
  'site.home.fact.answers': 'answers',
  'site.home.fact.answersValue': 'forgotten · faintly · still',
  'site.home.fact.data': 'data',
  'site.home.fact.dataValue': 'localStorage, urge.json export and import',
  'site.home.fact.langs': 'languages',
  'site.home.fact.langsValue': 'French, English, or your system language',
  'site.home.fact.install': 'install',
  'site.home.fact.installValue': 'progressive web app, offline once loaded',
  'site.home.fact.licence': 'licence',
  'site.home.fact.licenceValue': 'AGPL-3.0-or-later',

  // ————— site · about —————
  'site.about.metaTitle': 'about — urge.',
  'site.about.metaDescription':
    'Why urge. only writes down refusals, why the question comes thirty days later, and where the data lives.',
  'site.about.title': 'One question, asked at the right moment.',
  'site.about.lede':
    'urge. is not trying to make you spend less. It is trying to find out what you really wanted — and the only way to know is to wait.',
  'site.about.whyTitle': 'Why thirty days',
  'site.about.whyBody':
    'An impulse almost never survives a month. Asked on the day itself, the question says nothing: everything looks necessary the moment you want it. Thirty days later the answer is clear, and it comes in one word. The delay can be set — fifteen, thirty or sixty days — but it does not go below fifteen: any shorter and you are still questioning the urge, not the memory of it.',
  'site.about.noTitle': 'Why this is not a wishlist',
  'site.about.noBody':
    'A list of things you want is a deferred shopping list: you go back to it to buy. Here the line is only written after the refusal. Nothing in it is waiting to be bought, and the app offers no way to say “actually, I got it in the end” — that would turn a register into a regret.',
  'site.about.moneyTitle': 'Why the total is not a saving',
  'site.about.moneyBody':
    'The sum of what you did not buy is in the review, because hiding it would be coy. But it is never presented as a gain: money not spent is not money earned, and an urge forgotten at four pounds teaches you as much as one at four hundred.',
  'site.about.dataTitle': 'Where the data lives',
  'site.about.dataBody':
    'Everything is in your browser’s local storage, under a single key, in exactly the format the export produces. No account, no server, no network request in use. Clearing the site data deletes everything, permanently: that is the price of having no one to entrust it to. Export from time to time.',
  'site.about.familyTitle': 'The “.” family',
  'site.about.familyBody':
    'urge. belongs to a family of micro-apps sharing one system: monospace, right angles, two greys and an ink, no illustration, no shadow, no emoji. Each does one thing and refuses to do two.',
  'site.about.openTitle': 'Free software',
  'site.about.openBody':
    'The code is published under AGPL-3.0-or-later. You may use, study, modify and redistribute it; any modified version you make available to others must be available under the same terms, source included.',

  // ————— site · changelog —————
  'site.changelog.metaTitle': 'changelog — urge.',
  'site.changelog.metaDescription':
    'What changed in urge., version by version.',
  'site.changelog.title': 'changelog',
  'site.changelog.lede':
    'What changed, in plain words. Versions follow semantic versioning; the full log is in the repository.',
  'site.changelog.type.added': 'added',
  'site.changelog.type.changed': 'changed',
  'site.changelog.type.fixed': 'fixed',
  'site.changelog.type.performance': 'performance',

  // ————— site · terms —————
  'site.legal.terms.metaTitle': 'terms of use — urge.',
  'site.legal.terms.metaDescription':
    'Terms of use for urge.: free software, no account, provided without warranty.',
  'site.legal.terms.title': 'terms of use',
  'site.legal.terms.updated': 'current as of {date}',
  'site.legal.terms.serviceTitle': 'The service',
  'site.legal.terms.serviceBody':
    'urge. is a web application that runs entirely in your browser. There is no account, no sign-up, no subscription and no payment. Use is free.',
  'site.legal.terms.dataTitle': 'Your data',
  'site.legal.terms.dataBody':
    'The register is stored in your browser’s local storage. You alone hold it: no one else has access, and the project keeps no copy. Back it up through the export.',
  'site.legal.terms.warrantyTitle': 'Warranty',
  'site.legal.terms.warrantyBody':
    'The software is provided “as is”, without warranty of any kind. Loss of data following a clearing of browser storage, a failure or a bug in the software cannot engage the authors’ liability.',
  'site.legal.terms.licenceTitle': 'Licence',
  'site.legal.terms.licenceBody':
    'The source code is distributed under AGPL-3.0-or-later. The text of the licence prevails over this page for anything concerning your rights to the software.',

  // ————— site · privacy —————
  'site.legal.privacy.metaTitle': 'privacy — urge.',
  'site.legal.privacy.metaDescription':
    'urge. collects nothing: no account, no tracker, no network request in use.',
  'site.legal.privacy.title': 'privacy',
  'site.legal.privacy.updated': 'current as of {date}',
  'site.legal.privacy.shortTitle': 'In one sentence',
  'site.legal.privacy.shortBody':
    'urge. collects no personal data, uses no tracker and sends nothing anywhere.',
  'site.legal.privacy.collectTitle': 'What is collected',
  'site.legal.privacy.collectBody':
    'Nothing. No account, no measurement cookie, no analytics, no advertising, no third-party service loaded at runtime. The app makes no network request once loaded.',
  'site.legal.privacy.storedTitle': 'What is stored',
  'site.legal.privacy.storedBody':
    'The register — the refusals, their answers and your settings — is written to your browser’s local storage, on your device. It is not a cookie and none of it is transmitted. You can export everything, then erase everything, from the settings.',
  'site.legal.privacy.hostTitle': 'The host',
  'site.legal.privacy.hostBody':
    'The site is hosted by Vercel Inc., which keeps technical connection logs (IP address, user agent) to provide the service. Those logs are outside the project, which has no access to them.',
  'site.legal.privacy.rightsTitle': 'Your rights',
  'site.legal.privacy.rightsBody':
    'Since no data is collected, there is nothing to access, correct or delete with the project. Your data is in your hands: the export gives you a copy, erasing removes it for good.',

  // ————— site · legal notice —————
  'site.legal.notice.metaTitle': 'legal notice — urge.',
  'site.legal.notice.metaDescription':
    'Publisher, host and intellectual property of the urge. site.',
  'site.legal.notice.title': 'legal notice',
  'site.legal.notice.editorTitle': 'Publisher',
  'site.legal.notice.editorBody':
    'urge. is a personal free-software project, with no commercial entity behind it. Contact: {contact}.',
  'site.legal.notice.hostTitle': 'Host',
  'site.legal.notice.hostBody':
    'Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States — vercel.com.',
  'site.legal.notice.propertyTitle': 'Intellectual property',
  'site.legal.notice.propertyBody':
    'The source code is published under AGPL-3.0-or-later. The JetBrains Mono typeface is distributed under the SIL Open Font License 1.1.',

  // ————— site · missing page —————
  'site.notfound.metaTitle': 'page not found — urge.',
  'site.notfound.metaDescription': 'This page does not exist.',
  'site.notfound.title': 'This page does not exist.',
  'site.notfound.body':
    'The link may be old, or the address mistyped. The register, though, is still there.',
  'site.notfound.action': 'back to the overview',
}
