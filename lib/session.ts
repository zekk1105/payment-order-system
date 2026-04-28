export function getOrCreateSessionId(): string {
  const existing = localStorage.getItem('sessionId')
  if (existing) return existing
  const id = crypto.randomUUID()
  localStorage.setItem('sessionId', id)
  return id
}
