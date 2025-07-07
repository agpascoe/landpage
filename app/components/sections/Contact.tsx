'use client'

import { useState } from 'react'
import { personalInfo } from '@/lib/content'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const isValid = form.name && form.email && form.message && /.+@.+\..+/.test(form.email)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setStatus('idle')
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-32 bg-white" id="contact">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            Contact
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
            Start a Conversation
          </h2>
          <p className="text-lg text-slate-600">
            Interested in working together or have a question? Reach out below or email <a href={`mailto:${personalInfo.email}`} className="text-blue-500 underline">{personalInfo.email}</a>.
          </p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Name</label>
            <input
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              onBlur={() => setTouched(t => ({ ...t, name: true }))}
              required
            />
            {touched.name && !form.name && <div className="text-red-500 text-sm mt-1">Name is required.</div>}
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Email</label>
            <input
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              required
            />
            {touched.email && !form.email && <div className="text-red-500 text-sm mt-1">Email is required.</div>}
            {touched.email && form.email && !/.+@.+\..+/.test(form.email) && <div className="text-red-500 text-sm mt-1">Enter a valid email.</div>}
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Message</label>
            <textarea
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[120px]"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              onBlur={() => setTouched(t => ({ ...t, message: true }))}
              required
            />
            {touched.message && !form.message && <div className="text-red-500 text-sm mt-1">Message is required.</div>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl transition hover:bg-blue-400 disabled:opacity-50"
            disabled={!isValid}
          >
            Send Message
          </button>
        </form>
        {status === 'success' && (
          <div className="mt-6 text-green-600 font-semibold">Message sent successfully!</div>
        )}
        {status === 'error' && (
          <div className="mt-6 text-red-600 font-semibold">There was an error sending your message. Please try again.</div>
        )}
      </div>
    </section>
  )
} 