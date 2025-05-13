// API utility functions for fetching threat news data

/**
 * News item interface
 */
export interface NewsItem {
  title: string
  description: string
  date: string
  category: string
  author: string
  readTime: string
  views: string
  image: string
  severity: "Critical" | "High" | "Medium" | "Low"
  url?: string
  source?: {
    id: string | null
    name: string
  }
  publishedAt?: string
  content?: string
  urlToImage?: string
}

/**
 * Builds the API URL with query parameters
 */
export function buildNewsApiUrl(category?: string, date?: string): string {
  const params = new URLSearchParams()
  if (category && category !== "all") {
    params.append("category", category)
  }
  if (date) {
    params.append("date", date)
  }

  const queryString = params.toString()
  return `/api/threat-news${queryString ? `?${queryString}` : ""}`
}

/**
 * Fetches threat news data from the API
 */
export async function fetchThreatNews(): Promise<NewsItem[]> {
  try {
    const apiUrl = "/api/threat-news"
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching threat news:", error)
    return []
  }
}
