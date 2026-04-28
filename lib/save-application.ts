import { createClient } from '@/lib/supabase/client'
import { getOrCreateSessionId } from '@/lib/session'

const STORAGE_KEY = 'payment_order_application'

export async function saveApplication(step: number): Promise<void> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return
  const user = session.user

  const sessionId = getOrCreateSessionId()
  const stored = localStorage.getItem(STORAGE_KEY)
  const data = stored ? JSON.parse(stored) : {}

  const debtorName = data.debtor?.corporateName
    ? `${data.debtor.corporateName} ${data.debtor.name}`
    : (data.debtor?.name ?? '')
  const claimAmount: number = data.claim?.total || data.claim?.principal || 0

  const { error } = await supabase.from('applications').upsert(
    {
      user_id: user.id,
      session_id: sessionId,
      data,
      current_step: step,
      status: step === 8 ? 'completed' : 'draft',
      debtor_name: debtorName,
      claim_amount: claimAmount,
      payment_status: 'unpaid',
    },
    { onConflict: 'session_id' }
  )

  if (error) {
    console.error('[saveApplication] Supabase upsert error:', error.message, error.details, error.hint)
    throw new Error(`データの保存に失敗しました: ${error.message}`)
  }
}
