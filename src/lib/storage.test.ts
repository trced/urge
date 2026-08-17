import { describe, expect, it } from 'vitest'
import {
  EMPTY_STATE,
  STORAGE_KEY,
  hasEntries,
  hasSeenIntro,
  loadState,
  markIntroSeen,
  saveState,
  toFile,
} from './storage.ts'
import { DEFAULT_SETTINGS } from './types.ts'
import type { Entry } from './types.ts'

const entry: Entry = {
  id: 'a',
  name: 'objectif 35 mm',
  price: 429,
  where: 'digit-photo',
  why: 'Photographier les gens.',
  renouncedAt: '2026-08-14',
  askAt: '2026-09-13',
  verdict: null,
  answeredAt: null,
}

describe('loadState', () => {
  it('rend un registre vide quand rien n’est écrit', () => {
    expect(loadState()).toEqual(EMPTY_STATE)
  })

  it('rend un registre vide plutôt qu’une erreur sur un fichier illisible', () => {
    window.localStorage.setItem(STORAGE_KEY, 'ceci n’est pas du JSON')
    expect(loadState()).toEqual(EMPTY_STATE)
  })

  it('complète les réglages absents par leurs valeurs par défaut', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        data: { entries: [entry] },
        settings: { theme: 'dark' },
      }),
    )
    const state = loadState()
    expect(state.settings).toEqual({ ...DEFAULT_SETTINGS, theme: 'dark' })
    expect(state.entries).toHaveLength(1)
  })
})

describe('saveState', () => {
  it('écrit exactement le format du fichier d’export', () => {
    const state = { entries: [entry], settings: DEFAULT_SETTINGS }
    saveState(state)
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? ''
    expect(JSON.parse(raw)).toEqual(toFile(state))
  })

  it('se relit sans rien perdre', () => {
    const state = { entries: [entry], settings: DEFAULT_SETTINGS }
    saveState(state)
    expect(loadState()).toEqual(state)
  })
})

describe('hasEntries', () => {
  it('répond non tant que rien n’est inscrit', () => {
    expect(hasEntries()).toBe(false)
  })

  it('répond oui dès la première ligne', () => {
    saveState({ entries: [entry], settings: DEFAULT_SETTINGS })
    expect(hasEntries()).toBe(true)
  })
})

describe('la présentation', () => {
  it('n’a pas été vue au premier lancement', () => {
    expect(hasSeenIntro()).toBe(false)
  })

  it('se retient, et se redemande', () => {
    markIntroSeen(true)
    expect(hasSeenIntro()).toBe(true)
    markIntroSeen(false)
    expect(hasSeenIntro()).toBe(false)
  })

  it('ne voyage pas dans le fichier d’export', () => {
    markIntroSeen(true)
    saveState({ entries: [entry], settings: DEFAULT_SETTINGS })
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? ''
    expect(raw).not.toContain('seen')
  })
})
