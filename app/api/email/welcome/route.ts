import { sendWelcomeEmail } from '@/lib/email'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, name } = await request.json()
  await sendWelcomeEmail(email, name)
  return Response.json({ ok: true })
}
