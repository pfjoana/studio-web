'use client'
import { useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'

export default function FormButton() {
  const status = useFormStatus()
  const tContacts = useTranslations("contacts");

  return (
    <button type="submit" className={`form-button ${
      status.pending ? 'bg-gray-400 opacity-70' : ''
    }`}
    disabled={status.pending}
    >
      {status.pending ? tContacts("sending") : tContacts("buttonsend")}
    </button>
  )
}
