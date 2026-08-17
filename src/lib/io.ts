/** urge.json — lecture, écriture, fusion, partage.
 *  Import validé contre le schéma, jamais d'écrasement silencieux. */

import { addDaysISO, isISODate, todayISO } from './format.ts'
import { newId, sortByRenounced, trimTo } from './entries.ts'
import {
  DELAYS,
  NAME_MAX,
  PRICE_MAX,
  SCHEMA_VERSION,
  VERDICTS,
  WHERE_MAX,
  WHY_MAX,
} from './types.ts'
import type { Delay, Entry, Settings, UrgeFile, Verdict } from './types.ts'

/** « urge-2026-08-14.json » : deux exports du même appareil ne se
 *  recouvrent pas dans le dossier de téléchargement. */
export function exportFilename(date = todayISO()): string {
  return `urge-${date}.json`
}

export type ParseResult =
  | { ok: true; file: UrgeFile }
  | { ok: false; reason: 'unreadable' | 'schema' | 'version' }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function asPrice(value: unknown): number | null {
  const price = Number(value)
  if (!Number.isFinite(price) || price <= 0) return null
  return Math.min(Math.round(price), PRICE_MAX)
}

function asVerdict(value: unknown): Verdict | null {
  return VERDICTS.includes(value as Verdict) ? (value as Verdict) : null
}

/** Une ligne sans nom n'a rien à montrer dans le registre : elle est
 *  écartée seule, sans faire échouer l'import des autres.
 *
 *  Les dates manquantes sont réparées plutôt que fatales — la date de
 *  question se recalcule depuis le renoncement, et un verdict sans jour de
 *  réponse est daté du jour de la question, qui est le seul jour où il a
 *  pu être donné. */
function asEntry(value: unknown, index: number, delay: Delay): Entry | null {
  if (!isRecord(value)) return null
  const name = trimTo(asString(value.name), NAME_MAX)
  if (!name) return null

  const renouncedAt = asString(value.renouncedAt)
  const renounced = isISODate(renouncedAt) ? renouncedAt : todayISO()
  const askAt = asString(value.askAt)
  const ask = isISODate(askAt) ? askAt : addDaysISO(renounced, delay)
  const verdict = asVerdict(value.verdict)
  const answeredAt = asString(value.answeredAt)

  return {
    id: asString(value.id) || `imported-${index}-${newId()}`,
    name,
    price: asPrice(value.price),
    where: trimTo(asString(value.where), WHERE_MAX),
    why: trimTo(asString(value.why), WHY_MAX),
    renouncedAt: renounced,
    askAt: ask,
    verdict,
    answeredAt: verdict ? (isISODate(answeredAt) ? answeredAt : ask) : null,
  }
}

function asSettings(value: unknown): Partial<Settings> {
  if (!isRecord(value)) return {}
  const out: Partial<Settings> = {}
  const pick = <K extends keyof Settings>(
    key: K,
    allowed: readonly Settings[K][],
  ): void => {
    const v = value[key]
    if (allowed.includes(v as Settings[K])) out[key] = v as Settings[K]
  }
  pick('theme', ['system', 'light', 'dark'])
  pick('lang', ['system', 'fr', 'en'])
  pick('delay', DELAYS)
  pick('ask', ['onOpen', 'onDemand'])
  pick('price', ['asked', 'never'])
  return out
}

/** Parse une chaîne JSON en fichier urge. Les enregistrements illisibles
 *  sont écartés un à un : une ligne cassée ne perd pas les autres. */
export function parseFile(text: string): ParseResult {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    return { ok: false, reason: 'unreadable' }
  }
  if (!isRecord(raw)) return { ok: false, reason: 'schema' }

  const version = Number(raw.schemaVersion)
  if (!Number.isFinite(version)) return { ok: false, reason: 'schema' }
  if (version !== SCHEMA_VERSION) return { ok: false, reason: 'version' }

  const data = isRecord(raw.data) ? raw.data : null
  if (!data || !Array.isArray(data.entries)) {
    return { ok: false, reason: 'schema' }
  }

  const settings = asSettings(raw.settings)
  const delay = settings.delay ?? 30
  const entries = sortByRenounced(
    data.entries
      .map((entry, index) => asEntry(entry, index, delay))
      .filter((entry): entry is Entry => entry !== null),
  )

  return {
    ok: true,
    file: { schemaVersion: SCHEMA_VERSION, data: { entries }, settings },
  }
}

export function serializeFile(file: UrgeFile): string {
  return `${JSON.stringify(file, null, 2)}\n`
}

export interface MergeResult {
  entries: Entry[]
  added: number
}

/** Deux lignes sont la même si elles portent le même nom et le même jour
 *  de renoncement : l'identifiant est local à un appareil, mais on ne
 *  renonce pas deux fois au même objet le même jour.
 *
 *  Fusionner n'écrase rien. Une ligne déjà jugée garde son verdict — une
 *  réponse est définitive, y compris face à un fichier qui prétend le
 *  contraire ; une ligne encore en attente adopte le verdict entrant, qui
 *  est alors la seule réponse existante. */
export function mergeFile(current: Entry[], incoming: Entry[]): MergeResult {
  const key = (entry: Entry): string =>
    `${entry.renouncedAt}|${entry.name.trim().toLowerCase()}`

  const byKey = new Map(current.map((entry) => [key(entry), entry]))
  const merged = current.map((entry) => ({ ...entry }))
  const index = new Map(merged.map((entry, i) => [key(entry), i]))
  let added = 0

  for (const entry of incoming) {
    const existing = byKey.get(key(entry))
    if (!existing) {
      merged.push(entry)
      byKey.set(key(entry), entry)
      index.set(key(entry), merged.length - 1)
      added++
      continue
    }
    if (existing.verdict !== null || entry.verdict === null) continue
    const position = index.get(key(entry))
    if (position === undefined) continue
    merged[position] = {
      ...existing,
      verdict: entry.verdict,
      answeredAt: entry.answeredAt ?? entry.askAt,
    }
  }

  return { entries: sortByRenounced(merged), added }
}

function fileBlob(file: UrgeFile): Blob {
  return new Blob([serializeFile(file)], { type: 'application/json' })
}

/** Déclenche le téléchargement du fichier. Aucun réseau : un Blob local. */
export function downloadFile(file: UrgeFile, filename = exportFilename()): void {
  const url = URL.createObjectURL(fileBlob(file))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

/** Envoyer vers : le partage natif quand l'appareil sait recevoir un
 *  fichier, le téléchargement sinon. Le contenu ne quitte l'appareil que
 *  par le geste explicite de l'utilisateur, vers l'application qu'il
 *  choisit — jamais vers un serveur du projet, il n'y en a pas. */
export async function shareFile(
  file: UrgeFile,
  filename = exportFilename(),
): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const nav = typeof navigator === 'undefined' ? null : navigator
  if (nav && typeof nav.share === 'function' && typeof File === 'function') {
    const payload = new File([fileBlob(file)], filename, {
      type: 'application/json',
    })
    const canShare = nav.canShare?.({ files: [payload] }) ?? false
    if (canShare) {
      try {
        await nav.share({ files: [payload], title: filename })
        return 'shared'
      } catch (error) {
        // Refus de l'utilisateur : ce n'est pas une panne, on n'enchaîne
        // pas sur un téléchargement qu'il n'a pas demandé.
        if (error instanceof DOMException && error.name === 'AbortError') {
          return 'cancelled'
        }
      }
    }
  }
  downloadFile(file, filename)
  return 'downloaded'
}
