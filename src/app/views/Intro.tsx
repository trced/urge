/** Premier lancement : trois écrans, et la porte de sortie sur chacun.
 *
 *  Ils disent ce que l'application refuse de faire avant de dire ce
 *  qu'elle fait — c'est le refus qui explique la mécanique, et quelqu'un
 *  qui prend urge. pour une liste d'envies s'en irait déçu au bout d'une
 *  semaine. */

import { useState } from 'react'
import { Button } from '../../components/Button.tsx'
import { useI18n } from '../../i18n/index.tsx'
import type { MessageKey } from '../../i18n/index.tsx'

const STEPS: [MessageKey, MessageKey][] = [
  ['app.intro.oneTitle', 'app.intro.oneBody'],
  ['app.intro.twoTitle', 'app.intro.twoBody'],
  ['app.intro.threeTitle', 'app.intro.threeBody'],
]

export function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useI18n()
  const [step, setStep] = useState(0)
  const last = step === STEPS.length - 1
  const [title, body] = STEPS[step] ?? STEPS[0]!

  return (
    <section className="intro" aria-label={t('app.intro.label')}>
      <p className="t-brand">{t('common.brand')}</p>

      <div className="intro__body">
        <p className="t-meta t-muted">{t('app.intro.count', { n: step + 1 })}</p>
        <div className="intro__step">
          <h1 className="t-display">{t(title)}</h1>
          <p className="t-body t-measure t-dim">{t(body)}</p>
        </div>
      </div>

      <div className="intro__actions">
        <Button variant="quiet" onClick={onDone}>
          {t('app.intro.skip')}
        </Button>
        <Button
          variant="primary"
          onClick={() => (last ? onDone() : setStep(step + 1))}
        >
          {last ? t('app.intro.open') : t('app.intro.next')}
        </Button>
      </div>
    </section>
  )
}
