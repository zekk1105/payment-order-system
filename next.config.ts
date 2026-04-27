import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      canvas: { browser: './empty-module.ts' },
    },
  },
}

export default nextConfig
