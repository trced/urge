/** État de l'application : le registre et les réglages.
 *  Une seule source, persistée localement à chaque changement.
 *
 *  Le mode exemple ne duplique pas les réglages : il ne remplace que les
 *  données. Le thème choisi depuis la démonstration est donc un vrai
 *  réglage, mais le registre de l'utilisateur n'est jamais touché. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { answerEntry, removeEntry, sortByRenounced } from '../lib/entries.ts'
import { todayISO } from '../lib/format.ts'
import { mergeFile } from '../lib/io.ts'
import { sampleEntries } from '../lib/sample.ts'
import {
  EMPTY_STATE,
  hasSeenIntro,
  isStorageAvailable,
  loadState,
  markIntroSeen,
  saveState,
  toFile,
} from '../lib/storage.ts'
import type { StoredState } from '../lib/storage.ts'
import type { Entry, Settings, UrgeFile, Verdict } from '../lib/types.ts'
import { resolveLang } from '../i18n/index.tsx'
import type { Lang } from '../i18n/index.tsx'

export interface Store {
  entries: Entry[]
  settings: Settings
  lang: Lang
  /** Mode exemple : rien ne sort de l'onglet. */
  demo: boolean
  storageAvailable: boolean
  /** La présentation a déjà été vue — sinon l'application l'ouvre. */
  introSeen: boolean
  setIntroSeen: (seen: boolean) => void
  file: () => UrgeFile
  addEntry: (entry: Entry) => void
  /** Répondre est définitif : une ligne déjà jugée ne bouge plus. */
  answer: (id: string, verdict: Verdict) => void
  removeEntry: (id: string) => void
  replaceAll: (entries: Entry[]) => void
  /** Fusionne et renvoie le nombre de lignes réellement ajoutées. */
  mergeIncoming: (entries: Entry[]) => number
  eraseAll: () => void
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>(() =>
    typeof window === 'undefined' ? EMPTY_STATE : loadState(),
  )
  const [storageAvailable] = useState(
    () => typeof window !== 'undefined' && isStorageAvailable(),
  )
  const [introSeen, setSeen] = useState(
    () => typeof window === 'undefined' || hasSeenIntro(),
  )

  // Une seule écriture, au même endroit : impossible d'oublier de persister.
  // Rien n'est écrit à la simple ouverture — seulement quand l'état change.
  const untouched = useRef(true)
  useEffect(() => {
    if (untouched.current) {
      untouched.current = false
      return
    }
    saveState(state)
  }, [state])

  const lang = useMemo(
    () => resolveLang(state.settings.lang),
    [state.settings.lang],
  )

  // Seul le magasin racine touche au document.
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    if (state.settings.theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', state.settings.theme)
  }, [lang, state.settings.theme])

  const setIntroSeen = useCallback((seen: boolean) => {
    markIntroSeen(seen)
    setSeen(seen)
  }, [])

  const value = useMemo<Store>(
    () => ({
      entries: state.entries,
      settings: state.settings,
      lang,
      demo: false,
      storageAvailable,
      introSeen,
      setIntroSeen,
      file: () => toFile(state),
      addEntry: (entry) =>
        setState((s) => ({ ...s, entries: sortByRenounced([entry, ...s.entries]) })),
      answer: (id, verdict) =>
        setState((s) => ({
          ...s,
          entries: answerEntry(s.entries, id, verdict, todayISO()),
        })),
      removeEntry: (id) =>
        setState((s) => ({ ...s, entries: removeEntry(s.entries, id) })),
      replaceAll: (entries) =>
        setState((s) => ({ ...s, entries: sortByRenounced(entries) })),
      mergeIncoming: (entries) => {
        const result = mergeFile(state.entries, entries)
        setState((s) => ({ ...s, entries: result.entries }))
        return result.added
      },
      eraseAll: () => setState((s) => ({ ...s, entries: [] })),
      setSetting: (key, val) =>
        setState((s) => ({ ...s, settings: { ...s.settings, [key]: val } })),
    }),
    [state, lang, storageAvailable, introSeen, setIntroSeen],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

/** Surcouche exemple : mêmes réglages, données en mémoire seulement.
 *  Les textes viennent du dictionnaire — la démonstration parle la langue
 *  de qui la regarde. */
export function DemoStoreProvider({
  text,
  children,
}: {
  text: string
  children: ReactNode
}) {
  const parent = useStore()
  const [entries, setEntries] = useState(() => sampleEntries(text))

  const value = useMemo<Store>(
    () => ({
      ...parent,
      entries,
      demo: true,
      // La présentation ne s'ouvre jamais par-dessus la démonstration : ce
      // qu'on est venu voir, c'est le registre rempli.
      introSeen: true,
      setIntroSeen: () => {},
      file: () => ({
        schemaVersion: parent.file().schemaVersion,
        data: { entries },
        settings: parent.settings,
      }),
      addEntry: (entry) => setEntries((list) => sortByRenounced([entry, ...list])),
      answer: (id, verdict) =>
        setEntries((list) => answerEntry(list, id, verdict, todayISO())),
      removeEntry: (id) => setEntries((list) => removeEntry(list, id)),
      replaceAll: (list) => setEntries(sortByRenounced(list)),
      mergeIncoming: (incoming) => {
        const result = mergeFile(entries, incoming)
        setEntries(result.entries)
        return result.added
      },
      eraseAll: () => setEntries([]),
    }),
    [parent, entries],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore doit être utilisé dans un StoreProvider')
  return store
}
