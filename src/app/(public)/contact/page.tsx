import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us & Book Consultation | Mieux Interiors & Architects',
  description: 'Book a design consultation with Mieux Interiors & Architects. Visit our studio in Kallachi, Kozhikode or submit your design enquiry online.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us & Book Consultation | Mieux Interiors & Architects',
    description: 'Book a design consultation with Mieux Interiors & Architects. Visit our studio in Kallachi, Kozhikode or submit your design enquiry online.',
    url: 'https://www.mieuxinteriors.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us & Book Consultation | Mieux Interiors & Architects',
    description: 'Book a design consultation with Mieux Interiors & Architects. Visit our studio in Kallachi, Kozhikode or submit your design enquiry online.',
  },
}

export default function ContactPage() {
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
        'name': 'Contact Us',
        'item': 'https://www.mieuxinteriors.com/contact',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  )
}
