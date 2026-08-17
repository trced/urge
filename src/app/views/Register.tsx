/** Le registre : ce qu'on a inscrit, du plus récent au plus ancien, et
 *  entre les lignes les jours où l'on n'a rien inscrit.
 *
 *  Il ne se réordonne jamais. Répondre complète la colonne du verdict et
 *  ne déplace rien : une ligne se retrouve là où on l'avait laissée. */

import { Button } from '../../components/Button.tsx'
import { EmptyState, Message } from '../../components/Feedback.tsx'
import { GapRow, ListRow } from '../../components/ListRow.tsx'
import { ActionRow } from '../../components/ToggleRow.tsx'
import { useI18n } from '../../i18n/index.tsx'
import { buildRows, dueEntries } from '../../lib/entries.ts'
import { formatDate, formatShortDate } from '../../lib/format.ts'
import type { Entry } from '../../lib/types.ts'
import { delayWords, entryMeta, statusWord } from '../labels.ts'

export interface Notice {
  title: string
  body: string
}

export function Register({
  entries,
  today,
  delay,
  selectedId,
  notice,
  onDismissNotice,
  onOpenQuestion,
  onOpen,
  onAdd,
}: {
  entries: Entry[]
  today: string
  delay: number
  selectedId: string | null
  notice: Notice | null
  onDismissNotice: () => void
  onOpenQuestion: () => void
  onOpen: (id: string) => void
  onAdd: () => void
}) {
  const i18n = useI18n()
  const { t, tp, locale } = i18n
  const due = dueEntries(entries, today)
  const rows = buildRows(entries)
  const pending = entries.filter((entry) => entry.verdict === null).length

  return (
    <section className="register" aria-label={t('app.register.label')}>
      <div className="register__head">
        <h1 className="t-display">{t('app.register.title')}</h1>
        <p className="t-meta t-muted">
          {tp('app.register.count', entries.length, {
            pending: tp('app.register.pending', pending),
          })}
        </p>
      </div>

      <div className="register__scroll">
        {notice ? (
          <div className="register__notice">
            <Message tone="neutral" title={notice.title} body={notice.body} />
            <div className="register__notice-action">
              <Button variant="quiet" onClick={onDismissNotice}>
                {t('app.register.hide')}
              </Button>
            </div>
          </div>
        ) : null}

        {due.length > 0 ? (
          <div className="register__due">
            <ActionRow
              name={t('app.register.due')}
              value={tp('app.register.dueCount', due.length)}
              onClick={onOpenQuestion}
            />
          </div>
        ) : null}

        <div className="register__list">
          {entries.length === 0 ? (
            <EmptyState
              title={t('app.empty.title')}
              body={t('app.empty.body', { delay: delayWords(i18n, delay) })}
              note={t('app.empty.note')}
            />
          ) : (
            <div>
              <p className="section-label">{t('app.register.order')}</p>
              <ul className="list">
                {rows.map((row) =>
                  row.kind === 'gap' ? (
                    <li key={row.id} className="list__item">
                      <GapRow label={tp('app.register.gap', row.days)} />
                    </li>
                  ) : (
                    <li key={row.id} className="list__item">
                      <ListRow
                        rowKey={formatShortDate(row.entry.renouncedAt)}
                        marker={{
                          dot: true,
                          lineUp: !row.first,
                          lineDown: !row.last,
                        }}
                        title={row.entry.name}
                        meta={entryMeta(row.entry, locale)}
                        extra={
                          <span className="t-meta t-muted">
                            {statusWord(i18n, row.entry, today)}
                          </span>
                        }
                        selected={selectedId === row.entry.id}
                        ariaLabel={t('app.register.rowAria', {
                          name: row.entry.name,
                          date: formatDate(row.entry.renouncedAt, locale),
                          status: statusWord(i18n, row.entry, today),
                        })}
                        onClick={() => onOpen(row.entry.id)}
                      />
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="register__foot">
        <Button variant="primary" block onClick={onAdd}>
          {t('app.register.add')}
        </Button>
      </div>
    </section>
  )
}
