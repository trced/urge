/** Le bilan d'un mois : ce que vous avez répondu, puis ce que le registre
 *  a enregistré, puis les montants — dans cet ordre, et jamais l'inverse.
 *
 *  Les montants viennent en dernier parce qu'ils comptent le moins. Un
 *  bilan qui ouvre sur un total ferait de urge. un compteur d'économies,
 *  et l'économie n'est pas la question posée. */

import { PeriodNav } from '../../components/PeriodNav.tsx'
import { StatRow, SummaryRow } from '../../components/StatRow.tsx'
import { useI18n } from '../../i18n/index.tsx'
import type { Translator } from '../../i18n/index.tsx'
import { monthStats } from '../../lib/entries.ts'
import {
  addMonths,
  currentMonthKey,
  formatDayMonth,
  formatMonth,
  formatMonthName,
  formatMoney,
} from '../../lib/format.ts'
import type { Entry } from '../../lib/types.ts'
import { delayWords } from '../labels.ts'

export function Review({
  entries,
  month,
  delay,
  showMoney,
  onMonth,
  onOpen,
}: {
  entries: Entry[]
  month: string
  delay: number
  showMoney: boolean
  onMonth: (key: string) => void
  onOpen: (id: string) => void
}) {
  const i18n = useI18n()
  const { t, tp, locale } = i18n
  const stats = monthStats(entries, month)
  const current = currentMonthKey()
  const isCurrent = month === current
  const { firstFaint, firstStill } = stats

  const example = (entry: Entry | null, fallback: string): string =>
    entry
      ? t('app.review.example', {
          name: entry.name,
          date: formatDayMonth(entry.renouncedAt, locale),
        })
      : fallback

  const context = stats.answered
    ? tp('app.review.answered', stats.answered)
    : t('app.review.noAnswers')

  return (
    <section className="panel" aria-label={t('app.review.label')}>
      <PeriodNav
        title={formatMonth(month, locale)}
        prevLabel={formatMonthName(addMonths(month, -1), locale)}
        nextLabel={formatMonthName(addMonths(month, 1), locale)}
        prevAria={t('app.review.prevAria')}
        nextAria={t('app.review.nextAria')}
        caption={
          isCurrent
            ? t('app.review.thisMonth')
            : t('app.review.backToMonth', {
                month: formatMonthName(current, locale),
              })
        }
        captionHint={t('app.review.backHint', {
          month: formatMonth(current, locale),
        })}
        onPrev={() => onMonth(addMonths(month, -1))}
        onNext={() => onMonth(addMonths(month, 1))}
        onToday={() => onMonth(current)}
      />

      <div className="panel__block">
        <p className="section-label section-label--strong">
          {t('app.review.answers')}
        </p>
        <ul className="list">
          <li className="list__item">
            <StatRow
              label={t('app.status.forgotten')}
              value={stats.answered ? String(stats.forgotten) : '—'}
              empty={stats.answered === 0}
              context={context}
            />
          </li>
          <li className="list__item">
            <StatRow
              label={t('app.status.faint')}
              value={stats.answered ? String(stats.faint) : '—'}
              empty={stats.answered === 0}
              context={example(firstFaint, t('app.review.noFaint'))}
              {...(firstFaint ? { onClick: () => onOpen(firstFaint.id) } : {})}
            />
          </li>
          <li className="list__item">
            <StatRow
              label={t('app.status.still')}
              value={stats.answered ? String(stats.still) : '—'}
              empty={stats.answered === 0}
              context={example(
                firstStill,
                t('app.review.noStill', { delay: delayWords(i18n, delay) }),
              )}
              {...(firstStill && showMoney && firstStill.price !== null
                ? { aside: formatMoney(firstStill.price, locale) }
                : {})}
              {...(firstStill ? { onClick: () => onOpen(firstStill.id) } : {})}
            />
          </li>
        </ul>
        <p className="t-meta t-muted">{reading(i18n, stats)}</p>
      </div>

      <div className="panel__block">
        <p className="section-label">{t('app.review.register')}</p>
        <SummaryRow
          label={t('app.review.written')}
          value={String(stats.written)}
        />
        <SummaryRow label={t('app.review.asked')} value={String(stats.answered)} />
        <SummaryRow
          label={t('app.review.pending')}
          value={String(stats.pending)}
        />
      </div>

      <div className="panel__block">
        <p className="section-label">{t('app.review.money')}</p>
        {showMoney ? (
          <>
            <SummaryRow
              label={t('app.review.monthMoney')}
              value={formatMoney(stats.monthMoney, locale)}
            />
            <SummaryRow
              label={t('app.review.allMoney')}
              value={formatMoney(stats.allMoney, locale)}
            />
            <SummaryRow
              label={t('app.review.stillMoney')}
              value={formatMoney(stats.stillMoney, locale)}
            />
            <p className="t-meta t-muted t-measure">{t('app.review.moneyNote')}</p>
          </>
        ) : (
          <p className="t-meta t-muted t-measure">{t('app.review.moneyHidden')}</p>
        )}
      </div>
    </section>
  )
}

/** La phrase sous les trois chiffres. Elle lit le mois, elle ne le note
 *  pas : « le mois n'a rien coûté à personne » est un constat, pas une
 *  félicitation, et « toujours » n'est jamais présenté comme un échec. */
function reading(
  { t, tp }: Pick<Translator, 't' | 'tp'>,
  stats: { answered: number; forgotten: number; still: number },
): string {
  if (stats.answered === 0) return t('app.review.readingNone')
  if (stats.still > 0) {
    return tp('app.review.readingStill', stats.still, { total: stats.answered })
  }
  return tp('app.review.readingOne', stats.forgotten, { total: stats.answered })
}
