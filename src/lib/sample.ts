/** Le registre de démonstration, calculé depuis aujourd'hui.
 *
 *  Il n'écrit rien sur l'appareil : /app?demo=1 monte ces lignes en mémoire
 *  et les jette en fermant l'onglet. C'est le moyen le plus rapide de voir
 *  un changement en contexte — un registre vide ne montre presque rien.
 *
 *  Les textes viennent du dictionnaire : la démonstration parle la langue
 *  de qui la regarde. Les nombres restent ici — ce sont des jours et des
 *  montants, ils ne se traduisent pas. */

import { addDaysISO, todayISO } from './format.ts'
import type { Entry, Verdict } from './types.ts'

/** `renounced` : jours avant aujourd'hui. `answered` : de même, ou `null`
 *  quand la ligne attend encore sa réponse.
 *
 *  Les lignes en attente sont à moins de trente jours — leur question n'est
 *  pas due ; les deux lignes à −33 et −38 le sont, et c'est ce qui donne à
 *  la démonstration une question à poser dès l'ouverture. */
const SEED: { renounced: number; price: number; answered: number | null; verdict: Verdict | null }[] = [
  { renounced: 2, price: 78, answered: null, verdict: null },
  { renounced: 5, price: 429, answered: null, verdict: null },
  { renounced: 9, price: 89, answered: null, verdict: null },
  { renounced: 13, price: 71, answered: null, verdict: null },
  { renounced: 19, price: 199, answered: null, verdict: null },
  { renounced: 24, price: 240, answered: null, verdict: null },
  { renounced: 28, price: 165, answered: null, verdict: null },
  { renounced: 33, price: 145, answered: null, verdict: null },
  { renounced: 38, price: 249, answered: null, verdict: null },
  { renounced: 31, price: 175, answered: 1, verdict: 'forgotten' },
  { renounced: 33, price: 42, answered: 3, verdict: 'forgotten' },
  { renounced: 36, price: 68, answered: 6, verdict: 'faint' },
  { renounced: 39, price: 1190, answered: 9, verdict: 'still' },
  { renounced: 43, price: 299, answered: 13, verdict: 'forgotten' },
  { renounced: 58, price: 24, answered: 28, verdict: 'forgotten' },
  { renounced: 74, price: 349, answered: 44, verdict: 'still' },
]

/** Chaque ligne du dictionnaire est « nom | où | pourquoi ». Le séparateur
 *  est une barre verticale : elle n'apparaît dans aucun des textes. */
export function parseSampleText(text: string): { name: string; where: string; why: string }[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = '', where = '', why = ''] = line.split('|').map((part) => part.trim())
      return { name, where, why }
    })
}

export function sampleEntries(text: string, today = todayISO()): Entry[] {
  const items = parseSampleText(text)
  return SEED.map((seed, index) => {
    const item = items[index % Math.max(items.length, 1)] ?? {
      name: `—`,
      where: '',
      why: '',
    }
    const renouncedAt = addDaysISO(today, -seed.renounced)
    return {
      id: `demo-${index}`,
      name: item.name,
      price: seed.price,
      where: item.where,
      why: item.why,
      renouncedAt,
      askAt: addDaysISO(renouncedAt, 30),
      verdict: seed.verdict,
      answeredAt: seed.answered === null ? null : addDaysISO(today, -seed.answered),
    }
  })
}
