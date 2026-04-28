import { stripe } from '@/lib/stripe'
import { NextRequest } from 'next/server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function POST(request: NextRequest) {
  const { userId, sessionId } = await request.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: '支払督促申立書 作成サービス',
          },
          unit_amount: 9800,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/apply/step8?success=true`,
    cancel_url: `${baseUrl}/apply/step8?canceled=true`,
    metadata: {
      userId: userId ?? '',
      sessionId: sessionId ?? '',
    },
  })

  return Response.json({ url: session.url })
}
