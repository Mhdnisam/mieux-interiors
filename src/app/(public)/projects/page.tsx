import type { Metadata } from 'next'
import { connectDB } from '@/lib/db'
import Project from '@/models/Project'
import ProjectsClient from './ProjectsClient'

export const revalidate = 0 // Ensure fresh projects lists

export const metadata: Metadata = {
  title: 'Our Design Portfolio | Mieux Interiors & Architects',
  description: 'Explore architectural commissions and interior design assignments completed by Mieux Interiors & Architects across Kallachi and Kozhikode, Kerala.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Our Design Portfolio | Mieux Interiors & Architects',
    description: 'Explore architectural commissions and interior design assignments completed by Mieux Interiors & Architects across Kallachi and Kozhikode, Kerala.',
    url: 'https://www.mieuxinteriors.com/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Design Portfolio | Mieux Interiors & Architects',
    description: 'Explore architectural commissions and interior design assignments completed by Mieux Interiors & Architects across Kallachi and Kozhikode, Kerala.',
  },
}

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

const serialize = (data: any) => JSON.parse(JSON.stringify(data))

export default async function PublicProjectsPage() {
  let projects = FALLBACK_PROJECTS

  try {
    await connectDB()
    const projectCount = await Project.countDocuments()
    if (projectCount > 0) {
      const dbProjects = await Project.find({ status: { $in: ['published', 'featured'] } })
        .sort({ status: 1, createdAt: -1 })
        .lean()
      projects = dbProjects.length > 0 ? (dbProjects as any) : FALLBACK_PROJECTS
    }
  } catch (error) {
    console.error('Error loading projects list:', error)
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
        'name': 'Portfolio',
        'item': 'https://www.mieuxinteriors.com/projects',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectsClient initialProjects={serialize(projects)} />
    </>
  )
}
