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

  // 既存レコードへのUPDATE（payment_statusは上書きしない）
  const { data: updated, error: updateError } = await supabase
    .from('applications')
    .update({
      data,
      current_step: step,
      status: step === 8 ? 'completed' : 'draft',
      debtor_name: debtorName,
      claim_amount: claimAmount,
    })
    .eq('session_id', sessionId)
    .select('id')

  if (updateError) {
    console.error('[saveApplication] Supabase update error:', updateError.message, updateError.details, updateError.hint)
    throw new Error(`データの保存に失敗しました: ${updateError.message}`)
  }

  // レコードが存在しない場合のみINSERT（初回保存時にpayment_status: 'unpaid'を設定）
  if (!updated || updated.length === 0) {
    const { error: insertError } = await supabase.from('applications').insert({
      user_id: user.id,
      session_id: sessionId,
      data,
      current_step: step,
      status: step === 8 ? 'completed' : 'draft',
      debtor_name: debtorName,
      claim_amount: claimAmount,
      payment_status: 'unpaid',
    })

    if (insertError) {
      console.error('[saveApplication] Supabase insert error:', insertError.message, insertError.details, insertError.hint)
      throw new Error(`データの保存に失敗しました: ${insertError.message}`)
    }
  }
}
