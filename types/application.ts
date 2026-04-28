export type ClaimType = 'personal_loan' | 'accounts_receivable' | 'rent_arrears'

export type PartyType = 'individual' | 'corporation'

export interface Creditor {
  partyType: PartyType
  name: string
  furigana: string
  postalCode: string
  address: string
  phone: string
  corporateName?: string
  representativeName?: string
}

export interface Debtor {
  partyType: PartyType
  name: string
  furigana: string
  postalCode: string
  phone: string
  address: string
  prefecture: string
  city: string
  corporateName?: string
  representativeName?: string
}

export interface Court {
  name: string
  address: string
  stampAmount: number
}

export interface ClaimContent {
  claimType: ClaimType
  principal: number
  interestRate: number
  delayInterestRate: number
  loanDate: string
  dueDate: string
  delayDamage: number
  total: number
  description: string
  overdueMonths: number
}

export interface Evidence {
  number: number
  description: string
}

export interface Step1Data {
  knowsAddress: boolean | null
  amountFixed: boolean | null
  clearlyRefused: boolean | null
}

export interface Application {
  step1: Step1Data
  creditor: Creditor
  debtor: Debtor
  court: Court | null
  claim: ClaimContent
  claimReason: string
  evidences: Evidence[]
  checklist: boolean[]
}

export const defaultApplication: Application = {
  step1: {
    knowsAddress: null,
    amountFixed: null,
    clearlyRefused: null,
  },
  creditor: {
    partyType: 'individual',
    name: '',
    furigana: '',
    postalCode: '',
    address: '',
    phone: '',
    corporateName: '',
    representativeName: '',
  },
  debtor: {
    partyType: 'individual',
    name: '',
    furigana: '',
    postalCode: '',
    phone: '',
    address: '',
    prefecture: '',
    city: '',
    corporateName: '',
    representativeName: '',
  },
  court: null,
  claim: {
    claimType: 'personal_loan',
    principal: 0,
    interestRate: 0,
    delayInterestRate: 3,
    loanDate: '',
    dueDate: '',
    delayDamage: 0,
    total: 0,
    description: '',
    overdueMonths: 0,
  },
  claimReason: '',
  evidences: [],
  checklist: [false, false, false, false, false, false],
}
