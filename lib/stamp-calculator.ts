export function calcStamp(amount: number): number {
  if (amount <= 0) return 0

  if (amount <= 1_000_000) {
    return Math.ceil(amount / 100_000) * 500
  } else if (amount <= 5_000_000) {
    const base = 5000
    const excess = amount - 1_000_000
    return base + Math.ceil(excess / 200_000) * 500
  } else {
    const base = 15000
    const excess = amount - 5_000_000
    return base + Math.ceil(excess / 500_000) * 1000
  }
}

export function calcInterest(
  principal: number,
  ratePercent: number,
  startDate: string,
  endDate: string
): number {
  if (!startDate || !endDate || principal <= 0 || ratePercent <= 0) return 0

  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.max(0, Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))

  return Math.floor((principal * (ratePercent / 100) * days) / 365)
}
