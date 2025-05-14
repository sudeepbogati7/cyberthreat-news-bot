"use client"

import { useState } from "react"
import { AlertTriangle, Filter, Search, ChevronDown, ArrowUpDown, Shield, Skull, WormIcon as Virus, Eye, Share2, Bookmark, BarChart3 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Mock threat data
const threatData = [
  {
    id: 1,
    title: "BlackCat Ransomware Campaign",
    severity: "Critical",
    category: "Ransomware",
    description: "BlackCat (ALPHV) ransomware is targeting healthcare and critical infrastructure with sophisticated double-extortion tactics.",
    affectedSystems: ["Windows Server", "Linux", "VMware ESXi"],
    timeDiscovered: "2023-11-15T10:30:00Z",
    lastUpdated: "2023-11-28T14:45:00Z",
    views: 12453,
    shares: 3241,
    bookmarks: 1876,
    icon: Skull,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    trending: true,
  },
  {
    id: 2,
    title: "Critical Zero-day in Chrome Browser",
    severity: "High",
    category: "Vulnerability",
    description: "A zero-day vulnerability (CVE-2023-4863) in Chrome allows remote code execution through heap buffer overflow in WebP images.",
    affectedSystems: ["Chrome", "Edge", "Brave"],
    timeDiscovered: "2023-11-10T08:15:00Z",
    lastUpdated: "2023-11-27T11:20:00Z",
    views: 9876,
    shares: 2567,
    bookmarks: 1543,
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    trending: true,
  },
  {
    id: 3,
    title: "Sophisticated Phishing Campaign Targeting Financial Institutions",
    severity: "Medium",
    category: "Phishing",
    description: "A well-crafted phishing campaign is impersonating major banks with convincing login pages and security notifications.",
    affectedSystems: ["Email Systems", "Web Browsers"],
    timeDiscovered: "2023-11-05T14:20:00Z",
    lastUpdated: "2023-11-25T09:30:00Z",
    views: 7654,
    shares: 1987,
    bookmarks: 1123,
    icon: Virus,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    trending: false,
  },
  {
    id: 4,
    title: "LockBit 3.0 Ransomware Surge",
    severity: "Critical",
    category: "Ransomware",
    description: "LockBit 3.0 ransomware has seen a significant increase in activity, targeting manufacturing and logistics sectors.",
    affectedSystems: ["Windows", "Active Directory", "Network Storage"],
    timeDiscovered: "2023-11-02T16:45:00Z",
    lastUpdated: "2023-11-24T13:15:00Z",
    views: 11234,
    shares: 3098,
    bookmarks: 1765,
    icon: Skull,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    trending: true,
  },
  {
    id: 5,
    title: "Microsoft Exchange Server Vulnerabilities",
    severity: "High",
    category: "Vulnerability",
    description: "Multiple vulnerabilities in Microsoft Exchange Server could allow remote code execution and information disclosure.",
    affectedSystems: ["Exchange Server 2016", "Exchange Server 2019"],
    timeDiscovered: "2023-10-28T09:10:00Z",
    lastUpdated: "2023-11-22T10:45:00Z",
    views: 8765,
    shares: 2345,
    bookmarks: 1432,
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    trending: false,
  },
  {
    id: 6,
    title: "Supply Chain Attack via Compromised NPM Packages",
    severity: "Medium",
    category: "Supply Chain",
    description: "Several popular NPM packages have been compromised to include malicious code that steals environment variables and SSH keys.",
    affectedSystems: ["Node.js Applications", "CI/CD Pipelines"],
    timeDiscovered: "2023-10-25T11:30:00Z",
    lastUpdated: "2023-11-20T15:20:00Z",
    views: 6543,
    shares: 1876,
    bookmarks: 987,
    icon: Virus,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    trending: false,
  },
  {
    id: 7,
    title: "DDoS Attacks Targeting Financial Services",
    severity: "High",
    category: "DDoS",
    description: "A coordinated series of DDoS attacks is targeting major financial institutions, causing service disruptions.",
    affectedSystems: ["Network Infrastructure", "Web Services"],
    timeDiscovered: "2023-10-20T13:45:00Z",
    lastUpdated: "2023-11-18T09:10:00Z",
    views: 7890,
    shares: 2109,
    bookmarks: 1234,
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    trending: false,
  },
  {
    id: 8,
    title: "Emotet Botnet Resurgence",
    severity: "High",
    category: "Malware",
    description: "The Emotet botnet has resurfaced with new capabilities, spreading through malicious email attachments and compromised websites.",
    affectedSystems: ["Windows", "Email Systems"],
    timeDiscovered: "2023-10-15T10:20:00Z",
    lastUpdated: "2023-11-15T14:30:00Z",
    views: 9123,
    shares: 2456,
    bookmarks: 1345,
    icon: Virus,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    trending: true,
  },
];

export default function PopularThreatsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("latest")

  // Filter threats based on search, category, and severity
  const filteredThreats = threatData.filter(threat => {
    const matchesSearch = threat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          threat.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || threat.category === selectedCategory
    const matchesSeverity = !selectedSeverity || threat.severity === selectedSeverity
    
    return matchesSearch && matchesCategory && matchesSeverity
  })

  // Sort threats based on selected sort option
  const sortedThreats = [...filteredThreats].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "oldest":
        return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
      case "most-viewed":
        return b.views - a.views
      case "most-shared":
        return b.shares - a.shares
      case "severity-high":
        const severityOrder = { "Critical": 3, "High": 2, "Medium": 1, "Low": 0 }
        return severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder]
      case "severity-low":
        const severityOrderReverse = { "Critical": 3, "High": 2, "Medium": 1, "Low": 0 }
        return severityOrderReverse[a.severity as keyof typeof severityOrderReverse] - severityOrderReverse[b.severity as keyof typeof severityOrderReverse]
      default:
        return 0
    }
  })

  // Get trending threats
  const trendingThreats = threatData.filter(threat => threat.trending)

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Popular Threats</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Stay informed about the most significant cybersecurity threats
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Threats</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-slate-500">By Category</DropdownMenuLabel>
                {["Ransomware", "Vulnerability", "Phishing", "Malware", "DDoS", "Supply Chain"].map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  >
                    <span className="w-4 h-4 mr-2 flex items-center justify-center">
                      {selectedCategory === category && "✓"}
                    </span>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-slate-500">By Severity</DropdownMenuLabel>
                {["Critical", "High", "Medium", "Low"].map((severity) => (
                  <DropdownMenuItem 
                    key={severity}
                    className="cursor-pointer"
                    onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
                  >
                    <span className="w-4 h-4 mr-2 flex items-center justify-center">
                      {selectedSeverity === severity && "✓"}
                    </span>
                    {severity}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                className="cursor-pointer text-cyan-500"
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedSeverity(null)
                }}
              >
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="latest">Latest Updated</SelectItem>
                <SelectItem value="oldest">Oldest Updated</SelectItem>
                <SelectItem value="most-viewed">Most Viewed</SelectItem>
                <SelectItem value="most-shared">Most Shared</SelectItem>
                <SelectItem value="severity-high">Severity (High to Low)</SelectItem>
                <SelectItem value="severity-low">Severity (Low to High)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search threats..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Threats</TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-1">
            Trending
            <Badge variant="secondary" className="ml-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">
              {trendingThreats.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {sortedThreats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedThreats.map((threat) => (
                <ThreatCard key={threat.id} threat={threat} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">No threats found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                No threats match your current filters. Try adjusting your search criteria or clear filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                  setSelectedSeverity(null)
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="trending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingThreats.map((threat) => (
              <ThreatCard key={threat.id} threat={threat} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 pt-6 border-t dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-slate-400" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Showing {sortedThreats.length} of {threatData.length} threats
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              Export Report
            </Button>
            <Button size="sm" className="h-8 bg-cyan-500 hover:bg-cyan-600">
              Subscribe to Alerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ThreatCard({ threat }: { threat: any }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date)
  }
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "High":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
    }
  }
  
  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-lg ${threat.bgColor} ${threat.borderColor} border`}>
            <threat.icon className={`h-5 w-5 ${threat.color}`} />
          </div>
          <Badge variant="outline" className={`${getSeverityColor(threat.severity)}`}>
            {threat.severity}
          </Badge>
        </div>
        <CardTitle className="mt-4 text-lg line-clamp-2">{threat.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
          {threat.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {threat.category}
          </Badge>
          {threat.trending && (
            <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
              Trending
            </Badge>
          )}
        </div>
        
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <div className="flex justify-between mb-1">
            <span>Discovered:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{formatDate(threat.timeDiscovered)}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{formatDate(threat.lastUpdated)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between border-t border-slate-100 dark:border-slate-800 mt-4">
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center">
            <Eye className="h-3.5 w-3.5 mr-1" />
            {threat.views.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Share2 className="h-3.5 w-3.5 mr-1" />
            {threat.shares.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Bookmark className="h-3.5 w-3.5 mr-1" />
            {threat.bookmarks.toLocaleString()}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 -mr-2 h-8 px-2">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
