import type { Metadata } from 'next'
import { connectDB } from '@/lib/db'
import Setting from '@/models/Setting'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Us | Mieux Interiors & Architects Kallachi',
  description: 'Learn about Mieux Interiors & Architects. Our team of premium designers in Kallachi custom-crafts residential, commercial and workplace spaces with material honesty.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Mieux Interiors & Architects Kallachi',
    description: 'Learn about Mieux Interiors & Architects. Our team of premium designers in Kallachi custom-crafts residential, commercial and workplace spaces with material honesty.',
    url: 'https://www.mieuxinteriors.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Mieux Interiors & Architects Kallachi',
    description: 'Learn about Mieux Interiors & Architects. Our team of premium designers in Kallachi custom-crafts residential, commercial and workplace spaces with material honesty.',
  },
}

export default async function AboutPage() {
  let aboutBgImage = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80'

  try {
    await connectDB()
    const setting = await Setting.findOne().lean()
    if (setting && setting.aboutBgImage) {
      aboutBgImage = setting.aboutBgImage
    }
  } catch (error) {
    console.error('Error loading about settings:', error)
  }

  // Schema.org Breadcrumb JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.mieuxinteriors.com',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'About Us',
        'item': 'https://www.mieuxinteriors.com/about',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient aboutBgImage={aboutBgImage} />
    </>
  )
}
