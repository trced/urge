/** Persistance locale. Une seule clé, le même format que le fichier
 *  d'export : ce qui est lu par l'application est ce qui en sort.
 *
 *  localStorage plutôt qu'IndexedDB : un renoncement par jour pendant dix
 *  ans tient dans quelques centaines de kilo-octets, l'API est synchrone —
 *  donc aucun écran d'attente au démarrage — et le format stocké reste
 *  celui du fichier d'export, lisible à l'œil nu. */

import { parseFile } from './io.ts'
import { DEFAULT_SETTINGS, SCHEMA_VERSION } from './types.ts'
import type { Entry, Settings, UrgeFile } from './types.ts'

export const STORAGE_KEY = 'urge.v1'

export interface StoredState {
  entries: Entry[]
  settings: Settings
}

export const EMPTY_STATE: StoredState = {
  entries: [],
  settings: DEFAULT_SETTINGS,
}

/** Le stockage peut être refusé (mode privé, quota, iframe cloisonnée).
 *  On échoue en lecture seule plutôt que de casser l'application. */
function storage(): Storage | null {
  try {
    const s = window.localStorage
    const probe = '__urge_probe__'
    s.setItem(probe, '1')
    s.removeItem(probe)
    return s
  } catch {
    return null
  }
}

export function loadState(): StoredState {
  const s = storage()
  if (!s) return EMPTY_STATE
  const raw = s.getItem(STORAGE_KEY)
  if (!raw) return EMPTY_STATE
  const parsed = parseFile(raw)
  if (!parsed.ok) return EMPTY_STATE
  return {
    entries: parsed.file.data.entries,
    settings: { ...DEFAULT_SETTINGS, ...parsed.file.settings },
  }
}

export function toFile(state: StoredState): UrgeFile {
  return {
    schemaVersion: SCHEMA_VERSION,
    data: { entries: state.entries },
    settings: state.settings,
  }
}

export function saveState(state: StoredState): void {
  const s = storage()
  if (!s) return
  try {
    s.setItem(STORAGE_KEY, JSON.stringify(toFile(state)))
  } catch {
    // Quota atteint : la session continue, l'export reste possible.
  }
}

export function isStorageAvailable(): boolean {
  return storage() !== null
}

/** Un registre déjà commencé. Sert à décider, au démarrage, si « / » doit
 *  ouvrir l'application plutôt que la page de présentation.
 *
 *  Passe par loadState : un fichier illisible compte comme registre vide,
 *  ce qui est la réponse prudente — on montre la présentation plutôt que
 *  d'envoyer sur une application qu'on n'a pas su relire. */
export function hasEntries(): boolean {
  return loadState().entries.length > 0
}

/** La présentation a-t-elle déjà été vue ? Écrit à part du registre : ce
 *  n'est pas une donnée, ça ne s'exporte pas et ça ne se fusionne pas. */
export const SEEN_KEY = 'urge.seen.v1'

export function hasSeenIntro(): boolean {
  const s = storage()
  if (!s) return true
  return s.getItem(SEEN_KEY) === '1'
}

export function markIntroSeen(seen: boolean): void {
  const s = storage()
  if (!s) return
  try {
    if (seen) s.setItem(SEEN_KEY, '1')
    else s.removeItem(SEEN_KEY)
  } catch {
    // Sans écriture, la présentation se remontrera : c'est le moindre mal.
  }
}
