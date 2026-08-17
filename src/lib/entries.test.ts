import { describe, expect, it } from 'vitest'
import {
  answerEntry,
  buildRows,
  createEntry,
  dueEntries,
  isDue,
  monthStats,
  nextAsk,
  parsePrice,
  removeEntry,
  sortByRenounced,
} from './entries.ts'
import { PRICE_MAX } from './types.ts'
import type { Entry, Verdict } from './types.ts'

function entry(patch: Partial<Entry> & { id: string }): Entry {
  return {
    name: `envie ${patch.id}`,
    price: 100,
    where: 'en ligne',
    why: 'une raison',
    renouncedAt: '2026-07-01',
    askAt: '2026-07-31',
    verdict: null,
    answeredAt: null,
    ...patch,
  }
}

describe('parsePrice', () => {
  it('ne garde que les chiffres', () => {
    expect(parsePrice('429 €')).toBe(429)
    expect(parsePrice('1 190')).toBe(1190)
  })

  it('rend null pour ce qui n’est pas un montant', () => {
    expect(parsePrice('')).toBeNull()
    expect(parsePrice('gratuit')).toBeNull()
    expect(parsePrice('0')).toBeNull()
  })

  it('borne les saisies absurdes', () => {
    expect(parsePrice('9'.repeat(12))).toBe(PRICE_MAX)
  })
})

describe('createEntry', () => {
  const draft = { name: '  objectif 35 mm  ', price: '429', where: ' digit-photo ', why: '' }

  it('fige la date de la question à l’inscription', () => {
    const created = createEntry(draft, '2026-08-14', 30, true)
    expect(created.renouncedAt).toBe('2026-08-14')
    expect(created.askAt).toBe('2026-09-13')
    expect(created.verdict).toBeNull()
    expect(created.answeredAt).toBeNull()
  })

  it('nettoie ce qu’on lui donne', () => {
    const created = createEntry(draft, '2026-08-14', 30, true)
    expect(created.name).toBe('objectif 35 mm')
    expect(created.where).toBe('digit-photo')
  })

  it('n’enregistre aucun prix quand le réglage ne le demande pas', () => {
    expect(createEntry(draft, '2026-08-14', 30, false).price).toBeNull()
  })

  it('respecte un autre délai', () => {
    expect(createEntry(draft, '2026-08-14', 60, true).askAt).toBe('2026-10-13')
  })
})

describe('isDue et dueEntries', () => {
  const list = [
    entry({ id: 'a', askAt: '2026-08-10' }),
    entry({ id: 'b', askAt: '2026-08-01' }),
    entry({ id: 'c', askAt: '2026-09-01' }),
    entry({ id: 'd', askAt: '2026-07-01', verdict: 'forgotten', answeredAt: '2026-07-01' }),
  ]

  it('échoit le jour même', () => {
    expect(isDue(entry({ id: 'x', askAt: '2026-08-14' }), '2026-08-14')).toBe(true)
    expect(isDue(entry({ id: 'x', askAt: '2026-08-15' }), '2026-08-14')).toBe(false)
  })

  it('ne rappelle jamais une ligne déjà jugée', () => {
    expect(dueEntries(list, '2026-08-14').map((e) => e.id)).toEqual(['b', 'a'])
  })

  it('pose la plus ancienne d’abord', () => {
    expect(dueEntries(list, '2026-08-14')[0]?.id).toBe('b')
  })
})

describe('nextAsk', () => {
  it('trouve la prochaine question non échue', () => {
    const list = [
      entry({ id: 'a', askAt: '2026-09-20' }),
      entry({ id: 'b', askAt: '2026-09-02' }),
      entry({ id: 'c', askAt: '2026-08-01' }),
    ]
    expect(nextAsk(list, '2026-08-14')?.id).toBe('b')
  })

  it('rend null quand tout est échu ou jugé', () => {
    expect(nextAsk([entry({ id: 'a', askAt: '2026-08-01' })], '2026-08-14')).toBeNull()
  })
})

describe('answerEntry', () => {
  const list = [entry({ id: 'a' })]

  it('enregistre le verdict et son jour', () => {
    const [answered] = answerEntry(list, 'a', 'still', '2026-08-14')
    expect(answered?.verdict).toBe('still')
    expect(answered?.answeredAt).toBe('2026-08-14')
  })

  it('ne rejuge jamais une ligne déjà jugée', () => {
    const once = answerEntry(list, 'a', 'forgotten', '2026-08-01')
    const twice = answerEntry(once, 'a', 'still', '2026-08-14')
    expect(twice[0]?.verdict).toBe('forgotten')
    expect(twice[0]?.answeredAt).toBe('2026-08-01')
  })
})

describe('removeEntry', () => {
  it('retire la ligne et rien d’autre', () => {
    const list = [entry({ id: 'a' }), entry({ id: 'b' })]
    expect(removeEntry(list, 'a').map((e) => e.id)).toEqual(['b'])
  })
})

describe('sortByRenounced', () => {
  it('va du plus récent au plus ancien', () => {
    const list = [
      entry({ id: 'vieux', renouncedAt: '2026-06-01' }),
      entry({ id: 'neuf', renouncedAt: '2026-08-01' }),
    ]
    expect(sortByRenounced(list).map((e) => e.id)).toEqual(['neuf', 'vieux'])
  })

  it('garde le dernier inscrit en haut à date égale', () => {
    const list = [
      entry({ id: 'premier', renouncedAt: '2026-08-01' }),
      entry({ id: 'second', renouncedAt: '2026-08-01' }),
    ]
    expect(sortByRenounced(list).map((e) => e.id)).toEqual(['second', 'premier'])
  })
})

describe('buildRows', () => {
  it('signale un creux d’au moins quatre jours', () => {
    const list = [
      entry({ id: 'a', renouncedAt: '2026-08-14' }),
      entry({ id: 'b', renouncedAt: '2026-08-01' }),
    ]
    const rows = buildRows(list)
    expect(rows.map((row) => row.kind)).toEqual(['entry', 'gap', 'entry'])
    const gap = rows[1]
    expect(gap?.kind === 'gap' ? gap.days : 0).toBe(12)
  })

  it('ne signale rien entre deux jours voisins', () => {
    const list = [
      entry({ id: 'a', renouncedAt: '2026-08-14' }),
      entry({ id: 'b', renouncedAt: '2026-08-13' }),
      entry({ id: 'c', renouncedAt: '2026-08-11' }),
    ]
    expect(buildRows(list).every((row) => row.kind === 'entry')).toBe(true)
  })

  it('marque la première et la dernière ligne', () => {
    const rows = buildRows([
      entry({ id: 'a', renouncedAt: '2026-08-14' }),
      entry({ id: 'b', renouncedAt: '2026-08-13' }),
    ])
    const first = rows[0]
    const last = rows[1]
    expect(first?.kind === 'entry' && first.first).toBe(true)
    expect(last?.kind === 'entry' && last.last).toBe(true)
  })
})

describe('monthStats', () => {
  const answered = (id: string, verdict: Verdict, on: string): Entry =>
    entry({ id, verdict, answeredAt: on, askAt: on })

  const list = [
    entry({ id: 'w1', renouncedAt: '2026-08-02' }),
    entry({ id: 'w2', renouncedAt: '2026-08-09', price: 250 }),
    answered('a1', 'forgotten', '2026-08-03'),
    answered('a2', 'forgotten', '2026-08-05'),
    answered('a3', 'still', '2026-08-07'),
    // Répondue le mois précédent : elle ne compte pas dans août.
    answered('a4', 'faint', '2026-07-20'),
  ]
  const stats = monthStats(list, '2026-08')

  it('compte les réponses au jour où elles ont été données', () => {
    expect(stats.answered).toBe(3)
    expect(stats.forgotten).toBe(2)
    expect(stats.still).toBe(1)
    expect(stats.faint).toBe(0)
  })

  it('compte les inscriptions du mois', () => {
    expect(stats.written).toBe(2)
  })

  it('compte l’attente sur tout le registre, pas sur le mois', () => {
    expect(stats.pending).toBe(2)
  })

  it('totalise les montants sans jamais les appeler une économie', () => {
    expect(stats.monthMoney).toBe(350)
    expect(stats.allMoney).toBe(750)
    expect(stats.stillMoney).toBe(100)
  })

  it('nomme un exemple plutôt qu’un chiffre seul', () => {
    expect(stats.firstStill?.id).toBe('a3')
    expect(stats.firstFaint).toBeNull()
  })

  it('ignore un prix absent', () => {
    const noPrice = monthStats([entry({ id: 'x', price: null, renouncedAt: '2026-08-02' })], '2026-08')
    expect(noPrice.monthMoney).toBe(0)
  })
})
