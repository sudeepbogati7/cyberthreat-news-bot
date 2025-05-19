"use client"

import { useState } from "react"
import { useNews, type TransformedArticle } from "@/hooks/use-news"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Bot, Calendar, Clock, Eye, MessageSquare, RefreshCcw, Search, User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ThreatNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isApplying, setIsApplying] = useState<boolean>(false)

  // Use our custom hook to fetch news data with the selected category
  const { news, isLoading, error, mutate } = useNews(selectedCategory)

  // Apply the selected category filter
  const handleApplyFilter = async () => {
    setIsApplying(true)
    try {
      // Manually trigger a revalidation of the data with the new category
      await mutate()
    } finally {
      setIsApplying(false)
    }
  }

  // Categories for filter buttons
  const categories = [
    { value: "all", label: "All News" },
    { value: "data breach", label: "Data Breaches" },
    { value: "cyber crimes", label: "Cyber Crimes" },
    { value: "cybercrime", label: "Cybercrime" },
    { value: "cryptocurrency", label: "Cryptocurrency" },
    { value: "malware", label: "Malware" },
    { value: "ransomware", label: "Ransomware" },
    { value: "vulnerability", label: "Vulnerabilities" },
    { value: "advisory", label: "Advisories" },
    { value: "general", label: "General" },
  ]

  // Get the current category label
  const currentCategoryLabel = categories.find((c) => c.value === selectedCategory)?.label || "All News"

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Threat News</h1>
          <div className="text-sm text-muted-foreground mt-1">
            Today's Latest News - {format(new Date(), "MMMM d, yyyy")}
          </div>
        </div>
        <Link href="/cyber/chat">
          <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all hover:shadow-lg">
            <Bot className="mr-2 h-4 w-4" />
            Ask AI about threats
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-medium mr-2">Category:</h2>
          <Badge variant="secondary" className="px-3 py-1.5 text-sm font-medium">
            {currentCategoryLabel}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg border">
        <div className="flex-1 min-w-[200px]">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleApplyFilter} className="min-w-[120px]" disabled={isApplying}>
          {isApplying ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Applying...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Apply Filter
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-9"
          onClick={() => window.location.reload()}
          disabled={isApplying}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          {news.length} {news.length === 1 ? "article" : "articles"} found
        </div>
      </div>

      {error ? (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md">
          <h3 className="text-red-800 font-medium">Error loading news</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      ) : isLoading || isApplying ? (
        <NewsSkeletonGrid />
      ) : news.length > 0 ? (
        <NewsGrid news={news} />
      ) : (
        <EmptyTabContent category={selectedCategory} />
      )}
    </div>
  )
}

// Component to display the news grid
function NewsGrid({ news }: { news: TransformedArticle[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {news.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  )
}

// Component for each news card
function NewsCard({ article }: { article: TransformedArticle }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <img
          src={article.image || "/placeholder.svg?height=200&width=400"}
          alt={article.title}
          className="h-full w-full object-cover"
        />
        <Badge
          className={`absolute top-2 right-2 ${
            article.severity === "Critical"
              ? "bg-red-500"
              : article.severity === "High"
                ? "bg-orange-500"
                : "bg-yellow-500"
          }`}
        >
          {article.severity}
        </Badge>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Badge variant="outline">{article.category}</Badge>
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {article.date}
          </div>
        </div>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <CardDescription className="line-clamp-3">{article.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            <span className="truncate max-w-[100px]">{article.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {article.readTime}
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-3 w-3" />
            {article.views}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto"
          onClick={() => {
            if (article.url) {
              window.open(article.url, "_blank")
            } else {
              alert("Full article coming soon!")
            }
          }}
        >
          Read more <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}

// Skeleton loader for news grid
function NewsSkeletonGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-[80%] mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-[90%] mb-1" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>
        ))}
    </div>
  )
}

// Empty tab content
function EmptyTabContent({ category }: { category: string }) {
  return (
    <div className="h-[400px] flex items-center justify-center border rounded-md">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No {category} news available</h3>
        <p className="text-muted-foreground">Check back later for updates</p>
      </div>
    </div>
  )
}
