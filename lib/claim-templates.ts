import { ClaimType } from '@/types/application'

interface TemplateParams {
  creditorName: string
  debtorName: string
  principal: number
  interestRate: number
  delayInterestRate: number
  loanDate: string
  dueDate: string
  claimType: ClaimType
}

function formatAmount(n: number): string {
  return n.toLocaleString('ja-JP')
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '〇〇年〇〇月〇〇日'
  const d = new Date(dateStr)
  return `令和${d.getFullYear() - 2018}年${d.getMonth() + 1}月${d.getDate()}日`
}

export function generateClaimReason(params: TemplateParams): string {
  const { creditorName, debtorName, principal, interestRate, delayInterestRate, loanDate, dueDate, claimType } = params

  switch (claimType) {
    case 'personal_loan':
      return generatePersonalLoan(creditorName, debtorName, principal, interestRate, delayInterestRate, loanDate, dueDate)
    case 'accounts_receivable':
      return generateAccountsReceivable(creditorName, debtorName, principal, interestRate, delayInterestRate, loanDate, dueDate)
    case 'rent_arrears':
      return generateRentArrears(creditorName, debtorName, principal, delayInterestRate, loanDate, dueDate)
    default:
      return ''
  }
}

function generatePersonalLoan(
  creditorName: string,
  debtorName: string,
  principal: number,
  interestRate: number,
  delayInterestRate: number,
  loanDate: string,
  dueDate: string
): string {
  return `第１　貸付の事実
申立人（${creditorName}）は、相手方（${debtorName}）に対し、${formatDate(loanDate)}、金${formatAmount(principal)}円を、利息年${interestRate}パーセント、弁済期${formatDate(dueDate)}、遅延損害金年${delayInterestRate}パーセントの約定で貸し渡した。

第２　返還の請求
申立人は、相手方に対し、上記弁済期に上記貸付金の返還を求めたが、相手方はこれに応じず、現在に至るまで全く返還しない。

第３　よって
申立人は、相手方に対し、上記貸付金の返還並びに約定利息及び遅延損害金の支払を求めるため、本申立てに及んだものである。`
}

function generateAccountsReceivable(
  creditorName: string,
  debtorName: string,
  principal: number,
  interestRate: number,
  delayInterestRate: number,
  serviceDate: string,
  dueDate: string
): string {
  return `第１　取引の事実
申立人（${creditorName}）は、相手方（${debtorName}）との間で、${formatDate(serviceDate)}、売買（業務委託）契約を締結し、同日以降、相手方に対して商品の引渡し（役務の提供）を行った。

第２　代金（報酬）の約定
上記取引にかかる代金（報酬）は金${formatAmount(principal)}円であり、支払期日は${formatDate(dueDate)}と約定された。なお、支払遅延の場合には年${delayInterestRate}パーセントの割合による遅延損害金を支払う旨の約定がある。

第３　支払の懈怠
申立人は、相手方に対し、上記支払期日が到来した後も再三にわたり支払を催告したが、相手方は現在に至るまで一切の支払をしない。

第４　よって
申立人は、相手方に対し、上記売掛代金（業務委託報酬）並びに遅延損害金の支払を求めるため、本申立てに及んだものである。`
}

function generateRentArrears(
  creditorName: string,
  debtorName: string,
  rentAmount: number,
  delayInterestRate: number,
  startDate: string,
  dueDate: string
): string {
  return `第１　賃貸借契約の締結
申立人（${creditorName}）は、相手方（${debtorName}）との間で、不動産賃貸借契約を締結し、上記物件を賃貸している。月額賃料は金${formatAmount(rentAmount)}円であり、毎月末日までに翌月分を支払う旨の約定がある。

第２　賃料不払の事実
相手方は、${formatDate(startDate)}分以降の賃料を一切支払わず、${formatDate(dueDate)}現在、合計金${formatAmount(rentAmount)}円の滞納がある。遅延損害金は年${delayInterestRate}パーセントの割合による。

第３　支払の催告
申立人は、相手方に対し、再三にわたり上記滞納賃料の支払を催告したが、相手方はこれに応じない。

第４　よって
申立人は、相手方に対し、上記滞納賃料並びに遅延損害金の支払を求めるため、本申立てに及んだものである。`
}
