import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword } from '@/lib/validators'

describe('validateEmail', () => {
  it('test@example.com は正常', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })

  it('test は不正', () => {
    expect(validateEmail('test')).toBe(false)
  })

  it('test@ は不正', () => {
    expect(validateEmail('test@')).toBe(false)
  })

  it('空文字は不正', () => {
    expect(validateEmail('')).toBe(false)
  })
})

describe('validatePassword', () => {
  it('Password1 は正常（8文字・英数字混在）', () => {
    expect(validatePassword('Password1')).toBe(true)
  })

  it('password は不正（数字なし）', () => {
    expect(validatePassword('password')).toBe(false)
  })

  it('12345678 は不正（英字なし）', () => {
    expect(validatePassword('12345678')).toBe(false)
  })

  it('Pass1 は不正（7文字以下）', () => {
    expect(validatePassword('Pass1')).toBe(false)
  })

  it('Password は不正（8文字・数字なし）', () => {
    expect(validatePassword('Password')).toBe(false)
  })

  it('Passwor1 は正常（8文字・英数字混在）', () => {
    expect(validatePassword('Passwor1')).toBe(true)
  })
})
