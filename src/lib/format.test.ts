import { describe, expect, it } from 'vitest'
import {
  addDays,
  addDaysISO,
  addMonths,
  daysBetween,
  formatMoney,
  formatShortDate,
  isISODate,
  monthKey,
  parseISODate,
  toISODate,
} from './format.ts'

describe('parseISODate', () => {
  it('lit une date valide en heure locale', () => {
    const date = parseISODate('2026-08-14')
    expect(date?.getFullYear()).toBe(2026)
    expect(date?.getMonth()).toBe(7)
    expect(date?.getDate()).toBe(14)
  })

  it('refuse un jour qui n’existe pas', () => {
    // Sans contrôle, le 30 février se replierait sur le 2 mars.
    expect(parseISODate('2026-02-30')).toBeNull()
    expect(parseISODate('2026-13-01')).toBeNull()
    expect(parseISODate('14/08/2026')).toBeNull()
    expect(parseISODate('')).toBeNull()
  })
})

describe('toISODate', () => {
  it('ne passe jamais par UTC', () => {
    // 23 h locales : toISOString basculerait au lendemain à l'est de
    // Greenwich, et une envie inscrite le soir changerait de jour.
    const evening = new Date(2026, 7, 14, 23, 30)
    expect(toISODate(evening)).toBe('2026-08-14')
  })
})

describe('addDays', () => {
  it('franchit un mois et une année', () => {
    expect(addDaysISO('2026-08-14', 30)).toBe('2026-09-13')
    expect(addDaysISO('2026-12-20', 30)).toBe('2027-01-19')
  })

  it('compte en jours civils, pas en tranches de 24 heures', () => {
    const start = new Date(2026, 2, 28)
    expect(toISODate(addDays(start, 3))).toBe('2026-03-31')
  })
})

describe('daysBetween', () => {
  it('rend la différence en jours civils', () => {
    expect(daysBetween('2026-08-14', '2026-07-15')).toBe(30)
    expect(daysBetween('2026-08-14', '2026-08-14')).toBe(0)
    expect(daysBetween('2026-08-14', '2026-08-20')).toBe(-6)
  })

  it('ignore un changement d’heure', () => {
    // Le passage à l'heure d'été 2026 en Europe est le 29 mars.
    expect(daysBetween('2026-04-05', '2026-03-22')).toBe(14)
  })
})

describe('monthKey et addMonths', () => {
  it('donne le mois d’une date', () => {
    expect(monthKey('2026-08-14')).toBe('2026-08')
  })

  it('franchit l’année dans les deux sens', () => {
    expect(addMonths('2026-01', -1)).toBe('2025-12')
    expect(addMonths('2026-12', 1)).toBe('2027-01')
  })
})

describe('formatShortDate', () => {
  it('rend une colonne de largeur fixe', () => {
    expect(formatShortDate('2026-08-04')).toBe('04/08')
  })
})

describe('isISODate', () => {
  it('n’accepte que des chaînes de date', () => {
    expect(isISODate('2026-08-14')).toBe(true)
    expect(isISODate(20260814)).toBe(false)
    expect(isISODate(null)).toBe(false)
  })
})

describe('formatMoney', () => {
  it('ne montre aucune décimale', () => {
    expect(formatMoney(429, 'fr-FR')).not.toMatch(/[,.]\d\d/)
  })

  it('garde la même monnaie quelle que soit la langue', () => {
    // Passer l'interface en anglais ne convertit rien : un prix relevé en
    // euros reste un prix en euros.
    expect(formatMoney(429, 'en-GB')).toContain('€')
    expect(formatMoney(429, 'fr-FR')).toContain('€')
  })
})
