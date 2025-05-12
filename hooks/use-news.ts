import useSWR from "swr"

// Define the news article type based on the API response
export interface NewsArticle {
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

// The fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch news data")
  }
  return response.json()
}

// Function to determine category based on title and description
const determineCategory = (article: NewsArticle): string => {
  const text = (article.title + " " + article.description).toLowerCase()

  if (text.includes("ransomware") || text.includes("ransom")) {
    return "ransomware"
  } else if (text.includes("vulnerability") || text.includes("exploit") || text.includes("patch")) {
    return "vulnerability"
  } else if (text.includes("data breach") || text.includes("leak") || text.includes("stolen")) {
    return "data breach"
  } else if (text.includes("advisory") || text.includes("warning")) {
    return "advisory"
  }

  return "general"
}

// Function to determine severity based on content
const determineSeverity = (article: NewsArticle): string => {
  const text = (article.title + " " + article.description).toLowerCase()

  if (text.includes("critical") || text.includes("urgent") || text.includes("emergency")) {
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
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

// Custom hook for fetching and managing news data
export function useNews(category = "all", dateFilter?: string) {
  // In a real app, you would fetch from your actual API endpoint
  // For this example, we'll use a placeholder URL
  const { data, error, isLoading } = useSWR<NewsArticle[]>("/api/news", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 300000, // 5 minutes
  })

  // Transform the API data to match our UI expectations
  const transformedData: TransformedArticle[] = data
    ? data.map((article) => {
        const category = determineCategory(article)
        return {
          title: article.title,
          description: article.description,
          image: article.urlToImage || "/placeholder.svg?height=200&width=400",
          author: article.author?.split(",")[0] || "Unknown",
          date: formatDate(article.publishedAt),
          url: article.url,
          category: category,
          severity: determineSeverity(article),
          readTime: calculateReadTime(article.content || ""),
          views: `${Math.floor(Math.random() * 1000) + 100}`, // Mock data
        }
      })
    : []

  // Function to filter news by category
  const getNewsByCategory = (categoryFilter: string) => {
    if (!transformedData) return []
    if (categoryFilter === "all") return transformedData

    return transformedData.filter((article) => article.category === categoryFilter)
  }

  // Filter by date if dateFilter is provided
  const filteredByDate = dateFilter
    ? transformedData.filter((article) => {
        const articleDate = new Date(article.date).toISOString().split("T")[0]
        return articleDate === dateFilter
      })
    : transformedData

  return {
    news: filteredByDate,
    isLoading,
    error,
    getNewsByCategory,
  }
}
