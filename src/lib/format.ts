/** Dates et montants. Tout est stocké en AAAA-MM-JJ et manipulé en heure
 *  locale : une envie inscrite le 12 août reste du 12 août quel que soit
 *  le fuseau.
 *
 *  Aucune date n'est produite par toISOString — qui bascule en UTC et
 *  décale d'un jour partout à l'est de Greenwich après 22 h. */

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/

export function toISODate(date: Date): string {
  const y = String(date.getFullYear()).padStart(4, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Rejette autant les formats invalides que les dates qui n'existent pas :
 *  « 2026-02-30 » se replierait sur le 2 mars sans ce contrôle. */
export function parseISODate(iso: string): Date | null {
  const match = ISO.exec(String(iso ?? ''))
  if (!match) return null
  const [, y, m, d] = match
  const year = Number(y)
  const month = Number(m)
  const day = Number(d)
  if (month < 1 || month > 12 || day < 1 || day > 31) return null
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

export function isISODate(value: unknown): value is string {
  return typeof value === 'string' && parseISODate(value) !== null
}

/** Décalage en jours. Passe par les composants plutôt que par les
 *  millisecondes : un changement d'heure ne fait ni sauter ni répéter un jour. */
export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

/** Le même décalage, d'une date ISO à une autre. */
export function addDaysISO(iso: string, days: number): string {
  const date = parseISODate(iso)
  if (!date) return iso
  return toISODate(addDays(date, days))
}

/** Différence en jours entre deux dates ISO, `a` moins `b`.
 *  Compte des jours civils, pas des tranches de 24 heures. */
export function daysBetween(a: string, b: string): number {
  const from = parseISODate(a)
  const to = parseISODate(b)
  if (!from || !to) return 0
  const utcA = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  const utcB = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.round((utcA - utcB) / 86400000)
}

export function todayISO(): string {
  return toISODate(new Date())
}

/** Comparaison de jours civils, sans passer par Date. Les chaînes ISO se
 *  trient lexicalement, ce qui est exactement l'ordre chronologique. */
export function isOnOrBefore(a: string, b: string): boolean {
  return a <= b
}

/** Le mois d'une date ISO, sous la forme « AAAA-MM » — la clé du bilan. */
export function monthKey(iso: string): string {
  return iso.slice(0, 7)
}

/** Décale un mois « AAAA-MM » de n mois, en restant sur le 1er. */
export function addMonths(key: string, months: number): string {
  const year = Number(key.slice(0, 4))
  const month = Number(key.slice(5, 7)) - 1
  const date = new Date(year, month + months, 1)
  return `${String(date.getFullYear()).padStart(4, '0')}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}`
}

export function currentMonthKey(): string {
  return monthKey(todayISO())
}

/** « 12 août 2026 » — la forme longue, pour les noms accessibles et les
 *  phrases qui portent une promesse. */
export function formatDate(iso: string, locale: string): string {
  const date = parseISODate(iso)
  if (!date) return iso
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** « 12 août » — quand l'année est déjà donnée par le contexte. */
export function formatDayMonth(iso: string, locale: string): string {
  const date = parseISODate(iso)
  if (!date) return iso
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
  }).format(date)
}

/** « 12/08 » — la colonne de clé du registre, alignée sur cinq caractères. */
export function formatShortDate(iso: string): string {
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}`
}

/** « août 2026 » — le titre du bilan. */
export function formatMonth(key: string, locale: string): string {
  const year = Number(key.slice(0, 4))
  const month = Number(key.slice(5, 7)) - 1
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month, 1))
}

/** « août » seul — les deux côtés de la navigation par mois. */
export function formatMonthName(key: string, locale: string): string {
  const year = Number(key.slice(0, 4))
  const month = Number(key.slice(5, 7)) - 1
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(
    new Date(year, month, 1),
  )
}

/** La monnaie du registre. Une seule, et elle ne suit pas la langue :
 *  passer l'interface en anglais ne convertit rien, et un prix relevé en
 *  euros reste un prix en euros. */
export const CURRENCY = 'EUR'

/** Un montant. Jamais de décimale : ce total n'est pas une comptabilité,
 *  et le centime lui donnerait un sérieux qu'il ne mérite pas. */
export function formatMoney(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount)
}
