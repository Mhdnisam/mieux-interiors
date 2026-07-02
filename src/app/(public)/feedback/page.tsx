import type { Metadata } from 'next'
import FeedbackClient from './FeedbackClient'

export const metadata: Metadata = {
  title: 'Client Reviews & Feedback | Mieux Interiors & Architects',
  description: 'Read reviews from our clients in Kallachi and Kozhikode, and share your experience design with Mieux Interiors & Architects.',
  alternates: {
    canonical: '/feedback',
  },
  openGraph: {
    title: 'Client Reviews & Feedback | Mieux Interiors & Architects',
    description: 'Read reviews from our clients in Kallachi and Kozhikode, and share your experience design with Mieux Interiors & Architects.',
    url: 'https://www.mieuxinteriors.com/feedback',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Reviews & Feedback | Mieux Interiors & Architects',
    description: 'Read reviews from our clients in Kallachi and Kozhikode, and share your experience design with Mieux Interiors & Architects.',
  },
}

export default function FeedbackPage() {
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
        'name': 'Feedback & Reviews',
        'item': 'https://www.mieuxinteriors.com/feedback',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FeedbackClient />
    </>
  )
}
