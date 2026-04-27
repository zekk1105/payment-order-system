import { Court } from '@/types/application'

interface CourtEntry extends Court {
  prefecture: string
  city: string
}

const courtData: CourtEntry[] = [
  { prefecture: '北海道', city: '札幌市', name: '札幌簡易裁判所', address: '北海道札幌市中央区大通西11丁目', stampAmount: 6000 },
  { prefecture: '北海道', city: '函館市', name: '函館簡易裁判所', address: '北海道函館市新川町25-18', stampAmount: 4000 },
  { prefecture: '東京都', city: '東京都区部', name: '東京簡易裁判所', address: '東京都千代田区霞が関1-1-2', stampAmount: 6000 },
  { prefecture: '東京都', city: '八王子市', name: '八王子簡易裁判所', address: '東京都八王子市明神町4-21-1', stampAmount: 4000 },
  { prefecture: '東京都', city: '立川市', name: '立川簡易裁判所', address: '東京都立川市緑町10-4', stampAmount: 4000 },
  { prefecture: '神奈川県', city: '横浜市', name: '横浜簡易裁判所', address: '神奈川県横浜市中区寿町1-2', stampAmount: 6000 },
  { prefecture: '神奈川県', city: '川崎市', name: '川崎簡易裁判所', address: '神奈川県川崎市川崎区富士見2-1-4', stampAmount: 4000 },
  { prefecture: '神奈川県', city: '相模原市', name: '相模原簡易裁判所', address: '神奈川県相模原市中央区富士見6-1-1', stampAmount: 4000 },
  { prefecture: '大阪府', city: '大阪市', name: '大阪簡易裁判所', address: '大阪府大阪市北区西天満2-9-6', stampAmount: 6000 },
  { prefecture: '大阪府', city: '堺市', name: '堺簡易裁判所', address: '大阪府堺市堺区南瓦町2-29', stampAmount: 4000 },
  { prefecture: '愛知県', city: '名古屋市', name: '名古屋簡易裁判所', address: '愛知県名古屋市中区三の丸1-7-1', stampAmount: 6000 },
  { prefecture: '福岡県', city: '福岡市', name: '福岡簡易裁判所', address: '福岡県福岡市中央区城内1-1', stampAmount: 6000 },
  { prefecture: '宮城県', city: '仙台市', name: '仙台簡易裁判所', address: '宮城県仙台市青葉区片平1-6-1', stampAmount: 6000 },
]

export function findCourt(prefecture: string, city: string): Court | null {
  const normalized = city.trim()
  const entry = courtData.find(
    (c) => c.prefecture === prefecture && (normalized.startsWith(c.city.replace('市', '')) || c.city.includes(normalized))
  )
  if (entry) {
    return { name: entry.name, address: entry.address, stampAmount: entry.stampAmount }
  }
  const prefEntry = courtData.find((c) => c.prefecture === prefecture)
  if (prefEntry) {
    return { name: prefEntry.name, address: prefEntry.address, stampAmount: prefEntry.stampAmount }
  }
  return null
}

export const prefectures = [
  '北海道', '東京都', '神奈川県', '大阪府', '愛知県', '福岡県', '宮城県',
  '青森県', '岩手県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '静岡県', '三重県', '滋賀県', '京都府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

export { courtData }
