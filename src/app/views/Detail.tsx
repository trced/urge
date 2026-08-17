/** Une envie en détail : ce qu'elle était, ce qu'on en a dit, et ce qui
 *  lui est arrivé.
 *
 *  Rien n'y est modifiable. Une ligne inscrite est un fait daté : la
 *  corriger reviendrait à réécrire ce qu'on pensait ce jour-là, et le
 *  registre n'aurait plus rien à apprendre à personne. Elle se retire,
 *  entièrement, ou elle reste telle quelle. */

import { Button } from '../../components/Button.tsx'
import { Confirm } from '../../components/Feedback.tsx'
import { ListRow } from '../../components/ListRow.tsx'
import { ActionRow, StaticRow } from '../../components/ToggleRow.tsx'
import { useI18n } from '../../i18n/index.tsx'
import { isDue } from '../../lib/entries.ts'
import {
  daysBetween,
  formatDate,
  formatMoney,
  formatShortDate,
} from '../../lib/format.ts'
import type { Entry } from '../../lib/types.ts'
import { statusPhrase, verdictWord } from '../labels.ts'

export function Detail({
  entry,
  today,
  askPrice,
  askDelete,
  onBack,
  onAnswerNow,
  onWantDelete,
  onCancelDelete,
  onDelete,
}: {
  entry: Entry
  today: string
  askPrice: boolean
  askDelete: boolean
  onBack: () => void
  onAnswerNow: () => void
  onWantDelete: () => void
  onCancelDelete: () => void
  onDelete: () => void
}) {
  const i18n = useI18n()
  const { t, locale } = i18n
  const due = isDue(entry, today)
  const asked = entry.askAt <= today

  return (
    <section className="panel" aria-label={t('app.detail.label')}>
      <Button variant="quiet" onClick={onBack}>
        {t('app.detail.back')}
      </Button>

      <div className="panel__head">
        <p className="t-meta t-muted">{statusPhrase(i18n, entry, today, locale)}</p>
        <h1 className="t-title">{entry.name}</h1>
      </div>

      <div>
        <StaticRow
          name={t('app.detail.price')}
          value={
            entry.price === null
              ? askPrice
                ? t('app.detail.nowhere')
                : t('app.detail.noPrice')
              : formatMoney(entry.price, locale)
          }
        />
        <StaticRow
          name={t('app.detail.where')}
          value={entry.where || t('app.detail.nowhere')}
        />
        <StaticRow
          name={t('app.detail.written')}
          value={formatDate(entry.renouncedAt, locale)}
        />
        <StaticRow
          name={asked ? t('app.detail.ask') : t('app.detail.askFuture')}
          value={formatDate(entry.askAt, locale)}
        />
      </div>

      <div className="panel__block">
        <p className="section-label">{t('app.detail.why')}</p>
        <p className="t-body t-measure t-dim">
          {entry.why || t('app.detail.noWhy')}
        </p>
      </div>

      <div className="panel__block">
        <p className="section-label">{t('app.detail.timeline')}</p>
        <ul className="list">
          <li className="list__item">
            <ListRow
              rowKey={formatShortDate(entry.renouncedAt)}
              marker={{ dot: true, lineDown: true }}
              title={t('app.detail.stepWritten')}
              meta={formatDate(entry.renouncedAt, locale)}
            />
          </li>
          <li className="list__item">
            <ListRow
              rowKey={formatShortDate(entry.askAt)}
              marker={{
                dot: asked,
                lineUp: true,
                lineDown: entry.verdict !== null,
              }}
              title={asked ? t('app.detail.stepAsked') : t('app.detail.stepComing')}
              meta={formatDate(entry.askAt, locale)}
            />
          </li>
          <li className="list__item">
            {entry.verdict !== null && entry.answeredAt !== null ? (
              <ListRow
                rowKey={formatShortDate(entry.answeredAt)}
                marker={{ dot: true, lineUp: true }}
                title={t('app.detail.stepAnswer', {
                  verdict: verdictWord(t, entry.verdict),
                })}
                meta={t('app.detail.stepAnswerMeta', {
                  n: daysBetween(entry.answeredAt, entry.renouncedAt),
                })}
              />
            ) : (
              <ListRow
                rowKey="—"
                marker={{ lineUp: true }}
                title={t('app.detail.stepNone')}
                meta={
                  due
                    ? t('app.detail.stepNoneDue')
                    : t('app.detail.stepNoneLater', {
                        date: formatDate(entry.askAt, locale),
                      })
                }
              />
            )}
          </li>
        </ul>
      </div>

      {due ? (
        <div>
          <ActionRow
            name={t('app.detail.answerNow')}
            value={t('app.question.label')}
            onClick={onAnswerNow}
          />
        </div>
      ) : null}

      <div>
        {askDelete ? (
          <Confirm
            title={t('app.detail.removeTitle', { name: entry.name })}
            body={t('app.detail.removeBody')}
          >
            <Button variant="quiet" onClick={onCancelDelete}>
              {t('common.cancel')}
            </Button>
            <Button variant="destructive" strong onClick={onDelete}>
              {t('app.detail.removeConfirm')}
            </Button>
          </Confirm>
        ) : (
          <Button variant="destructive" onClick={onWantDelete}>
            {t('app.detail.remove')}
          </Button>
        )}
      </div>
    </section>
  )
}
