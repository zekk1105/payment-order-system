'use client'

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import { Application } from '@/types/application'
import { calcStamp } from '@/lib/stamp-calculator'

Font.register({
  family: 'NotoSansJP',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/notosansjp/v56/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/notosansjp/v56/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFPYk75s.ttf',
      fontWeight: 'bold',
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansJP',
    fontSize: 10,
    padding: 40,
    lineHeight: 1.8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'NotoSansJP',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'NotoSansJP',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#1e3a5f',
    paddingBottom: 3,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 120,
    color: '#666',
  },
  value: {
    flex: 1,
  },
  claimText: {
    whiteSpace: 'pre-wrap',
    lineHeight: 1.8,
  },
  evidenceRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  evidenceNum: {
    width: 80,
  },
  disclaimer: {
    marginTop: 20,
    padding: 8,
    backgroundColor: '#f9fafb',
    fontSize: 8,
    color: '#888',
    textAlign: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
})

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

interface Props {
  application: Application
}

export function PaymentOrderDocument({ application }: Props) {
  const { creditor, debtor, court, claim, claimReason, evidences } = application
  const stampAmount = calcStamp(claim.total || claim.principal)
  const postalAmount = court?.stampAmount ?? 6000

  const creditorDisplay = creditor.corporateName
    ? `${creditor.corporateName} 代表 ${creditor.name}`
    : creditor.name

  const debtorDisplay = debtor.corporateName
    ? `${debtor.corporateName} 代表 ${debtor.name}`
    : debtor.name

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>支払督促申立書（下書き）</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>申立人（債権者）</Text>
          {creditor.corporateName && (
            <View style={styles.row}>
              <Text style={styles.label}>法人名</Text>
              <Text style={styles.value}>{creditor.corporateName}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>氏名</Text>
            <Text style={styles.value}>{creditor.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>住所</Text>
            <Text style={styles.value}>{creditor.address}</Text>
          </View>
          {creditor.phone && (
            <View style={styles.row}>
              <Text style={styles.label}>電話番号</Text>
              <Text style={styles.value}>{creditor.phone}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>相手方（債務者）</Text>
          {debtor.corporateName && (
            <View style={styles.row}>
              <Text style={styles.label}>法人名</Text>
              <Text style={styles.value}>{debtor.corporateName}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>氏名</Text>
            <Text style={styles.value}>{debtor.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>住所</Text>
            <Text style={styles.value}>{`${debtor.prefecture}${debtor.city} ${debtor.address}`}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>請求の趣旨</Text>
          <Text>
            相手方は申立人に対し、金{(claim.total || claim.principal).toLocaleString()}円
            {claim.delayDamage > 0 ? `（うち遅延損害金${claim.delayDamage.toLocaleString()}円を含む）` : ''}
            を支払え。
          </Text>
          <Text>申立費用は相手方の負担とする。</Text>
          <Text>との支払督促を求める。</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>請求金額の内訳</Text>
          <View style={styles.amountRow}>
            <Text>元金</Text>
            <Text>{claim.principal.toLocaleString()} 円</Text>
          </View>
          {claim.delayDamage > 0 && (
            <View style={styles.amountRow}>
              <Text>遅延損害金（参考）</Text>
              <Text>{claim.delayDamage.toLocaleString()} 円</Text>
            </View>
          )}
          <View style={styles.amountRow}>
            <Text>合計</Text>
            <Text>{(claim.total || claim.principal).toLocaleString()} 円</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>請求の原因</Text>
          <Text style={styles.claimText}>{claimReason}</Text>
        </View>

        {evidences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>証拠書類</Text>
            {evidences.map((e) => (
              <View key={e.number} style={styles.evidenceRow}>
                <Text style={styles.evidenceNum}>甲第{e.number}号証</Text>
                <Text>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>申立費用</Text>
          <View style={styles.amountRow}>
            <Text>収入印紙代</Text>
            <Text>{stampAmount.toLocaleString()} 円</Text>
          </View>
          <View style={styles.amountRow}>
            <Text>郵券</Text>
            <Text>{postalAmount.toLocaleString()} 円</Text>
          </View>
        </View>

        {court && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>提出先裁判所</Text>
            <Text>{court.name}</Text>
            <Text style={{ color: '#666', fontSize: 9 }}>{court.address}</Text>
          </View>
        )}

        <Text style={styles.disclaimer}>
          本書類は支払督促申立書の下書きです。法的助言を行うものではありません。提出前に内容をご確認のうえ、必要に応じて専門家にご相談ください。
        </Text>
      </Page>
    </Document>
  )
}
