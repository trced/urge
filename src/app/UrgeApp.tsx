/** urge. — l'application. On y inscrit ce à quoi on renonce ; trente jours
 *  plus tard elle pose une question, une seule, et enregistre la réponse.
 *
 *  Une logique, deux mises en page :
 *  — étroit : un écran à la fois. Le registre est la page, et la question,
 *    le détail, le bilan et les réglages la remplacent ;
 *  — large  : deux panneaux. Le registre à gauche ne bouge plus, et tout
 *    le reste s'ouvre à droite — y compris la question échue, que le
 *    panneau pose de lui-même quand il n'a rien d'autre à montrer.
 *
 *  Le seuil est à 900 px. En dessous, la colonne de droite prendrait moins
 *  de 380 px : une question y serait à l'étroit, et c'est la seule chose
 *  que cette application demande de lire sans distraction. */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { useI18n } from '../i18n/index.tsx'
import { createEntry, dueEntries } from '../lib/entries.ts'
import type { Draft } from '../lib/entries.ts'
import { currentMonthKey, formatDate, todayISO } from '../lib/format.ts'
import type { Entry, Verdict } from '../lib/types.ts'
import { useStore } from '../state/store.tsx'
import { useMediaQuery } from './useMediaQuery.ts'
import { CaptureSheet } from './sheets/CaptureSheet.tsx'
import { Detail } from './views/Detail.tsx'
import { Idle } from './views/Idle.tsx'
import { Intro } from './views/Intro.tsx'
import { Question } from './views/Question.tsx'
import { Register } from './views/Register.tsx'
import type { Notice } from './views/Register.tsx'
import { Review } from './views/Review.tsx'
import { Settings } from './views/Settings.tsx'

/** Au-delà, le registre et le panneau tiennent côte à côte. */
const WIDE = '(min-width: 900px)'

type Screen = 'register' | 'question' | 'detail' | 'review' | 'settings'

export function UrgeApp({ embedded = false }: { embedded?: boolean }) {
  const { t, tp, locale } = useI18n()
  const store = useStore()

  // L'encart de la page de présentation fait 390 px de large dans une
  // fenêtre qui en fait mille : il garde la coque du téléphone, c'est ce
  // qu'il montre.
  const wide = useMediaQuery(WIDE) && !embedded

  const today = useMemo(() => todayISO(), [])
  const [screen, setScreen] = useState<Screen>('register')
  const [intro, setIntro] = useState(() => !store.introSeen)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [queue, setQueue] = useState<string[]>([])
  const [qi, setQi] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [capture, setCapture] = useState(false)
  const [askDelete, setAskDelete] = useState(false)
  const [notice, setNotice] = useState<Notice | null>(null)
  const [month, setMonth] = useState(() => currentMonthKey())

  const { entries, settings } = store
  const due = useMemo(() => dueEntries(entries, today), [entries, today])

  useEffect(() => {
    if (embedded) return
    document.title = `${t('common.brand')} — ${t('site.home.title')}`
  }, [embedded, t])

  const startQueue = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return
      setQueue(ids)
      setQi(0)
      setAnswered(0)
      setNotice(null)
      if (!wide) setScreen('question')
    },
    [wide],
  )

  /** « à l'ouverture » : la question échue se pose d'elle-même, une fois,
   *  au démarrage. Sur écran large le panneau la posait déjà — la file
   *  n'ajoute que le compteur « 2 sur 5 » et le report explicite. */
  const [asked, setAsked] = useState(false)
  useEffect(() => {
    if (asked || intro || embedded) return
    setAsked(true)
    if (settings.ask !== 'onOpen') return
    startQueue(due.map((entry) => entry.id))
  }, [asked, intro, embedded, settings.ask, due, startQueue])

  /** La question à l'écran. En file, celle qu'on a atteinte ; sinon, sur
   *  écran large et depuis le registre, la plus ancienne échue — c'est le
   *  travail du panneau de droite, et il n'y a rien à demander pour cela. */
  const current: Entry | null = useMemo(() => {
    const id = queue[qi]
    if (id) return entries.find((entry) => entry.id === id) ?? null
    if (wide && screen === 'register') return due[0] ?? null
    return null
  }, [queue, qi, entries, wide, screen, due])

  const selected = selectedId
    ? (entries.find((entry) => entry.id === selectedId) ?? null)
    : null

  const goRegister = useCallback(() => {
    setScreen('register')
    setQueue([])
    setQi(0)
    setAskDelete(false)
  }, [])

  const onAnswer = (verdict: Verdict): void => {
    if (!current) return
    store.answer(current.id, verdict)

    // Hors file — la question que le panneau posait de lui-même — il n'y
    // a rien à enchaîner : la suivante prend la place, ou le panneau
    // retombe sur son état de repos.
    if (queue.length === 0) return

    const count = answered + 1
    if (qi + 1 < queue.length) {
      setQi(qi + 1)
      setAnswered(count)
      return
    }
    setQueue([])
    setQi(0)
    setAnswered(0)
    setScreen('register')
    setNotice({
      title: tp('app.notice.answered', count),
      body: t('app.notice.answeredBody'),
    })
  }

  const onSave = (draft: Draft): void => {
    const entry = createEntry(draft, today, settings.delay, settings.price === 'asked')
    store.addEntry(entry)
    setCapture(false)
    setScreen('register')
    setNotice({
      title: t('app.notice.saved'),
      body: t('app.notice.savedBody', {
        date: formatDate(entry.askAt, locale),
      }),
    })
  }

  const openDetail = (id: string): void => {
    setSelectedId(id)
    setScreen('detail')
    setAskDelete(false)
    setNotice(null)
  }

  if (intro) {
    return (
      <div className={shellClass(embedded, wide)}>
        <Intro
          onDone={() => {
            store.setIntroSeen(true)
            setIntro(false)
          }}
        />
      </div>
    )
  }

  const mainVisible = wide || screen === 'register'
  const asideVisible = wide || screen !== 'register'

  return (
    <div className={shellClass(embedded, wide)}>
      <header className="app__head">
        <span className="app__brand">{t('common.brand')}</span>
        <nav className="app__tabs" aria-label={t('app.nav.label')}>
          <Tab
            label={t('app.nav.register')}
            current={screen === 'register' || screen === 'detail' || screen === 'question'}
            onClick={goRegister}
          />
          <Tab
            label={t('app.nav.review')}
            current={screen === 'review'}
            onClick={() => {
              setScreen('review')
              setQueue([])
              setNotice(null)
            }}
          />
          <Tab
            label={t('app.nav.settings')}
            current={screen === 'settings'}
            onClick={() => {
              setScreen('settings')
              setQueue([])
              setNotice(null)
            }}
          />
        </nav>
      </header>

      {store.demo ? (
        <div className="app__demo">
          <span>
            {t('app.demo.label')} · {t('app.demo.note')}
          </span>
          <Link className="btn btn--quiet" to="/app">
            {t('app.demo.leave')}
          </Link>
        </div>
      ) : null}

      <div className="app__body">
        {mainVisible ? (
          <main className="app__list">
            <Register
              entries={entries}
              today={today}
              delay={settings.delay}
              selectedId={selectedId}
              notice={notice}
              onDismissNotice={() => setNotice(null)}
              onOpenQuestion={() => startQueue(due.map((entry) => entry.id))}
              onOpen={openDetail}
              onAdd={() => {
                setNotice(null)
                setCapture(true)
              }}
            />
          </main>
        ) : null}

        {asideVisible ? (
          <aside className="app__panel">
            {current && (screen === 'question' || (wide && screen === 'register')) ? (
              <Question
                entry={current}
                position={
                  queue.length > 0
                    ? t('app.question.position', {
                        n: qi + 1,
                        total: queue.length,
                      })
                    : tp('app.question.waiting', due.length)
                }
                onAnswer={onAnswer}
                {...(queue.length > 0 ? { onLater: goRegister } : {})}
              />
            ) : null}

            {screen === 'detail' && selected ? (
              <Detail
                entry={selected}
                today={today}
                askPrice={settings.price === 'asked'}
                askDelete={askDelete}
                onBack={goRegister}
                onAnswerNow={() => startQueue([selected.id])}
                onWantDelete={() => setAskDelete(true)}
                onCancelDelete={() => setAskDelete(false)}
                onDelete={() => {
                  store.removeEntry(selected.id)
                  setSelectedId(null)
                  setAskDelete(false)
                  setScreen('register')
                  setNotice({
                    title: t('app.notice.removed'),
                    body: t('app.notice.removedBody'),
                  })
                }}
              />
            ) : null}

            {screen === 'review' ? (
              <Review
                entries={entries}
                month={month}
                delay={settings.delay}
                showMoney={settings.price === 'asked'}
                onMonth={setMonth}
                onOpen={openDetail}
              />
            ) : null}

            {screen === 'settings' ? (
              <Settings
                onNotice={(next) => {
                  setNotice(next)
                  setScreen('register')
                }}
                onIntro={() => {
                  store.setIntroSeen(false)
                  setIntro(true)
                }}
              />
            ) : null}

            {wide && screen === 'register' && !current ? (
              <Idle entries={entries} today={today} delay={settings.delay} />
            ) : null}
          </aside>
        ) : null}

        {capture ? (
          <CaptureSheet
            today={today}
            delay={settings.delay}
            askPrice={settings.price === 'asked'}
            onSave={onSave}
            onClose={() => setCapture(false)}
          />
        ) : null}
      </div>
    </div>
  )
}

function shellClass(embedded: boolean, wide: boolean): string {
  return [
    'app',
    embedded ? 'app--embedded' : 'app--page',
    wide ? 'app--wide' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function Tab({
  label,
  current,
  onClick,
}: {
  label: string
  current: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="app__tab"
      onClick={onClick}
      {...(current ? { 'aria-current': 'page' as const } : {})}
    >
      {label}
    </button>
  )
}
