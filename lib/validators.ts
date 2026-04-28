export function validateEmail(email: string): boolean {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password: string): boolean {
  if (password.length < 8) return false
  if (!/[a-zA-Z]/.test(password)) return false
  if (!/[0-9]/.test(password)) return false
  return true
}
