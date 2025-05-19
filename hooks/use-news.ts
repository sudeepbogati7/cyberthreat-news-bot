import useSWR from "swr"

// Define the news article type based on the API response
export interface NewsArticle {
  status: string
  message: string
  data: Array<{
    source: {
      id: string | null
      name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
  }>
}

// Define the transformed article type for our UI
export interface TransformedArticle {
  title: string
  description: string
  image: string
  author: string
  date: string
  url: string
  category: string
  severity: string
  readTime: string
  views: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/v1"

// The fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch news data: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

// Function to determine category based on title and description
const determineCategory = (article: {
  title: string
  description: string
}): string => {
  const text = (article.title + " " + article.description).toLowerCase()

  if (text.includes("ransomware") || text.includes("ransom")) {
    return "ransomware"
  } else if (text.includes("vulnerability") || text.includes("exploit") || text.includes("patch")) {
    return "vulnerability"
  } else if (text.includes("data breach") || text.includes("leak") || text.includes("stolen")) {
    return "data breach"
  } else if (text.includes("advisory") || text.includes("warning")) {
    return "advisory"
  } else if (text.includes("crypto") || text.includes("cryptocurrency")) {
    return "cryptocurrency" // Added for sample data
  } else if (text.includes("cyber") && text.includes("crime")) {
    return "cyber crimes"
  } else if (text.includes("malware")) {
    return "malware"
  }

  return "general"
}

// Function to determine severity based on content
const determineSeverity = (article: {
  title: string
  description: string
}): string => {
  const text = (article.title + " " + article.description).toLowerCase()

  if (
    text.includes("critical") ||
    text.includes("urgent") ||
    text.includes("emergency") ||
    text.includes("physical danger")
  ) {
    return "Critical"
  } else if (text.includes("high") || text.includes("serious") || text.includes("major")) {
    return "High"
  }

  return "Medium"
}

// Function to estimate read time
const calculateReadTime = (content: string): string => {
  // Average reading speed: 200 words per minute
  const wordCount = content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return `${minutes} min read`
}

// Function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Custom hook for fetching and managing news data
export function useNews(category = "all", dateFilter?: string) {
  // Construct the API URL with query parameter
  const url = new URL(`${API_URL}/news/articles`)

  // Add category to the q parameter if it's not "all"
  if (category && category !== "all") {
    url.searchParams.append("q", category.trim())
  }

  // Add date filter if provided
  if (dateFilter) {
    url.searchParams.append("date", dateFilter)
  }

  // Use SWR with correct typing for a single NewsArticle object
  const { data, error, isLoading, mutate } = useSWR<NewsArticle>(url.toString(), fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 300000, // 5 minutes
  })

  // Transform the API data to match our UI expectations
  const transformedData: TransformedArticle[] = data?.data
    ? data.data.map((article) => ({
        title: article.title,
        description: article.description,
        image: article.urlToImage || "/data_breach.png",
        author: article.author?.split(",")[0] || "Unknown",
        date: formatDate(article.publishedAt),
        url: article.url,
        category: determineCategory(article),
        severity: determineSeverity(article),
        readTime: calculateReadTime(article.content || ""),
        views: `${Math.floor(Math.random() * 1000) + 100}`, // Mock data
      }))
    : []

  return {
    news: transformedData,
    isLoading,
    error,
    mutate, // Expose the mutate function to allow manual revalidation
  }
}
