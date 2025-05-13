"use client"

import { useState } from "react"
import { useNews } from "@/hooks/use-news"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ArrowRight, Calendar, Clock, Eye, User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ThreatNewsPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [dateFilter, setDateFilter] = useState<string | undefined>(undefined)

    // Use our custom hook to fetch news data
    const { news, isLoading, error, getNewsByCategory } = useNews(activeCategory, dateFilter)

    // Handle category change
    const handleCategoryChange = (newCategory: string) => {
        setActiveCategory(newCategory)
    }

    // Handle date filter toggle
    const toggleDateFilter = () => {
        if (dateFilter) {
            setDateFilter(undefined)
        } else {
            // Set to today's date as an example
            setDateFilter(new Date().toISOString().split("T")[0])
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Threat News</h1>
                <Button onClick={() => alert("Subscription feature coming soon!")}>Subscribe to Updates</Button>
            </div>

            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="space-y-4">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="all">All News</TabsTrigger>
                        <TabsTrigger value="ransomware">Ransomware</TabsTrigger>
                        <TabsTrigger value="vulnerability">Vulnerabilities</TabsTrigger>
                        <TabsTrigger value="data breach">Data Breaches</TabsTrigger>
                        <TabsTrigger value="advisory">Advisories</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={toggleDateFilter}>
                            <Calendar className="mr-2 h-4 w-4" />
                            {dateFilter ? "Clear Date Filter" : "Filter by Date"}
                        </Button>
                    </div>
                </div>

                {error ? (
                    <div className="p-4 border border-red-300 bg-red-50 rounded-md">
                        <h3 className="text-red-800 font-medium">Error loading news</h3>
                        <p className="text-red-600">{error.message}</p>
                    </div>
                ) : (
                    <>
                        <TabsContent value="all" className="space-y-4">
                            {isLoading ? (
                                <NewsSkeletonGrid />
                            ) : (
                                <>
                                    <NewsGrid news={news} />
                                    <div className="flex justify-center mt-8">
                                        <Button variant="outline" onClick={() => alert("Load more functionality coming soon!")}>
                                            Load More
                                        </Button>
                                    </div>
                                </>
                            )}
                        </TabsContent>

                        {["ransomware", "vulnerability", "data breach", "advisory"].map((tabValue) => (
                            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                                {isLoading ? (
                                    <NewsSkeletonGrid />
                                ) : getNewsByCategory(tabValue).length > 0 ? (
                                    <>
                                        <NewsGrid news={getNewsByCategory(tabValue)} />
                                        <div className="flex justify-center mt-8">
                                            <Button variant="outline" onClick={() => alert("Load more functionality coming soon!")}>
                                                Load More
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <EmptyTabContent category={tabValue.replace("-", " ")} />
                                )}
                            </TabsContent>
                        ))}
                    </>
                )}
            </Tabs>
        </div>
    )
}

// Component to display the news grid
function NewsGrid({ news }: { news: any[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article, index) => (
                <NewsCard key={index} article={article} />
            ))}
        </div>
    )
}

// Component for each news card
function NewsCard({ article }: { article: any }) {
    return (
        <Card className="overflow-hidden">
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
            <CardContent className="p-4 pt-0">
                <CardDescription className="line-clamp-3">{article.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {article.author}
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
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
