import { stripe } from '@/lib/stripe'
import { sendPdfCompleteEmail } from '@/lib/email'
import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { userId, sessionId } = session.metadata ?? {}

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    )

    if (userId) {
      const { error } = await supabase
        .from('applications')
        .update({ payment_status: 'paid' })
        .eq('user_id', userId)
        .eq('session_id', sessionId)

      if (error) {
        console.error('Failed to update payment status:', error)
        return new Response('Internal server error', { status: 500 })
      }
    }

    const customerEmail = session.customer_details?.email
    if (customerEmail) {
      await sendPdfCompleteEmail(customerEmail)
    }
  }

  return Response.json({ received: true })
}
