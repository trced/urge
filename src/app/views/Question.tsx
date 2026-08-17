/** La question, et rien d'autre à l'écran.
 *
 *  Trois réponses, une seule fois. Pas de « je ne sais pas », pas de
 *  retour en arrière : une réponse qu'on peut reprendre est une réponse
 *  qu'on négocie, et c'est exactement ce que le délai de trente jours
 *  cherchait à écarter. */

import { Button } from '../../components/Button.tsx'
import { ActionRow } from '../../components/ToggleRow.tsx'
import { useI18n } from '../../i18n/index.tsx'
import { formatDate } from '../../lib/format.ts'
import type { Entry, Verdict } from '../../lib/types.ts'
import { entryMeta, verdictGloss, verdictWord } from '../labels.ts'

const ANSWERS: Verdict[] = ['forgotten', 'faint', 'still']

export function Question({
  entry,
  position,
  onAnswer,
  onLater,
}: {
  entry: Entry
  /** « 2 sur 5 » quand on répond à une file, le nombre en attente sinon. */
  position: string
  onAnswer: (verdict: Verdict) => void
  /** Absent quand la question s'est posée d'elle-même : il n'y a rien à
   *  reporter, elle attend déjà. */
  onLater?: (() => void) | undefined
}) {
  const { t, locale } = useI18n()
  const meta = entryMeta(entry, locale)

  return (
    <section className="question" aria-label={t('app.question.label')}>
      <div className="question__top">
        <div className="question__line">
          <p className="t-meta t-muted">{position}</p>
          <p className="t-meta t-muted">
            {t('app.question.askedOn', { date: formatDate(entry.askAt, locale) })}
          </p>
        </div>

        <div className="question__subject">
          <p className="t-meta t-muted">
            {t('app.question.renouncedOn', {
              date: formatDate(entry.renouncedAt, locale),
            })}
          </p>
          <h1 className="t-display">{entry.name}</h1>
          {meta ? <p className="t-data t-muted">{meta}</p> : null}
        </div>

        {/* La phrase du jour du renoncement, relue telle quelle. C'est
            elle qui rend la réponse possible : sans elle, on répond à un
            nom d'objet, pas à une envie. */}
        {entry.why ? (
          <p className="t-body t-measure t-dim">« {entry.why} »</p>
        ) : null}

        <p className="t-title">{t('app.question.heading')}</p>

        <div>
          {ANSWERS.map((verdict) => (
            <ActionRow
              key={verdict}
              name={verdictWord(t, verdict)}
              value={verdictGloss(t, verdict)}
              ariaLabel={t('app.question.answerAria', {
                name: entry.name,
                verdict: verdictWord(t, verdict),
                gloss: verdictGloss(t, verdict),
              })}
              onClick={() => onAnswer(verdict)}
            />
          ))}
        </div>
      </div>

      <div className="question__foot">
        {onLater ? (
          <Button variant="quiet" onClick={onLater}>
            {t('app.question.later')}
          </Button>
        ) : (
          <span />
        )}
        <p className="t-meta t-muted">{t('app.question.once')}</p>
      </div>
    </section>
  )
}
