/** Inscrire un renoncement. Un nom suffit ; le reste aide à répondre dans
 *  trente jours, il n'est pas exigé.
 *
 *  La feuille annonce la date de la question avant qu'on valide : c'est
 *  la seule promesse que urge. fait, et elle doit être lisible au moment
 *  où on l'accepte. */

import { useState } from 'react'
import { Button } from '../../components/Button.tsx'
import { Sheet } from '../../components/Sheet.tsx'
import { TextAreaField, TextField } from '../../components/TextField.tsx'
import { useI18n } from '../../i18n/index.tsx'
import { EMPTY_DRAFT } from '../../lib/entries.ts'
import type { Draft } from '../../lib/entries.ts'
import { addDaysISO, formatDate } from '../../lib/format.ts'
import { NAME_MAX, WHERE_MAX, WHY_MAX } from '../../lib/types.ts'

export function CaptureSheet({
  today,
  delay,
  askPrice,
  onSave,
  onClose,
}: {
  today: string
  delay: number
  askPrice: boolean
  onSave: (draft: Draft) => void
  onClose: () => void
}) {
  const { t, locale } = useI18n()
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const [error, setError] = useState('')

  const set = (patch: Partial<Draft>): void => {
    setDraft((current) => ({ ...current, ...patch }))
    if (patch.name !== undefined && patch.name.trim()) setError('')
  }

  const save = (): void => {
    if (!draft.name.trim()) {
      setError(t('app.capture.nameError'))
      return
    }
    onSave(draft)
  }

  return (
    <Sheet label={t('app.capture.label')} onClose={onClose}>
      <div className="sheet__head">
        <span className="t-brand">{t('app.capture.heading')}</span>
        <Button variant="quiet" onClick={onClose}>
          {t('common.close')}
        </Button>
      </div>

      <TextField
        required
        label={t('app.capture.name')}
        value={draft.name}
        onValueChange={(name) => set({ name })}
        placeholder={t('app.capture.namePlaceholder')}
        maxLength={NAME_MAX}
        autoComplete="off"
        {...(error ? { error } : {})}
      />

      <div className="capture__row">
        {askPrice ? (
          <div className="capture__price">
            <TextField
              label={t('app.capture.price')}
              value={draft.price}
              // Les chiffres seuls : un prix est un ordre de grandeur, pas
              // une saisie comptable, et le centime n'apparaît nulle part.
              onValueChange={(price) => set({ price: price.replace(/\D/g, '') })}
              placeholder={t('app.capture.pricePlaceholder')}
              inputMode="numeric"
              maxLength={7}
            />
          </div>
        ) : null}
        <div className="capture__where">
          <TextField
            label={t('app.capture.where')}
            value={draft.where}
            onValueChange={(where) => set({ where })}
            placeholder={t('app.capture.wherePlaceholder')}
            maxLength={WHERE_MAX}
            autoComplete="off"
          />
        </div>
      </div>

      <TextAreaField
        label={t('app.capture.why')}
        value={draft.why}
        onValueChange={(why) => set({ why })}
        placeholder={t('app.capture.whyPlaceholder')}
        rows={2}
        maxLength={WHY_MAX}
        hint={t('app.capture.hint', {
          date: formatDate(addDaysISO(today, delay), locale),
        })}
      />

      <div className="sheet__actions">
        <Button variant="quiet" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button variant="primary" onClick={save}>
          {t('app.capture.save')}
        </Button>
      </div>
    </Sheet>
  )
}
