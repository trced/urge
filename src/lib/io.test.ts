import { describe, expect, it } from 'vitest'
import { exportFilename, mergeFile, parseFile, serializeFile } from './io.ts'
import { SCHEMA_VERSION } from './types.ts'
import type { Entry } from './types.ts'

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

const file = (entries: unknown[], extra: Record<string, unknown> = {}): string =>
  JSON.stringify({ schemaVersion: SCHEMA_VERSION, data: { entries }, ...extra })

describe('parseFile', () => {
  it('refuse ce qui n’est pas du JSON', () => {
    expect(parseFile('{')).toEqual({ ok: false, reason: 'unreadable' })
  })

  it('refuse un fichier qui n’a pas la forme attendue', () => {
    expect(parseFile('{"schemaVersion":1}')).toEqual({ ok: false, reason: 'schema' })
    expect(parseFile('[]')).toEqual({ ok: false, reason: 'schema' })
  })

  it('refuse une autre version du format', () => {
    expect(parseFile(file([], {}).replace('"schemaVersion":1', '"schemaVersion":2')))
      .toEqual({ ok: false, reason: 'version' })
  })

  it('écarte une ligne cassée sans perdre les autres', () => {
    const result = parseFile(
      file([entry({ id: 'a' }), { name: '   ' }, entry({ id: 'b' })]),
    )
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.file.data.entries).toHaveLength(2)
  })

  it('recalcule une date de question manquante', () => {
    const broken = { ...entry({ id: 'a', renouncedAt: '2026-08-01' }), askAt: 'plus tard' }
    const result = parseFile(file([broken], { settings: { delay: 60 } }))
    expect(result.ok && result.file.data.entries[0]?.askAt).toBe('2026-09-30')
  })

  it('date un verdict sans jour de réponse du jour de sa question', () => {
    const odd = {
      ...entry({ id: 'a', askAt: '2026-07-31' }),
      verdict: 'still',
      answeredAt: null,
    }
    const result = parseFile(file([odd]))
    expect(result.ok && result.file.data.entries[0]?.answeredAt).toBe('2026-07-31')
  })

  it('écarte un verdict inconnu et l’attente qu’il traînait', () => {
    const odd = { ...entry({ id: 'a' }), verdict: 'peut-être', answeredAt: '2026-07-31' }
    const result = parseFile(file([odd]))
    expect(result.ok && result.file.data.entries[0]?.verdict).toBeNull()
    expect(result.ok && result.file.data.entries[0]?.answeredAt).toBeNull()
  })

  it('ne retient que des réglages connus', () => {
    const result = parseFile(
      file([], { settings: { theme: 'dark', delay: 45, price: 'never', couleur: 'rouge' } }),
    )
    expect(result.ok && result.file.settings).toEqual({ theme: 'dark', price: 'never' })
  })

  it('relit ce qu’il a écrit', () => {
    const original = [entry({ id: 'a' }), entry({ id: 'b', renouncedAt: '2026-06-02' })]
    const text = serializeFile({
      schemaVersion: SCHEMA_VERSION,
      data: { entries: original },
      settings: {},
    })
    const result = parseFile(text)
    expect(result.ok && result.file.data.entries).toEqual(original)
  })
})

describe('mergeFile', () => {
  it('ajoute ce qui manque', () => {
    const result = mergeFile([entry({ id: 'a' })], [entry({ id: 'b', renouncedAt: '2026-06-01' })])
    expect(result.added).toBe(1)
    expect(result.entries).toHaveLength(2)
  })

  it('reconnaît la même ligne au nom et au jour', () => {
    const mine = entry({ id: 'local', name: 'objectif 35 mm', renouncedAt: '2026-08-01' })
    const theirs = entry({ id: 'autre', name: 'Objectif 35 mm ', renouncedAt: '2026-08-01' })
    const result = mergeFile([mine], [theirs])
    expect(result.added).toBe(0)
    expect(result.entries).toHaveLength(1)
  })

  it('ne remplace jamais une réponse déjà donnée', () => {
    const mine = entry({ id: 'a', verdict: 'forgotten', answeredAt: '2026-07-31' })
    const theirs = entry({ id: 'a', verdict: 'still', answeredAt: '2026-07-31' })
    const result = mergeFile([mine], [theirs])
    expect(result.entries[0]?.verdict).toBe('forgotten')
  })

  it('adopte le verdict entrant quand la ligne attendait encore', () => {
    const mine = entry({ id: 'a' })
    const theirs = entry({ id: 'a', verdict: 'faint', answeredAt: '2026-07-31' })
    const result = mergeFile([mine], [theirs])
    expect(result.entries[0]?.verdict).toBe('faint')
    expect(result.entries[0]?.answeredAt).toBe('2026-07-31')
    expect(result.added).toBe(0)
  })
})

describe('exportFilename', () => {
  it('date le fichier pour que deux exports ne se recouvrent pas', () => {
    expect(exportFilename('2026-08-14')).toBe('urge-2026-08-14.json')
  })
})
