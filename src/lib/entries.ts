/** La logique du registre : inscrire, échoir, répondre, retirer, compter.
 *  Pur : ni React, ni DOM, ni horloge implicite — le jour est toujours
 *  passé en argument, ce qui rend chaque règle testable sans navigateur. */

import { addDaysISO, daysBetween, monthKey } from './format.ts'
import type { Delay, Entry, Verdict } from './types.ts'
import { NAME_MAX, PRICE_MAX, WHERE_MAX, WHY_MAX } from './types.ts'

/** Un identifiant local à l'appareil. `crypto.randomUUID` quand il existe,
 *  sinon une chaîne assez longue pour ne pas se répéter dans un registre
 *  personnel — ces identifiants ne sortent jamais de la machine. */
export function newId(): string {
  const c = globalThis.crypto
  if (c && typeof c.randomUUID === 'function') return c.randomUUID()
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function trimTo(value: string, max: number): string {
  return value.trim().slice(0, max)
}

/** Un prix saisi à la main. Tout ce qui n'est pas un nombre positif et
 *  fini vaut « pas de prix » : un registre sans montant reste un registre. */
export function parsePrice(input: string): number | null {
  const cleaned = input.replace(/[^\d]/g, '')
  if (!cleaned) return null
  const value = Number(cleaned)
  if (!Number.isFinite(value) || value <= 0) return null
  return Math.min(Math.round(value), PRICE_MAX)
}

export interface Draft {
  name: string
  price: string
  where: string
  why: string
}

export const EMPTY_DRAFT: Draft = { name: '', price: '', where: '', why: '' }

/** Inscrit un renoncement. La date de question est figée ici, et non
 *  recalculée à la lecture : c'est la promesse faite le jour même. */
export function createEntry(
  draft: Draft,
  today: string,
  delay: Delay,
  askPrice: boolean,
): Entry {
  return {
    id: newId(),
    name: trimTo(draft.name, NAME_MAX),
    price: askPrice ? parsePrice(draft.price) : null,
    where: trimTo(draft.where, WHERE_MAX),
    why: trimTo(draft.why, WHY_MAX),
    renouncedAt: today,
    askAt: addDaysISO(today, delay),
    verdict: null,
    answeredAt: null,
  }
}

/** Répondre est définitif : une ligne déjà jugée ne se rejuge pas.
 *  Le doute qu'on aurait à revenir dessus est justement ce que la question
 *  cherche à écarter. */
export function answerEntry(
  entries: Entry[],
  id: string,
  verdict: Verdict,
  today: string,
): Entry[] {
  return entries.map((entry) =>
    entry.id === id && entry.verdict === null
      ? { ...entry, verdict, answeredAt: today }
      : entry,
  )
}

export function removeEntry(entries: Entry[], id: string): Entry[] {
  return entries.filter((entry) => entry.id !== id)
}

/** Du plus récent au plus ancien. À date égale, l'ordre d'inscription est
 *  conservé — deux renoncements du même jour se lisent dans l'ordre où on
 *  les a écrits, le dernier en haut. */
export function sortByRenounced(entries: Entry[]): Entry[] {
  return entries
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => {
      if (a.entry.renouncedAt !== b.entry.renouncedAt) {
        return a.entry.renouncedAt < b.entry.renouncedAt ? 1 : -1
      }
      return b.index - a.index
    })
    .map((item) => item.entry)
}

export function isPending(entry: Entry): boolean {
  return entry.verdict === null
}

/** Échue : sans réponse, et le jour de la question est arrivé. */
export function isDue(entry: Entry, today: string): boolean {
  return entry.verdict === null && entry.askAt <= today
}

/** Les questions à poser, de la plus ancienne à la plus récente : on répond
 *  d'abord à ce qui attend depuis le plus longtemps. */
export function dueEntries(entries: Entry[], today: string): Entry[] {
  return entries
    .filter((entry) => isDue(entry, today))
    .sort((a, b) => (a.askAt === b.askAt ? 0 : a.askAt < b.askAt ? -1 : 1))
}

/** La prochaine question à venir — celle qui n'est pas encore échue. */
export function nextAsk(entries: Entry[], today: string): Entry | null {
  const upcoming = entries
    .filter((entry) => entry.verdict === null && entry.askAt > today)
    .sort((a, b) => (a.askAt === b.askAt ? 0 : a.askAt < b.askAt ? -1 : 1))
  return upcoming[0] ?? null
}

/** Le creux minimal qui vaut d'être signalé. En deçà, la ligne dirait ce
 *  que les dates disent déjà. */
export const GAP_MIN_DAYS = 4

export type RegisterRow =
  | { kind: 'gap'; id: string; days: number }
  | { kind: 'entry'; id: string; entry: Entry; first: boolean; last: boolean }

/** Le registre tel qu'il se lit : les lignes, et entre elles les silences.
 *
 *  Un creux n'est pas un vide à combler. « 12 jours sans rien inscrire »
 *  est une information du même ordre que les lignes qui l'entourent : ce
 *  sont douze jours où l'on n'a renoncé à rien — ou rien remarqué. */
export function buildRows(entries: Entry[]): RegisterRow[] {
  const sorted = sortByRenounced(entries)
  const rows: RegisterRow[] = []
  sorted.forEach((entry, index) => {
    const previous = sorted[index - 1]
    if (previous) {
      const gap = daysBetween(previous.renouncedAt, entry.renouncedAt) - 1
      if (gap >= GAP_MIN_DAYS) {
        rows.push({ kind: 'gap', id: `gap-${entry.id}`, days: gap })
      }
    }
    rows.push({
      kind: 'entry',
      id: entry.id,
      entry,
      first: index === 0,
      last: index === sorted.length - 1,
    })
  })
  return rows
}

export interface MonthStats {
  /** Réponses données ce mois-ci, tous verdicts confondus. */
  answered: number
  forgotten: number
  faint: number
  still: number
  /** Renoncements inscrits ce mois-ci. */
  written: number
  /** Questions encore sans réponse, tous mois confondus. */
  pending: number
  monthMoney: number
  allMoney: number
  stillMoney: number
  /** La première ligne « toujours » du mois, et la première « vaguement » :
   *  le bilan nomme un exemple plutôt que d'aligner un chiffre seul. */
  firstStill: Entry | null
  firstFaint: Entry | null
}

function money(entries: Entry[]): number {
  return entries.reduce((sum, entry) => sum + (entry.price ?? 0), 0)
}

/** Le bilan d'un mois. Les réponses sont comptées au jour où elles ont été
 *  données, pas au jour où la question était due : un mois compte ce qu'on
 *  y a jugé, pas ce qu'on aurait dû y juger. */
export function monthStats(entries: Entry[], key: string): MonthStats {
  const answered = sortByRenounced(
    entries.filter(
      (entry) => entry.answeredAt !== null && monthKey(entry.answeredAt) === key,
    ),
  )
  const written = entries.filter((entry) => monthKey(entry.renouncedAt) === key)
  const of = (verdict: Verdict): Entry[] =>
    answered.filter((entry) => entry.verdict === verdict)
  const still = of('still')
  const faint = of('faint')

  return {
    answered: answered.length,
    forgotten: of('forgotten').length,
    faint: faint.length,
    still: still.length,
    written: written.length,
    pending: entries.filter(isPending).length,
    monthMoney: money(written),
    allMoney: money(entries),
    stillMoney: money(entries.filter((entry) => entry.verdict === 'still')),
    firstStill: still[0] ?? null,
    firstFaint: faint[0] ?? null,
  }
}

/** Les mois qui ont quelque chose à montrer, du plus récent au plus ancien.
 *  Sert à savoir si une flèche du bilan mène quelque part. */
export function monthsWithActivity(entries: Entry[]): string[] {
  const keys = new Set<string>()
  for (const entry of entries) {
    keys.add(monthKey(entry.renouncedAt))
    if (entry.answeredAt) keys.add(monthKey(entry.answeredAt))
  }
  return [...keys].sort().reverse()
}
