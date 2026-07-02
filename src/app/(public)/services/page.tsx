import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title: 'Our Services | Architecture & Interior Design Kallachi',
  description: 'Mieux Interiors & Architects offers architectural planning, residential design, luxury home styling, corporate office spaces, and custom carpentry in Kallachi, Kerala.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Our Services | Architecture & Interior Design Kallachi',
    description: 'Mieux Interiors & Architects offers architectural planning, residential design, luxury home styling, corporate office spaces, and custom carpentry in Kallachi, Kerala.',
    url: 'https://www.mieuxinteriors.com/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Architecture & Interior Design Kallachi',
    description: 'Mieux Interiors & Architects offers architectural planning, residential design, luxury home styling, corporate office spaces, and custom carpentry in Kallachi, Kerala.',
  },
}

export default function ServicesPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'numberOfItems': 2,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@type': 'Service',
          'name': 'Residential Architecture & Interiors',
          'description': 'We plan homes that respond to the environment and look gorgeous. Our design includes site analysis, structural coordination, bespoke interiors, and custom furniture fabrication.',
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'Mieux Interiors & Architects',
            'image': 'https://www.mieuxinteriors.com/icon.png',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Opposite of Valayam Road',
              'addressLocality': 'Kallachi',
              'addressRegion': 'Kerala',
              'addressCountry': 'IN',
            },
          },
        },
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'item': {
          '@type': 'Service',
          'name': 'Commercial & Office Workspaces',
          'description': 'Workspaces need flow, acoustic control, and aesthetic energy. We design corporate offices, showrooms, and retail stores that increase productivity and enhance branding.',
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'Mieux Interiors & Architects',
            'image': 'https://www.mieuxinteriors.com/icon.png',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Opposite of Valayam Road',
              'addressLocality': 'Kallachi',
              'addressRegion': 'Kerala',
              'addressCountry': 'IN',
            },
          },
        },
      },
    ],
  }

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
        'name': 'Services',
        'item': 'https://www.mieuxinteriors.com/services',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesClient />
    </>
  )
}
