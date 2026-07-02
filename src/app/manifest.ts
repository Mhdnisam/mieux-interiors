import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mieux Interiors & Architects',
    short_name: 'Mieux Interiors',
    description: 'Trusted design studio crafting premium residential and commercial spaces in Kallachi, Kerala.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f3ed', // matches var(--bg-warm)
    theme_color: '#8a6a4a', // matches var(--primary-color)
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
