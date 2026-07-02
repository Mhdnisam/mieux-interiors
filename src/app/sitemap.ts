import type { MetadataRoute } from 'next'
import { connectDB } from '@/lib/db'
import Project from '@/models/Project'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mieuxinteriors.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  try {
    await connectDB()
    const projects = await Project.find({ status: { $in: ['featured', 'published'] } })
      .select('slug updatedAt')
      .lean()

    const projectRoutes = projects.map((project: any) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...projectRoutes]
  } catch (error) {
    console.error('Failed to generate dynamic sitemap routes:', error)
    return staticRoutes
  }
}
