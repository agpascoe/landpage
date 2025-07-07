import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    // Sanitize email for filename
    const safeEmail = email.replace(/[^a-zA-Z0-9@.]/g, '_')
    const dir = path.join(process.cwd(), 'Messages')
    await fs.mkdir(dir, { recursive: true })
    const filePath = path.join(dir, `${safeEmail}.txt`)
    const content = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n`
    await fs.writeFile(filePath, content, 'utf8')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
  }
} 