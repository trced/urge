/** Page de présentation : la promesse, les faits, la boucle, l'application
 *  elle-même, ce qu'elle refuse, puis une seule action.
 *  Aucune image, aucun dégradé — texte, ligne, point, espace. */

import { Link } from 'react-router'
import { UrgeApp } from '../app/UrgeApp.tsx'
import { useMediaQuery } from '../app/useMediaQuery.ts'
import { useI18n } from '../i18n/index.tsx'
import type { MessageKey } from '../i18n/index.tsx'
import { DemoStoreProvider } from '../state/store.tsx'
import { useDocumentMeta } from './SiteLayout.tsx'

const FACTS: [MessageKey, MessageKey][] = [
  ['site.home.fact.unit', 'site.home.fact.unitValue'],
  ['site.home.fact.answers', 'site.home.fact.answersValue'],
  ['site.home.fact.data', 'site.home.fact.dataValue'],
  ['site.home.fact.langs', 'site.home.fact.langsValue'],
  ['site.home.fact.install', 'site.home.fact.installValue'],
  ['site.home.fact.licence', 'site.home.fact.licenceValue'],
]

const LOOP: [MessageKey, MessageKey][] = [
  ['site.home.loop.renounce', 'site.home.loop.renounceBody'],
  ['site.home.loop.wait', 'site.home.loop.waitBody'],
  ['site.home.loop.answer', 'site.home.loop.answerBody'],
]

const HINTS: MessageKey[] = [
  'site.home.appHint.write',
  'site.home.appHint.due',
  'site.home.appHint.answer',
  'site.home.appHint.review',
]

const REFUSALS: MessageKey[] = [
  'site.home.rule.wishlist',
  'site.home.rule.savings',
  'site.home.rule.price',
  'site.home.rule.streak',
  'site.home.rule.account',
  'site.home.rule.track',
]

/** L'encart mesure 390 × 844 : en dessous de cette largeur, c'est un
 *  téléphone dans un téléphone. Il ne dit rien de plus que le lien vers
 *  l'exemple et il mange un écran entier — on ne le monte pas du tout. */
const SHOW_APP = '(min-width: 900px)'

export function HomePage() {
  useDocumentMeta('site.home.metaTitle', 'site.home.metaDescription')
  const { t } = useI18n()
  const showApp = useMediaQuery(SHOW_APP)

  return (
    <>
      {/* Sur grand écran, les faits passent en rail à droite de la promesse :
          la page occupe sa largeur sans jamais allonger une ligne de texte. */}
      <section className="site__lede site__lede--split">
        <div className="site__lede-text">
          <h1 className="site__h1">{t('site.home.title')}</h1>
          <p className="site__text">{t('site.home.lede')}</p>
          <div className="site__actions">
            <Link className="btn btn--primary" to="/app">
              {t('site.home.cta')}
            </Link>
            <Link className="btn btn--text" to="/app?demo=1">
              {t('site.home.demo')}
            </Link>
          </div>
          <p className="t-meta t-muted">{t('site.home.ctaNote')}</p>
        </div>
        <ul className="facts">
          {FACTS.map(([name, note]) => (
            <li key={name} className="facts__item">
              <div className="facts__name">{t(name)}</div>
              <div className="facts__note">{t(note)}</div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="section-label section-label--strong">
          {t('site.home.loop')}
        </h2>
        <ol>
          {LOOP.map(([name, body], index) => (
            <li key={name} className="numbered__item">
              <span className="numbered__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="numbered__stack">
                <strong className="numbered__name">{t(name)}</strong>
                <span className="numbered__body">{t(body)}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="section-label section-label--strong">
          {t('site.home.app')}
        </h2>
        <div className="showcase">
          {showApp ? (
            <div className="showcase__frame">
              <DemoStoreProvider text={t('app.demo.entries')}>
                <UrgeApp embedded />
              </DemoStoreProvider>
              <span className="t-meta t-muted">
                {t('site.home.previewCaption')}
              </span>
            </div>
          ) : null}
          <div className="showcase__aside">
            <p className="site__text t-data">{t('site.home.appBody')}</p>
            {/* Les repères décrivent des gestes dans le cadre : sans cadre,
                c'est le lien vers l'exemple qui les remplace. */}
            {showApp ? (
              <ul className="showcase__hints">
                {HINTS.map((hint) => (
                  <li key={hint}>{t(hint)}</li>
                ))}
              </ul>
            ) : (
              <Link className="btn btn--text" to="/app?demo=1">
                {t('site.home.demo')}
              </Link>
            )}
            <p className="t-meta t-muted">{t('site.home.demoNote')}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-label section-label--strong">
          {t('site.home.rules')}
        </h2>
        <ul className="refusals">
          {REFUSALS.map((item) => (
            <li key={item} className="refusals__item">
              <span className="refusals__dash" aria-hidden="true">
                —
              </span>
              <span>{t(item)}</span>
            </li>
          ))}
        </ul>
        <p className="site__footer-note">{t('site.home.rulesNote')}</p>
      </section>

      <section className="closing">
        <div className="closing__text">
          <span className="t-body">{t('site.home.ready')}</span>
          <span className="t-meta t-muted">{t('site.home.readyNote')}</span>
        </div>
        <Link className="btn btn--primary" to="/app">
          {t('site.home.start')}
        </Link>
      </section>
    </>
  )
}
