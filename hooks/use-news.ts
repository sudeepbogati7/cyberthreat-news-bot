"use client"

import useSWR from "swr"
import { buildNewsApiUrl, type NewsItem } from "@/lib/api"

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    error.message = await res.text()
    throw error
  }
  return res.json()
}

/**
 * Custom hook for fetching and managing news data with SWR
 */
export function useNews(category?: string, date?: string) {
  // Create a unique key for SWR based on the category and date
  const apiUrl = buildNewsApiUrl(category, date)

  // Use SWR to fetch and cache the data
  const { data, error, isLoading, isValidating, mutate } = useSWR<NewsItem[]>(apiUrl, fetcher, {
    // Revalidate data every 5 minutes
    refreshInterval: 5 * 60 * 1000,
    // Keep stale data when revalidating
    revalidateOnFocus: false,
    // Deduplicate requests within a short time window
    dedupingInterval: 5000,
  })

  // Filter news by category
  const getNewsByCategory = (categoryFilter: string) => {
    if (!data) return []
    if (categoryFilter === "all") return data
    return data.filter((item) => item.category.toLowerCase() === categoryFilter.replace("-", " ").toLowerCase())
  }

  return {
    news: data || [],
    isLoading,
    isValidating,
    error,
    getNewsByCategory,
    mutate, // Expose mutate to allow manual revalidation
  }
}
