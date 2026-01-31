import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getEnv(name: string, required = true): string {
  const v = process.env[name]
  if (!v && required) throw new Error(`Missing env var: ${name}`)
  return v || ''
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, website } = await req.json()

    // Honeypot (optional): bots often fill hidden fields.
    if (website) {
      return NextResponse.json({ success: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const resend = new Resend(getEnv('RESEND_API_KEY'))

    const to = getEnv('CONTACT_TO')
    // Must be a verified sender/domain in Resend.
    const from = getEnv('CONTACT_FROM')

    const subject = `New message from jagpascoe.info — ${name}`
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}\n`

    const { data, error } = await resend.emails.send({
      to,
      from,
      replyTo: email,
      subject,
      text,
    })

    if (error) {
      return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 502 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to send message'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
