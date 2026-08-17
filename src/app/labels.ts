/** Les mots que l'application emploie pour parler d'une ligne.
 *
 *  Ici plutôt que dans chaque vue : le registre, le détail et le bilan
 *  doivent dire « oublié » de la même façon, sinon deux écrans décrivent
 *  la même ligne avec deux vocabulaires. */

import type { Translator } from '../i18n/index.tsx'
import type { MessageKey } from '../i18n/index.tsx'
import { formatDate, formatMoney, formatShortDate } from '../lib/format.ts'
import { isDue } from '../lib/entries.ts'
import type { Entry, Verdict } from '../lib/types.ts'

const VERDICT_KEY: Record<Verdict, MessageKey> = {
  forgotten: 'app.status.forgotten',
  faint: 'app.status.faint',
  still: 'app.status.still',
}

const GLOSS_KEY: Record<Verdict, MessageKey> = {
  forgotten: 'app.question.forgotten',
  faint: 'app.question.faint',
  still: 'app.question.still',
}

export function verdictWord(t: Translator['t'], verdict: Verdict): string {
  return t(VERDICT_KEY[verdict])
}

export function verdictGloss(t: Translator['t'], verdict: Verdict): string {
  return t(GLOSS_KEY[verdict])
}

/** Le mot de droite dans le registre : le verdict s'il existe, sinon
 *  l'attente — « à répondre » quand le jour est venu, la date sinon. */
export function statusWord(
  { t }: Pick<Translator, 't'>,
  entry: Entry,
  today: string,
): string {
  if (entry.verdict) return verdictWord(t, entry.verdict)
  if (isDue(entry, today)) return t('app.status.due')
  return t('app.status.waiting', { date: formatShortDate(entry.askAt) })
}

/** Le même état, en toutes lettres : pour un nom accessible et pour la
 *  ligne d'en-tête du détail, où il n'y a pas de colonne pour l'abréger. */
export function statusPhrase(
  { t }: Pick<Translator, 't'>,
  entry: Entry,
  today: string,
  locale: string,
): string {
  if (entry.verdict) {
    return t('app.status.judged', { verdict: verdictWord(t, entry.verdict) })
  }
  if (isDue(entry, today)) return t('app.status.dueLong')
  return `${t('app.status.pendingLong')} · ${formatDate(entry.askAt, locale)}`
}

/** « trente jours » — le délai dit en mots, pour les phrases qui le
 *  citent. Le nombre seul se lirait comme une donnée, pas comme un délai. */
export function delayWords({ tp }: Pick<Translator, 'tp'>, delay: number): string {
  return tp('app.days', delay)
}

/** « 429 € · digit-photo » — la seconde ligne d'une entrée dans le
 *  registre. Ce qui manque disparaît plutôt que de laisser un séparateur
 *  orphelin. */
export function entryMeta(entry: Entry, locale: string): string {
  const bits: string[] = []
  if (entry.price !== null) bits.push(formatMoney(entry.price, locale))
  if (entry.where) bits.push(entry.where)
  return bits.join(' · ')
}
