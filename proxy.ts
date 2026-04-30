import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/apply', '/guide']
const ADMIN_EMAILS = ['zekk.inc1105@gmail.com']

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // /admin/* の保護：/admin/login は認証不要でスルー
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      // ログイン済み管理者が /admin/login を開いたらダッシュボードへ
      if (user && ADMIN_EMAILS.includes(user.email ?? '')) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return supabaseResponse
    }

    // それ以外の /admin/* は認証必須
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    if (!ADMIN_EMAILS.includes(user.email ?? '')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return supabaseResponse
  }

  // /apply・/guide の保護
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
