/** Ce que le panneau montre quand il n'y a aucune question à poser.
 *
 *  Ni félicitations, ni encouragement : quelques nombres et la règle du
 *  jeu. L'état normal de urge. est d'attendre, et un écran vide qui dit
 *  « bravo » ferait de l'attente un accomplissement. */

import { SummaryRow } from '../../components/StatRow.tsx'
import { useI18n } from '../../i18n/index.tsx'
import { formatDayMonth } from '../../lib/format.ts'
import { nextAsk } from '../../lib/entries.ts'
import type { Entry } from '../../lib/types.ts'
import { delayWords } from '../labels.ts'

export function Idle({
  entries,
  today,
  delay,
}: {
  entries: Entry[]
  today: string
  delay: number
}) {
  const i18n = useI18n()
  const { t, locale } = i18n
  const soon = nextAsk(entries, today)
  const judged = entries.filter((entry) => entry.verdict !== null).length

  return (
    <div className="idle">
      <div className="idle__text">
        <p className="t-body">{t('app.idle.title')}</p>
        <p className="t-body t-dim">
          {t('app.idle.body', { delay: delayWords(i18n, delay) })}
        </p>
      </div>

      <div className="idle__figures">
        <p className="section-label">{t('app.idle.label')}</p>
        <SummaryRow
          label={t('app.idle.next')}
          value={soon ? formatDayMonth(soon.askAt, locale) : t('app.idle.none')}
        />
        <SummaryRow label={t('app.idle.written')} value={String(entries.length)} />
        <SummaryRow label={t('app.idle.judged')} value={String(judged)} />
        <SummaryRow
          label={t('app.idle.waiting')}
          value={String(entries.length - judged)}
        />
      </div>
    </div>
  )
}
