"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Shield, Skull, WormIcon as Virus } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const threatData = [
  {
    id: 1,
    title: "New Ransomware Strain Targeting Healthcare",
    severity: "Critical",
    category: "Ransomware",
    description:
      "A sophisticated ransomware variant is actively targeting healthcare organizations worldwide, encrypting patient data and demanding cryptocurrency payments.",
    timeAgo: "2 hours ago",
    icon: Skull,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
  {
    id: 2,
    title: "Zero-day Vulnerability in Popular Browser",
    severity: "High",
    category: "Vulnerability",
    description:
      "Security researchers have discovered an unpatched zero-day vulnerability affecting all versions of a major web browser, allowing remote code execution.",
    timeAgo: "5 hours ago",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    id: 3,
    title: "Large-scale Phishing Campaign Detected",
    severity: "Medium",
    category: "Phishing",
    description:
      "A sophisticated phishing campaign impersonating major financial institutions is currently active, attempting to steal credentials and financial information.",
    timeAgo: "1 day ago",
    icon: Virus,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    id: 4,
    title: "Critical Infrastructure Attack Prevented",
    severity: "Informational",
    category: "APT",
    description:
      "Security agencies report successfully preventing a coordinated attack targeting critical infrastructure in multiple countries.",
    timeAgo: "2 days ago",
    icon: Shield,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
]

export function FeaturedThreats() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Threats</h2>
            <p className="text-slate-400 mt-1">Stay informed about the latest cybersecurity threats</p>
          </div>
          <Button variant="outline" className="border-slate-700 bg-slate-600 hover:text-cyan-500 hover:bg-slate-800">
           <Link className="flex gap-1 items-center hover:gap-3 transition-all duration-300" href={'/threats'}> View All Threats <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {threatData.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(threat.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
            >
              <Card className="h-full bg-slate-900 border-slate-800 transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/20">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-lg ${threat.bgColor} ${threat.borderColor} border`}>
                      <threat.icon className={`h-5 w-5 ${threat.color}`} />
                    </div>
                    <Badge variant="outline" className={`${threat.color} ${threat.borderColor}`}>
                      {threat.severity}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-gray-100 text-lg">{threat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{threat.description}</p>
                  <div className="flex items-center mt-4 text-xs text-slate-500">
                    <Badge variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-slate-300">
                      {threat.category}
                    </Badge>
                    <span className="ml-auto">{threat.timeAgo}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full justify-between items-center text-cyan-500 hover:text-cyan-400 hover:bg-slate-800 p-0 h-8"
                  >
                    <span>Read full analysis</span>
                    <ArrowRight
                      className={`h-4 w-4 transition-transform duration-300 ${hoveredCard === threat.id ? "translate-x-1" : ""}`}
                    />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
