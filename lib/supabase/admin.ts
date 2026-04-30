import { createClient } from '@supabase/supabase-js'

/**
 * Service Role クライアント — RLS を迂回して全データにアクセス可能。
 * サーバーサイド（API Route / Server Component）でのみ使用すること。
 * クライアントコンポーネントや外部に SUPABASE_SERVICE_ROLE_KEY を露出させないこと。
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
