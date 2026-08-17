/** Réglages : la question, l'apparence, les données.
 *  Chaque ligne défile ses valeurs au clic ; le changement s'applique aussitôt. */

import { useRef, useState } from 'react'
import { Button } from '../../components/Button.tsx'
import { Confirm, Message } from '../../components/Feedback.tsx'
import {
  ActionRow,
  LinkRow,
  StaticRow,
  ToggleRow,
} from '../../components/ToggleRow.tsx'
import { useI18n } from '../../i18n/index.tsx'
import type { MessageKey } from '../../i18n/index.tsx'
import { downloadFile, parseFile, shareFile } from '../../lib/io.ts'
import { LICENCE_URL, REPO } from '../../lib/links.ts'
import { DELAYS } from '../../lib/types.ts'
import type { Entry, Settings as SettingsShape } from '../../lib/types.ts'
import { APP_VERSION } from '../../lib/version.ts'
import { useStore } from '../../state/store.tsx'
import { delayWords } from '../labels.ts'
import type { Notice } from './Register.tsx'

const THEMES = ['system', 'light', 'dark'] as const
const LANGS = ['system', 'fr', 'en'] as const
const ASKS = ['onOpen', 'onDemand'] as const
const PRICES = ['asked', 'never'] as const

const THEME_KEY: Record<SettingsShape['theme'], MessageKey> = {
  system: 'app.settings.themeSystem',
  light: 'app.settings.themeLight',
  dark: 'app.settings.themeDark',
}

const LANG_KEY: Record<SettingsShape['lang'], MessageKey> = {
  system: 'app.settings.langSystem',
  fr: 'app.settings.langFr',
  en: 'app.settings.langEn',
}

const ASK_KEY: Record<SettingsShape['ask'], MessageKey> = {
  onOpen: 'app.settings.askOnOpen',
  onDemand: 'app.settings.askOnDemand',
}

const PRICE_KEY: Record<SettingsShape['price'], MessageKey> = {
  asked: 'app.settings.priceAsked',
  never: 'app.settings.priceNever',
}

const FAIL_KEY = {
  unreadable: 'app.import.failUnreadable',
  schema: 'app.import.failSchema',
  version: 'app.import.failVersion',
} as const

type Pending =
  | { state: 'idle' }
  | { state: 'ready'; entries: Entry[] }
  | { state: 'error'; message: MessageKey }

/** La valeur suivante d'un cycle, en revenant au début après la dernière. */
function next<T>(values: readonly T[], current: T): T {
  const index = values.indexOf(current)
  return values[(index + 1) % values.length] as T
}

export function Settings({
  onNotice,
  onIntro,
}: {
  onNotice: (notice: Notice) => void
  onIntro: () => void
}) {
  const i18n = useI18n()
  const { t, tp } = i18n
  const store = useStore()
  const fileInput = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState<Pending>({ state: 'idle' })
  const [askErase, setAskErase] = useState(false)

  const { settings, entries } = store
  const count = entries.length
  const lines = tp('app.settings.lines', count)

  const reset = (): void => {
    setPending({ state: 'idle' })
    setAskErase(false)
  }

  const onExport = (): void => {
    downloadFile(store.file())
    onNotice({
      title: t('app.notice.exported'),
      body: tp('app.notice.exportedBody', count),
    })
  }

  const onSend = async (): Promise<void> => {
    const result = await shareFile(store.file())
    if (result === 'cancelled') return
    onNotice(
      result === 'shared'
        ? { title: t('app.notice.shared'), body: t('app.notice.sharedBody') }
        : {
            title: t('app.notice.exported'),
            body: tp('app.notice.exportedBody', count),
          },
    )
  }

  const onPickFile = async (file: File): Promise<void> => {
    const result = parseFile(await file.text())
    if (!result.ok) {
      setPending({ state: 'error', message: FAIL_KEY[result.reason] })
      return
    }
    setPending({ state: 'ready', entries: result.file.data.entries })
  }

  const onMerge = (incoming: Entry[]): void => {
    const added = store.mergeIncoming(incoming)
    reset()
    onNotice({
      title: tp('app.notice.imported', added),
      body: t('app.notice.importedBody'),
    })
  }

  const onReplace = (incoming: Entry[]): void => {
    store.replaceAll(incoming)
    reset()
    onNotice({
      title: t('app.notice.replaced'),
      body: t('app.notice.replacedBody'),
    })
  }

  return (
    <section className="panel" aria-label={t('app.settings.label')}>
      <h1 className="t-display">{t('app.settings.title')}</h1>

      <div className="panel__block">
        <p className="section-label">{t('app.settings.question')}</p>
        <div>
          <ToggleRow
            name={t('app.settings.delay')}
            value={delayWords(i18n, settings.delay)}
            ariaLabel={t('app.settings.delayAria', {
              value: delayWords(i18n, settings.delay),
            })}
            onCycle={() => {
              store.setSetting('delay', next(DELAYS, settings.delay))
              reset()
            }}
          />
          <ToggleRow
            name={t('app.settings.ask')}
            value={t(ASK_KEY[settings.ask])}
            ariaLabel={t('app.settings.askAria', {
              value: t(ASK_KEY[settings.ask]),
            })}
            onCycle={() => {
              store.setSetting('ask', next(ASKS, settings.ask))
              reset()
            }}
          />
          <ToggleRow
            name={t('app.settings.price')}
            value={t(PRICE_KEY[settings.price])}
            ariaLabel={t('app.settings.priceAria', {
              value: t(PRICE_KEY[settings.price]),
            })}
            onCycle={() => {
              store.setSetting('price', next(PRICES, settings.price))
              reset()
            }}
          />
        </div>
        <p className="t-meta t-muted">{t('app.settings.cycleNote')}</p>
        <p className="t-meta t-muted t-measure">{t('app.settings.delayNote')}</p>
      </div>

      <div className="panel__block">
        <p className="section-label">{t('app.settings.appearance')}</p>
        <div>
          <ToggleRow
            name={t('app.settings.theme')}
            value={t(THEME_KEY[settings.theme])}
            ariaLabel={t('app.settings.themeAria', {
              value: t(THEME_KEY[settings.theme]),
            })}
            onCycle={() => {
              store.setSetting('theme', next(THEMES, settings.theme))
              reset()
            }}
          />
          <ToggleRow
            name={t('app.settings.lang')}
            value={t(LANG_KEY[settings.lang])}
            ariaLabel={t('app.settings.langAria', {
              value: t(LANG_KEY[settings.lang]),
            })}
            onCycle={() => {
              store.setSetting('lang', next(LANGS, settings.lang))
              reset()
            }}
          />
        </div>
      </div>

      <div className="panel__block">
        <p className="section-label">{t('app.settings.data')}</p>
        <div>
          <ActionRow
            name={t('app.settings.export')}
            value={t('app.settings.exportValue')}
            onClick={onExport}
          />
          <ActionRow
            name={t('app.settings.send')}
            value={t('app.settings.sendValue')}
            onClick={() => {
              void onSend()
            }}
          />
          <ActionRow
            name={t('app.settings.import')}
            value={t('app.settings.importValue')}
            onClick={() => {
              reset()
              fileInput.current?.click()
            }}
          />
          <ActionRow
            name={t('app.settings.intro')}
            value={t('app.settings.introValue')}
            onClick={onIntro}
          />

          {askErase ? (
            <Confirm
              boxed
              title={t('app.settings.eraseTitle')}
              body={t('app.settings.eraseBody', { count: lines })}
            >
              <Button variant="quiet" onClick={() => setAskErase(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                variant="destructive"
                strong
                onClick={() => {
                  store.eraseAll()
                  setAskErase(false)
                  onNotice({
                    title: t('app.notice.erased'),
                    body: t('app.notice.erasedBody'),
                  })
                }}
              >
                {t('app.settings.eraseConfirm')}
              </Button>
            </Confirm>
          ) : (
            <ActionRow
              danger
              name={t('app.settings.erase')}
              value={lines}
              onClick={() => {
                setPending({ state: 'idle' })
                setAskErase(true)
              }}
            />
          )}
        </div>

        {/* Le sélecteur est hors flux : le bouton dessiné au-dessus est le
            seul chemin, et le rendu natif ne traverse jamais le thème. */}
        <input
          ref={fileInput}
          className="visually-hidden"
          type="file"
          accept="application/json,.json"
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (file) void onPickFile(file)
          }}
        />

        {pending.state === 'error' ? (
          <Message title={t('app.import.failTitle')} body={t(pending.message)} />
        ) : null}

        {pending.state === 'ready' ? (
          <Confirm
            boxed
            title={t('app.import.title')}
            body={tp('app.import.body', pending.entries.length)}
          >
            <Button variant="quiet" onClick={reset}>
              {t('common.cancel')}
            </Button>
            <Button variant="text" onClick={() => onMerge(pending.entries)}>
              {t('app.import.merge')}
            </Button>
            <Button
              variant="destructive"
              strong
              onClick={() => onReplace(pending.entries)}
            >
              {t('app.import.replace')}
            </Button>
          </Confirm>
        ) : null}
      </div>

      <div className="panel__block">
        <div>
          <StaticRow
            name={
              store.storageAvailable
                ? t('app.settings.where')
                : t('app.settings.storageOff')
            }
            value={
              store.storageAvailable
                ? t('app.settings.whereValue')
                : t('app.settings.storageOffValue')
            }
          />
          <StaticRow name={t('app.settings.version')} value={APP_VERSION} />
          {/* L'AGPL demande que le programme offre son code source depuis
              son interface : ces deux lignes sont cette offre. */}
          <LinkRow
            external
            name={t('app.settings.source')}
            value={t('app.settings.sourceValue')}
            to={REPO}
          />
          <LinkRow
            external
            name={t('app.settings.licence')}
            value={t('app.settings.licenceValue')}
            to={LICENCE_URL}
          />
        </div>
      </div>
    </section>
  )
}
