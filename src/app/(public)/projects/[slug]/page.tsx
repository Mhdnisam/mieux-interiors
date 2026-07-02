import type { Metadata } from 'next'
import { connectDB } from '@/lib/db'
import Project from '@/models/Project'
import ProjectDetailsClient from './ProjectDetailsClient'
import { notFound } from 'next/navigation'

export const revalidate = 0 // Ensure fresh project details on each request

interface Props {
  params: Promise<{ slug: string }>
}

const FALLBACK_MAP: Record<string, any> = {
  'the-bronze-villa': {
    title: 'The Bronze Villa',
    category: 'residential',
    location: 'Kallachi',
    shortDescription: 'A luxurious 4 BHK residential project featuring earthy tones and premium bronze accents.',
    fullDescription: 'The Bronze Villa is designed to merge luxury with warmth. Every element in this home is carefully selected to reflect natural materials, with solid timber finishes, earthy olive accents, and custom bronze fixtures. The spatial layout is open, welcoming ample natural light throughout the double-height living room and dining spaces.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    ],
    year: 2025,
    area: '3,800 sq ft',
    styleTags: ['Modern', 'Bronze Accent', 'Warm Minimalist'],
  },
  'earthy-slate-studio': {
    title: 'Earthy Slate Studio',
    category: 'commercial',
    location: 'Kallachi, Kerala',
    shortDescription: 'An ergonomic, productive office space for a creative design agency with natural accents.',
    fullDescription: 'Earthy Slate Studio is a workplace that fosters productivity and creativity. Employing an open floor plan, acoustic wood paneling, slate-gray floor tiles, and custom linear lighting. The office features multiple collaborative pods, private call chambers, and a central social kitchen area that acts as the hub of the agency.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    ],
    year: 2024,
    area: '2,200 sq ft',
    styleTags: ['Ergonomic', 'Industrial', 'Creative'],
  },
  'olive-harmony-residence': {
    title: 'Olive Harmony Residence',
    category: 'interior',
    location: 'Kozhikode, Kerala',
    shortDescription: 'Custom interior styling prioritizing material balance, natural ventilation, and muted olives.',
    fullDescription: 'Olive Harmony Residence is an interior-only project designed for a family of four. It emphasizes material honesty and spatial efficiency. Custom-crafted wardrobes, cane sliding partitions, and a soothing color palette dominated by muted olive and warm white create a sanctuary-like atmosphere.',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80',
    ],
    year: 2025,
    area: '1,950 sq ft',
    styleTags: ['Custom Furniture', 'Warm White', 'Tropical Modernism'],
  },
}

async function getProjectData(slug: string) {
  try {
    await connectDB()
    const dbProject = await Project.findOne({ slug: slug }).lean()
    if (dbProject) return dbProject
  } catch (error) {
    console.error('Error fetching project by slug:', error)
  }
  return FALLBACK_MAP[slug] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const project = await getProjectData(decodedSlug)

  if (!project) {
    return {
      title: 'Project Not Found | Mieux Interiors',
    }
  }

  const title = `${project.title} | Mieux Interiors & Architects`
  const description = project.shortDescription || `Detail view of project ${project.title} designed by Mieux Interiors.`
  const imageUrl = project.coverImage || 'https://www.mieuxinteriors.com/icon.png'

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.mieuxinteriors.com/projects/${slug}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

const serialize = (data: any) => JSON.parse(JSON.stringify(data))

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const project = await getProjectData(decodedSlug)

  if (!project) {
    notFound()
  }

  // Schema.org CreativeWork & Breadcrumb schemas
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': project.title,
    'description': project.shortDescription,
    'image': project.coverImage,
    'locationCreated': {
      '@type': 'Place',
      'name': project.location,
    },
    'genre': project.category,
    'creator': {
      '@type': 'LocalBusiness',
      'name': 'Mieux Interiors & Architects',
    },
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
      {
        '@type': 'ListItem',
        'position': 3,
        'name': project.title,
        'item': `https://www.mieuxinteriors.com/projects/${slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectDetailsClient project={serialize(project)} />
    </>
  )
}
