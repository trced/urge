/** Parcours réels : inscrire, répondre, retirer, régler.
 *  Le test passe par l'interface, jamais par le magasin. */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { UrgeApp } from './UrgeApp.tsx'
import { I18nProvider } from '../i18n/index.tsx'
import { SEEN_KEY, STORAGE_KEY, toFile } from '../lib/storage.ts'
import { DEFAULT_SETTINGS } from '../lib/types.ts'
import type { Entry, Settings } from '../lib/types.ts'
import { StoreProvider, useStore } from '../state/store.tsx'

/** Vendredi 14 août 2026. Toutes les dates du test en découlent. */
const TODAY = new Date(2026, 7, 14, 10, 0, 0)

function entry(patch: Partial<Entry> & { id: string; name: string }): Entry {
  return {
    price: 100,
    where: 'en ligne',
    why: 'Une raison écrite le jour même.',
    renouncedAt: '2026-07-01',
    askAt: '2026-07-31',
    verdict: null,
    answeredAt: null,
    ...patch,
  }
}

function seed(entries: Entry[], settings: Partial<Settings> = {}): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      toFile({
        entries,
        // Langue fixée : sans cela le test suivrait celle du navigateur simulé.
        settings: { ...DEFAULT_SETTINGS, lang: 'fr', ...settings },
      }),
    ),
  )
  // La présentation ne s'ouvre pas devant les parcours qu'on veut jouer.
  localStorage.setItem(SEEN_KEY, '1')
}

function Localised({ children }: { children: ReactNode }) {
  const { lang } = useStore()
  return <I18nProvider lang={lang}>{children}</I18nProvider>
}

function renderApp() {
  return render(
    <StoreProvider>
      <Localised>
        <MemoryRouter>
          <UrgeApp />
        </MemoryRouter>
      </Localised>
    </StoreProvider>,
  )
}

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  vi.setSystemTime(TODAY)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('le premier lancement', () => {
  it('ouvre la présentation, puis ne la remontre plus', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        toFile({ entries: [], settings: { ...DEFAULT_SETTINGS, lang: 'fr' } }),
      ),
    )
    const { unmount } = renderApp()

    expect(screen.getByText("Ce n'est pas une liste d'envies.")).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'passer' }))
    expect(screen.getByRole('heading', { name: 'le registre' })).toBeTruthy()

    unmount()
    renderApp()
    expect(screen.queryByText("Ce n'est pas une liste d'envies.")).toBeNull()
  })
})

describe('le registre', () => {
  it('annonce ce qu’il contient et ce qu’il attend', () => {
    seed([
      entry({ id: 'a', name: 'objectif 35 mm', renouncedAt: '2026-08-10', askAt: '2026-09-09' }),
      entry({ id: 'b', name: 'vélo gravel', verdict: 'forgotten', answeredAt: '2026-07-31' }),
    ])
    renderApp()
    expect(screen.getByText('2 inscrits · 1 en attente de verdict')).toBeTruthy()
  })

  it('invite à inscrire quand il est vide', () => {
    seed([])
    renderApp()
    expect(screen.getByText('Aucun renoncement inscrit.')).toBeTruthy()
  })

  it('signale les jours où rien n’a été inscrit', () => {
    seed(
      [
        entry({ id: 'a', name: 'récent', renouncedAt: '2026-08-14', askAt: '2026-09-13' }),
        entry({ id: 'b', name: 'ancien', renouncedAt: '2026-08-01', askAt: '2026-08-31' }),
      ],
      { ask: 'onDemand' },
    )
    renderApp()
    expect(screen.getByText('12 jours sans rien inscrire')).toBeTruthy()
  })
})

describe('inscrire un renoncement', () => {
  it('écrit la ligne et annonce la date de la question', async () => {
    const user = userEvent.setup()
    seed([])
    renderApp()

    await user.click(
      screen.getByRole('button', { name: '+ inscrire un renoncement' }),
    )
    await user.type(
      screen.getByLabelText("Ce que je n'achète pas"),
      'objectif 35 mm',
    )
    await user.type(screen.getByLabelText('Prix'), '429')
    await user.click(screen.getByRole('button', { name: 'inscrire' }))

    expect(screen.getByText('Inscrit, pas acheté.')).toBeTruthy()
    expect(
      screen.getByText(
        'La question reviendra le 13 septembre 2026 : y pensez-vous encore ?',
      ),
    ).toBeTruthy()
    expect(screen.getByText('objectif 35 mm')).toBeTruthy()
  })

  it('refuse une ligne sans nom, et le dit', async () => {
    const user = userEvent.setup()
    seed([])
    renderApp()

    await user.click(
      screen.getByRole('button', { name: '+ inscrire un renoncement' }),
    )
    await user.click(screen.getByRole('button', { name: 'inscrire' }))

    expect(
      screen.getByRole('alert').textContent,
    ).toContain("Nommez l'objet")
  })

  it('ne demande pas le prix quand le réglage l’interdit', async () => {
    const user = userEvent.setup()
    seed([], { price: 'never' })
    renderApp()

    await user.click(
      screen.getByRole('button', { name: '+ inscrire un renoncement' }),
    )
    expect(screen.queryByLabelText('Prix')).toBeNull()
  })
})

describe('répondre', () => {
  const due = [
    entry({ id: 'a', name: 'vélo gravel', renouncedAt: '2026-07-01', askAt: '2026-07-31' }),
    entry({ id: 'b', name: 'tapis de yoga', renouncedAt: '2026-07-05', askAt: '2026-08-04' }),
  ]

  it('pose la question la plus ancienne d’abord, puis la suivante', async () => {
    const user = userEvent.setup()
    seed(due, { ask: 'onDemand' })
    renderApp()

    await user.click(screen.getByRole('button', { name: /2 envies échues/ }))
    expect(screen.getByRole('heading', { name: 'vélo gravel' })).toBeTruthy()
    expect(screen.getByText('1 sur 2')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: /^vélo gravel : oublié/ }))
    expect(screen.getByRole('heading', { name: 'tapis de yoga' })).toBeTruthy()

    await user.click(screen.getByRole('button', { name: /^tapis de yoga : toujours/ }))
    expect(screen.getByText('2 réponses enregistrées.')).toBeTruthy()
  })

  it('pose la question d’elle-même à l’ouverture', () => {
    seed(due)
    renderApp()
    expect(screen.getByRole('heading', { name: 'vélo gravel' })).toBeTruthy()
  })

  it('attend d’être appelée quand le réglage le dit', () => {
    seed(due, { ask: 'onDemand' })
    renderApp()
    expect(screen.getByRole('heading', { name: 'le registre' })).toBeTruthy()
    expect(screen.queryByText('Y pensez-vous encore ?')).toBeNull()
  })

  it('ne repose jamais une question déjà répondue', async () => {
    const user = userEvent.setup()
    seed([due[0]!], { ask: 'onDemand' })
    renderApp()

    await user.click(screen.getByRole('button', { name: /1 envie échue/ }))
    await user.click(screen.getByRole('button', { name: /^vélo gravel : oublié/ }))

    expect(screen.queryByRole('button', { name: /envie échue/ })).toBeNull()
  })
})

describe('une envie en détail', () => {
  it('montre sa chronologie et la retire sur confirmation', async () => {
    const user = userEvent.setup()
    seed([
      entry({
        id: 'a',
        name: 'objectif 35 mm',
        renouncedAt: '2026-08-10',
        askAt: '2026-09-09',
      }),
    ])
    renderApp()

    await user.click(screen.getByRole('button', { name: /objectif 35 mm, inscrit le/ }))
    expect(screen.getByText('chronologie')).toBeTruthy()
    expect(screen.getByText('question à venir')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'retirer du registre' }))
    expect(screen.getByText('Retirer « objectif 35 mm » ?')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'retirer' }))
    expect(screen.getByText('Ligne retirée.')).toBeTruthy()
    expect(screen.getByText('Aucun renoncement inscrit.')).toBeTruthy()
  })
})

describe('les réglages', () => {
  it('changent le délai sans déplacer une question déjà promise', async () => {
    const user = userEvent.setup()
    seed([
      entry({
        id: 'a',
        name: 'objectif 35 mm',
        renouncedAt: '2026-08-10',
        askAt: '2026-09-09',
      }),
    ])
    renderApp()

    await user.click(screen.getByRole('button', { name: 'réglages' }))
    await user.click(
      screen.getByRole('button', { name: /délai avant la question : 30 jours/ }),
    )
    expect(
      screen.getByRole('button', { name: /délai avant la question : 60 jours/ }),
    ).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'registre' }))
    await user.click(screen.getByRole('button', { name: /objectif 35 mm, inscrit le/ }))
    // La date figée le jour de l'inscription, et non 2026-10-09.
    expect(screen.getAllByText('9 septembre 2026').length).toBeGreaterThan(0)
    expect(screen.queryByText('9 octobre 2026')).toBeNull()
  })

  it('effacent tout, derrière une confirmation', async () => {
    const user = userEvent.setup()
    seed([entry({ id: 'a', name: 'objectif 35 mm' })])
    renderApp()

    await user.click(screen.getByRole('button', { name: 'réglages' }))
    await user.click(screen.getByRole('button', { name: /effacer le registre/ }))
    expect(screen.getByText('Effacer tout le registre ?')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'effacer' }))
    expect(screen.getByText('Registre effacé.')).toBeTruthy()
    expect(screen.getByText('Aucun renoncement inscrit.')).toBeTruthy()
  })
})

describe('le bilan', () => {
  it('compte les réponses au mois où elles ont été données', async () => {
    const user = userEvent.setup()
    seed([
      entry({ id: 'a', name: 'a', verdict: 'forgotten', answeredAt: '2026-08-03' }),
      entry({ id: 'b', name: 'b', verdict: 'still', answeredAt: '2026-08-07' }),
      entry({ id: 'c', name: 'c', verdict: 'faint', answeredAt: '2026-07-20' }),
    ])
    renderApp()

    await user.click(screen.getByRole('button', { name: 'bilan' }))
    expect(screen.getByText('août 2026')).toBeTruthy()
    expect(screen.getAllByText('sur 2 réponses ce mois-ci').length).toBeGreaterThan(0)
  })
})
