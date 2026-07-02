import type { Metadata } from 'next'
import { connectDB } from '@/lib/db'
import Setting from '@/models/Setting'
import Project from '@/models/Project'
import Testimonial from '@/models/Testimonial'
import Service from '@/models/Service'
import HomePageClient from '@/components/public/HomePageClient'

export const revalidate = 0 // Ensure fresh data on each page request

export const metadata: Metadata = {
  title: 'Mieux Interiors & Architects | Architectural Designer | Kallachi',
  description: 'Mieux Interiors & Architects is a trusted premium architectural design and interior design studio in Kallachi, Kozhikode. Custom home plans, corporate workspaces, and luxury timber joinery.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mieux Interiors & Architects | Architectural Designer | Kallachi',
    description: 'Mieux Interiors & Architects is a trusted premium architectural design and interior design studio in Kallachi, Kozhikode. Custom home plans, corporate workspaces, and luxury timber joinery.',
    url: 'https://www.mieuxinteriors.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mieux Interiors & Architects | Architectural Designer | Kallachi',
    description: 'Mieux Interiors & Architects is a trusted premium architectural design and interior design studio in Kallachi, Kozhikode. Custom home plans, corporate workspaces, and luxury timber joinery.',
  },
}

const DEFAULT_HERO_BG_IMAGE = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80'
const DEFAULT_PHILOSOPHY_BG_IMAGE = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    title: 'The Bronze Villa',
    slug: 'the-bronze-villa',
    category: 'residential',
    location: 'Kallachi',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'A luxurious 4 BHK residential project featuring earthy tones and premium bronze accents.',
  },
  {
    _id: '2',
    title: 'Earthy Slate Studio',
    slug: 'earthy-slate-studio',
    category: 'commercial',
    location: 'Kallachi, Kerala',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'An ergonomic, productive office space for a creative design agency with natural accents.',
  },
  {
    _id: '3',
    title: 'Olive Harmony Residence',
    slug: 'olive-harmony-residence',
    category: 'interior',
    location: 'Kozhikode, Kerala',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Custom interior styling prioritizing material balance, natural ventilation, and muted olives.',
  },
]

const FALLBACK_TESTIMONIALS = [
  {
    _id: '1',
    name: 'Dr. Anoop Rahman',
    place: 'Kallachi',
    quote: 'Mieux Interiors completely transformed our vision for our home. The attention to detail and choice of warm materials like bronze and oak exceeded our expectations.',
    rating: 5,
  },
  {
    _id: '2',
    name: 'Mariyam N.',
    place: 'Kallachi',
    quote: 'Highly recommended professional team. The office layout they designed is functional, elegant, and our staff absolutely loves the collaborative hubs.',
    rating: 5,
  },
]

const FALLBACK_SERVICES = [
  {
    _id: 's1',
    title: 'Residential Architecture & Interiors',
    description: 'Bespoke villas, luxury apartments, tailored wooden carpentry, and residential architectural planning customized to reflect family lifestyles.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    linkUrl: '/services',
  },
  {
    _id: 's2',
    title: 'Commercial & Corporate Workspaces',
    description: 'Highly functional, productive corporate offices and commercial retail layouts emphasizing ergonomic layout and flow.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    linkUrl: '/services',
  },
]

const serialize = (data: any) => JSON.parse(JSON.stringify(data))

export default async function HomePage() {
  let heroBgImage = DEFAULT_HERO_BG_IMAGE
  let philosophyBgImage = DEFAULT_PHILOSOPHY_BG_IMAGE
  let philosophyHeading = 'Bespoke Spaces Designed For Inspired Living'
  let philosophyDescription = 'At Mieux Interiors & Architects, we believe that design should be a direct reflection of its context, material, and user. We balance raw organic textures with premium materials like oak wood and custom bronze to create environments that are both functional and inspiring.\n\nWhether designing a private residence or a commercial workspace in Kallachi, our dedicated team handles every step from conceptualization to execution with absolute precision.'
  
  let heroSubtitle = 'Architectural Designer • Kallachi'
  let heroHeading = 'Quality. Creativity. Perfection.'
  let heroDescription = 'Trusted design studio crafting premium residential and commercial spaces with material honesty and aesthetic balance.'
  
  let projects = FALLBACK_PROJECTS
  let testimonials = FALLBACK_TESTIMONIALS
  let services = FALLBACK_SERVICES

  try {
    await connectDB()

    // 1. Fetch settings
    const setting = await Setting.findOne().lean()
    if (setting) {
      if (setting.heroBgImage) heroBgImage = setting.heroBgImage
      if (setting.philosophyBgImage) philosophyBgImage = setting.philosophyBgImage
      if (setting.philosophyHeading) philosophyHeading = setting.philosophyHeading
      if (setting.philosophyDescription) philosophyDescription = setting.philosophyDescription
      if (setting.heroSubtitle) heroSubtitle = setting.heroSubtitle
      if (setting.heroHeading) heroHeading = setting.heroHeading
      if (setting.heroDescription) heroDescription = setting.heroDescription
    }

    // 2. Fetch projects
    const projectCount = await Project.countDocuments()
    if (projectCount > 0) {
      const dbProjects = await Project.find({ status: { $in: ['featured', 'published'] } })
        .sort({ status: 1, createdAt: -1 })
        .lean()
      projects = dbProjects.slice(0, 3) as any
    }

    // 3. Fetch testimonials
    const testimonialCount = await Testimonial.countDocuments()
    if (testimonialCount > 0) {
      const dbTestimonials = await Testimonial.find().lean()
      testimonials = dbTestimonials as any
    }

    // 4. Fetch services
    const serviceCount = await Service.countDocuments()
    if (serviceCount > 0) {
      const dbServices = await Service.find({ active: true }).lean()
      services = dbServices as any
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
  }

  // Schema.org Website, Organization & Local Business structured data
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'InteriorDesigner',
    '@id': 'https://www.mieuxinteriors.com/#localbusiness',
    'name': 'Mieux Interiors & Architects',
    'description': 'Trusted design studio crafting premium residential and commercial spaces in Kallachi, Kozhikode, Kerala.',
    'url': 'https://www.mieuxinteriors.com',
    'logo': 'https://www.mieuxinteriors.com/icon.png',
    'image': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    'telephone': '+919744335051',
    'email': 'mieuxinterior@gmail.com',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Opposite of Valayam Road, Kallachi',
      'addressLocality': 'Kallachi',
      'addressRegion': 'Kerala',
      'postalCode': '673506',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '11.6920409',
      'longitude': '75.6672675',
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      'opens': '09:00',
      'closes': '18:00',
    },
    'sameAs': [
      'https://www.instagram.com/mieux_interiors',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.mieuxinteriors.com/#website',
    'name': 'Mieux Interiors & Architects',
    'url': 'https://www.mieuxinteriors.com',
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.mieuxinteriors.com/#organization',
    'name': 'Mieux Interiors & Architects',
    'url': 'https://www.mieuxinteriors.com',
    'logo': 'https://www.mieuxinteriors.com/icon.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+919744335051',
      'contactType': 'customer service',
      'areaServed': 'IN',
      'availableLanguage': ['English', 'Malayalam'],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main style={{ backgroundColor: 'var(--bg-warm)', minHeight: '100vh' }}>
        <HomePageClient
          initialHeroBgImage={heroBgImage}
          initialPhilosophyBgImage={philosophyBgImage}
          initialPhilosophyHeading={philosophyHeading}
          initialPhilosophyDescription={philosophyDescription}
          initialHeroSubtitle={heroSubtitle}
          initialHeroHeading={heroHeading}
          initialHeroDescription={heroDescription}
          initialProjects={serialize(projects)}
          initialTestimonials={serialize(testimonials)}
          initialServices={serialize(services)}
        />
      </main>
    </>
  )
}
