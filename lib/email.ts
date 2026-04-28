import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'onboarding@resend.dev'

export async function sendWelcomeEmail(email: string, name?: string): Promise<void> {
  const displayName = name ?? 'お客様'
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: '【支払督促かんたん作成】ご登録ありがとうございます',
      text: [
        `${displayName}様`,
        '',
        '支払督促かんたん作成へのご登録ありがとうございます。',
        '申立書の作成はこちらから始めてください。',
        '',
        '▼ 申立書を作成する',
        'https://payment-order-system.vercel.app/apply/step1',
        '',
        'ご不明な点がございましたら、本メールにご返信ください。',
        '',
        '※本サービスは書類作成の補助ツールです。',
        '　法的助言を行うものではありません。',
        '',
        '支払督促かんたん作成 運営チーム',
      ].join('\n'),
    })
  } catch (err) {
    console.error('Failed to send welcome email:', err)
  }
}

export async function sendPdfCompleteEmail(email: string, name?: string): Promise<void> {
  const displayName = name ?? 'お客様'
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: '【支払督促かんたん作成】申立書が完成しました',
      text: [
        `${displayName}様`,
        '',
        '申立書のPDFが完成しました。',
        '以下の手順で裁判所へご提出ください。',
        '',
        '▼ 提出手順を確認する',
        'https://payment-order-system.vercel.app/guide',
        '',
        '【提出に必要なもの】',
        '・完成した申立書（2部印刷）',
        '・収入印紙',
        '・郵便切手',
        '・証拠書類のコピー',
        '',
        '※本サービスは書類作成の補助ツールです。',
        '　法的助言を行うものではありません。',
        '',
        '支払督促かんたん作成 運営チーム',
      ].join('\n'),
    })
  } catch (err) {
    console.error('Failed to send PDF complete email:', err)
  }
}
