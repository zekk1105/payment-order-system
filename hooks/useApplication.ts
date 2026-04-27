'use client'

import { useState, useEffect, useCallback } from 'react'
import { Application, defaultApplication } from '@/types/application'

const STORAGE_KEY = 'payment_order_application'

export function useApplication() {
  const [application, setApplication] = useState<Application>(defaultApplication)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setApplication(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
    setLoaded(true)
  }, [])

  const updateApplication = useCallback((updates: Partial<Application>) => {
    setApplication((prev) => {
      const next = { ...prev, ...updates }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const resetApplication = useCallback(() => {
    setApplication(defaultApplication)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { application, updateApplication, resetApplication, loaded }
}
