'use client'

import { FormEvent, useRef, useState } from 'react'

export function ContactForm({ dict }: { dict: any }) {
  const [sent, setSent] = useState(false)

  const fields = [
    { id: 'nombre', label: dict.nameLabel, type: 'text', autoComplete: 'name' },
    {
      id: 'correo',
      label: dict.emailLabel || 'CORREO CORPORATIVO',
      type: 'email',
      autoComplete: 'email',
    },
    { id: 'empresa', label: dict.companyLabel || 'EMPRESA', type: 'text', autoComplete: 'organization' },
  ]

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="mx-auto flex w-full max-w-sm flex-col gap-6"
    >
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-3">
          <label
            htmlFor={field.id}
            className="text-xs font-bold tracking-wider text-navy-deep"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            required
            autoComplete={field.autoComplete}
            className="border-b border-navy-deep/20 bg-transparent py-2 text-base text-navy-deep transition-colors focus:border-brick focus:outline-none focus:ring-0"
          />
        </div>
      ))}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="detalles"
          className="text-xs font-bold tracking-wider text-navy-deep"
        >
          {dict.detailsLabel}
        </label>
        <textarea
          id="detalles"
          name="detalles"
          required
          rows={3}
          className="resize-none border-b border-navy-deep/20 bg-transparent py-2 text-base text-navy-deep transition-colors focus:border-brick focus:outline-none focus:ring-0"
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          type="submit"
          className="w-full max-w-[200px] border-2 border-brick bg-transparent px-4 py-3 text-xs font-bold uppercase tracking-widest text-navy-deep transition-colors hover:bg-brick hover:text-white"
        >
          {sent ? dict.successMessage : dict.submitButton}
        </button>
        <p role="status" aria-live="polite" className="text-xs text-navy-deep">
          {sent ? dict.successMessage : ''}
        </p>
      </div>
    </form>
  )
}
