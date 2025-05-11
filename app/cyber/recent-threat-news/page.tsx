"use client"

import { useState } from "react"
import { useNews } from "@/hooks/use-news"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Calendar, Clock, Eye, Filter, RefreshCcw, User, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function ThreatNewsPage() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)

    // Use our custom hook to fetch news data
    const { news, isLoading, error } = useNews(activeCategory || "all", dateFilter?.toISOString().split("T")[0])

    // Handle category change
    const handleCategoryChange = (category: string | null) => {
        setActiveCategory(category)
    }

    // Handle date filter change
    const handleDateChange = (date: Date | undefined) => {
        setDateFilter(date)
    }

    // Filter news based on active category
    const filteredNews = activeCategory
        ? news.filter(
            (article) =>
                article.category.toLowerCase() === activeCategory.toLowerCase() ||
                article.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
                article.description.toLowerCase().includes(activeCategory.toLowerCase()),
        )
        : news

    // Categories for filter buttons
    const categories = [
        { value: "ransomware", label: "Ransomware" },
        { value: "vulnerability", label: "Vulnerabilities" },
        { value: "data breach", label: "Data Breaches" },
        { value: "advisory", label: "Advisories" },
    ]

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Threat News</h1>
                <Button onClick={() => alert("Subscription feature coming soon!")}>Subscribe to Updates</Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                    {activeCategory ? (
                        <Badge variant="secondary" className="px-3 py-1 text-sm">
                            {categories.find((c) => c.value === activeCategory)?.label || activeCategory}
                            <button
                                className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full"
                                onClick={() => handleCategoryChange(null)}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove filter</span>
                            </button>
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="px-3 py-1 text-sm">
                            All News
                        </Badge>
                    )}

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                                <Filter className="mr-2 h-3.5 w-3.5" />
                                Filter
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-0" align="start">
                            <div className="p-2">
                                <div className="font-medium mb-2">Categories</div>
                                <div className="space-y-1">
                                    {categories.map((category) => (
                                        <Button
                                            key={category.value}
                                            variant={activeCategory === category.value ? "secondary" : "ghost"}
                                            className="w-full justify-start text-sm"
                                            onClick={() => handleCategoryChange(category.value)}
                                        >
                                            {category.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div className="p-2">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-sm"
                                    onClick={() => handleCategoryChange(null)}
                                >
                                    Clear filters
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                                <Calendar className="mr-2 h-3.5 w-3.5" />
                                {dateFilter ? format(dateFilter, "PPP") : "Date Filter"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent mode="single" selected={dateFilter} onSelect={handleDateChange} initialFocus />
                            <Separator />
                            <div className="p-2 flex justify-end">
                                <Button variant="ghost" size="sm" onClick={() => handleDateChange(undefined)} disabled={!dateFilter}>
                                    Clear
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button variant="ghost" size="sm" className="h-8" onClick={() => window.location.reload()}>
                        <RefreshCcw className="mr-2 h-3.5 w-3.5" />
                        Refresh
                    </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                    {filteredNews.length} {filteredNews.length === 1 ? "article" : "articles"} found
                </div>
            </div>

            {error ? (
                <div className="p-4 border border-red-300 bg-red-50 rounded-md">
                    <h3 className="text-red-800 font-medium">Error loading news</h3>
                    <p className="text-red-600">{error.message}</p>
                </div>
            ) : isLoading ? (
                <NewsSkeletonGrid />
            ) : filteredNews.length > 0 ? (
                <>
                    <NewsGrid news={filteredNews} />
                    <div className="flex justify-center mt-8">
                        <Button variant="outline" onClick={() => alert("Load more functionality coming soon!")}>
                            Load More
                        </Button>
                    </div>
                </>
            ) : (
                <EmptyTabContent category={activeCategory || "news"} />
            )}
        </div>
    )
}

// Component to display the news grid
function NewsGrid({ news }: { news: any[] }) {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {news.map((article, index) => (
                <NewsCard key={index} article={article} />
            ))}
        </div>
    )
}

// Component for each news card
function NewsCard({ article }: { article: any }) {
    return (
        <Card className="overflow-hidden h-full flex flex-col">
            <div className="relative h-48 w-full">
                <img
                    src={article.image || "/placeholder.svg?height=200&width=400"}
                    alt={article.title}
                    className="h-full w-full object-cover"
                />
                <Badge
                    className={`absolute top-2 right-2 ${article.severity === "Critical"
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
