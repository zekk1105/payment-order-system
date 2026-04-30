export interface PostalCodeResult {
  prefecture: string // 都道府県
  city: string       // 市区町村
  town: string       // 町域
}

/**
 * ZipCloud API（無料・APIキー不要）で郵便番号から住所を取得する
 * https://zipcloud.ibsnet.co.jp/
 */
export async function lookupPostalCode(
  postalCode: string
): Promise<PostalCodeResult | null> {
  const digits = postalCode.replace(/[^\d]/g, '')
  if (digits.length !== 7) return null

  try {
    const res = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`
    )
    if (!res.ok) return null

    const data = await res.json()
    if (!data.results || data.results.length === 0) return null

    const r = data.results[0]
    return {
      prefecture: r.address1 ?? '',
      city: r.address2 ?? '',
      town: r.address3 ?? '',
    }
  } catch {
    return null
  }
}
