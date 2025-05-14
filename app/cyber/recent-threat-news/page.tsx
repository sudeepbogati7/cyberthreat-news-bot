import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ArrowRight, Calendar, Clock, Eye, Globe, Tag, User } from 'lucide-react'

export default function ThreatNewsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Threat News</h1>
        <Button>
          Subscribe to Updates
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value="ransomware">Ransomware</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="data-breaches">Data Breaches</TabsTrigger>
            <TabsTrigger value="advisories">Advisories</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Filter by Date
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Critical Vulnerability Found in Popular Database Software",
                description: "Security researchers have discovered a critical vulnerability in a widely used database management system that could allow remote code execution.",
                date: "May 18, 2025",
                category: "Vulnerability",
                author: "Security Team",
                readTime: "5 min read",
                views: "1.2K",
                image: "/placeholder.svg?height=200&width=400",
                severity: "Critical",
              },
              {
                title: "New Ransomware Group Targeting Healthcare Sector",
                description: "A new ransomware group has emerged, specifically targeting healthcare organizations with sophisticated phishing campaigns.",
                date: "May 17, 2025",
                category: "Ransomware",
                author: "Threat Intelligence",
                readTime: "4 min read",
                views: "956",
                image: "/placeholder.svg?height=200&width=400",
                severity: "High",
              },
              {
                title: "Major Data Breach Affects Millions of Users",
                description: "A major e-commerce platform has disclosed a data breach affecting millions of users, with personal and payment information potentially compromised.",
                date: "May 16, 2025",
                category: "Data Breach",
                author: "Incident Response",
                readTime: "6 min read",
                views: "2.3K",
                image: "/placeholder.svg?height=200&width=400",
                severity: "High",
              },
              {
                title: "Zero-Day Exploit Found in Popular Browser",
                description: "Security researchers have identified a zero-day vulnerability in a widely used web browser that could allow attackers to execute arbitrary code.",
                date: "May 15, 2025",
                category: "Vulnerability",
                author: "Research Team",
                readTime: "7 min read",
                views: "1.8K",
                image: "/placeholder.svg?height=200&width=400",
                severity: "Critical",
              },
              {
                title: "Government Issues Advisory on State-Sponsored Attacks",
                description: "National cybersecurity agencies have issued a joint advisory warning about increased state-sponsored cyber attacks targeting critical infrastructure.",
                date: "May 14, 2025",
                category: "Advisory",
                author: "Government Relations",
                readTime: "8 min read",
                views: "3.1K",
                image: "/placeholder.svg?height=200&width=400",
                severity: "Medium",
              },
              {
                title: "New Phishing Campaign Impersonating Financial Institutions",
                description: "A sophisticated phishing campaign has been detected, targeting customers of major financial institutions with convincing fake login pages.",
                date: "May 13, 2025",
                category: "Phishing",
                author: "Threat Intelligence",
                readTime: "3 min read",
                views: "876",
                image: "/placeholder.svg?height=200&width=400",
                severity: "Medium",
              },
            ].map((article, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={article.image || "/placeholder.svg"}
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
                <CardContent className="p-4 pt-0">
                  <CardDescription className="line-clamp-3">
                    {article.description}
                  </CardDescription>
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
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        {["ransomware", "vulnerabilities", "data-breaches", "advisories"].map((tab) => (
          <TabsContent key={tab} value={tab} className="h-[400px] flex items-center justify-center border rounded-md">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Content for {tab.replace("-", " ")} will be displayed here</h3>
              <p className="text-muted-foreground">This tab is currently under development</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
