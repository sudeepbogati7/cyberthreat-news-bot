"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Skull,
  Shield,
  RefreshCw,
  Info,
  ExternalLink,
  ChevronRight,
  Zap,
  Lightbulb,
  Clock,
  BarChart3,
  Bookmark,
  Link2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

// API URL (replace with your actual API endpoint or use environment variable)
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Types for chat messages
type MessageType = "user" | "assistant" | "error"

interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: Date
  sources?: string[]
}

const recentThreats = [
  {
    id: 1,
    name: "BlackCat Ransomware",
    severity: "Critical",
    category: "Ransomware",
    icon: Skull,
  },
  {
    id: 2,
    name: "Chrome Zero-day Vulnerability",
    severity: "High",
    category: "Vulnerability",
    icon: AlertTriangle,
  },
  {
    id: 3,
    name: "Phishing Campaign Targeting Banks",
    severity: "Medium",
    category: "Phishing",
    icon: AlertTriangle,
  },
]

// Sample suggested questions
const suggestedQuestions = [
  "What is the BlackCat ransomware?",
  "Tell me about recent zero-day vulnerabilities",
  "How can I protect against phishing attacks?",
  "What are the most common attack vectors in 2023?",
  "Explain the MITRE ATT&CK framework",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Hello! I'm your DeepCyberQ AI assistant. How can I help you with cybersecurity threats and news today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages within the chat box only
  useEffect(() => {
    if (messagesEndRef.current && scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollableArea) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ block: "end", inline: "nearest" })
        }, 100)
      }
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Send API request
      const response = await fetch(`${API_URL}/news/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ query: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.data?.answer || "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
        sources: data.data?.sources || [],
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Error fetching AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "error",
        content: "An error occurred while fetching the response. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    const inputElement = document.getElementById("chat-input")
    if (inputElement) {
      inputElement.focus()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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

  const getMessageStyles = (type: MessageType) => {
    switch (type) {
      case "user":
        return "bg-cyan-500 text-white"
      case "error":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "assistant":
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (messagesEndRef.current && scrollAreaRef.current) {
        const scrollableArea = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
        if (scrollableArea) {
          messagesEndRef.current.scrollIntoView({ block: "end", inline: "nearest" })
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Threat Intelligence Chat</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Ask questions about cybersecurity threats, vulnerabilities, and best practices
          </p>
        </div>
      </div>

      <Alert className="mb-4 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-900/30">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Warning: Chat history is not saved. All messages will be lost if you refresh the page or navigate away.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-16rem)] flex flex-col overflow-hidden">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-cyan-500 mr-2" />
                <CardTitle className="text-lg">DeepCyberQ AI Assistant</CardTitle>
              </div>
              <CardDescription>Powered by advanced threat intelligence</CardDescription>
            </CardHeader>

            <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
              <ScrollArea
                ref={scrollAreaRef}
                className="flex-1 px-4"
                style={{
                  height: "calc(100vh - 24rem)",
                }}
                scrollHideDelay={100}
              >
                <div className="py-20 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-3 ${getMessageStyles(message.type)}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {message.type === "assistant" ? (
                            <Bot className="h-4 w-4 text-cyan-500" />
                          ) : message.type === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                        </div>
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Sources:</p>
                            <ul className="mt-1 space-y-1">
                              {message.sources.map((source, index) => (
                                <li key={index} className="text-xs">
                                  <a
                                    href={source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-500 hover:underline flex items-center"
                                  >
                                    <Link2 className="h-3 w-3 mr-1" />
                                    <span className="truncate">{source}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-slate-100 dark:bg-slate-800">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-cyan-500" />
                          <div className="flex space-x-1">
                            <div
                              className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 border-t dark:border-slate-800">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-1.5 whitespace-normal text-left justify-start"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 border-t">
              <div className="flex w-full items-center space-x-2">
                <Input
                  id="chat-input"
                  placeholder="Type your question about cybersecurity threats..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Tabs defaultValue="threats">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="threats">Threats</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="tips">Chat Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="threats" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                    Recent Threats
                  </CardTitle>
                  <CardDescription>Latest cybersecurity threats detected</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentThreats.map((threat) => (
                    <div
                      key={threat.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      onClick={() => handleSuggestedQuestion(`Tell me about ${threat.name}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                          <threat.icon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{threat.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{threat.category}</p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(threat.severity)}>{threat.severity}</Badge>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="w-full justify-between text-cyan-500 hover:text-cyan-600">
                    View All Threats
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 text-cyan-500 mr-2" />
                    Threat Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Threats</span>
                    <span className="font-medium">24</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Critical Vulnerabilities</span>
                    <span className="font-medium text-red-500">3</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Threats Mitigated (30d)</span>
                    <span className="font-medium text-green-500">18</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Global Threat Level</span>
                    <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                      Elevated
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 text-cyan-500 mr-2" />
                    Threat Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "Ransomware",
                    "Zero-day Vulnerabilities",
                    "Phishing",
                    "Supply Chain Attacks",
                    "APT Groups",
                    "DDoS Attacks",
                    "Data Breaches",
                    "Malware",
                  ].map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                      onClick={() => handleSuggestedQuestion(`Tell me about ${category}`)}
                    >
                      <span className="text-sm">{category}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <ExternalLink className="h-5 w-5 text-cyan-500 mr-2" />
                    External Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Threat Intelligence</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="justify-start text-xs h-auto py-1.5">
                        MITRE ATT&CK
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs h-auto py-1.5">
                        CISA Alerts
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs h-auto py-1.5">
                        US-CERT
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs h-auto py-1.5">
                        CVE Database
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Security Frameworks</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="justify-start text-xs h-auto py-1.5">
                        NIST CSF
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs h-auto py-1.5">
                        ISO 27001
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs h-auto py-1.5">
                        CIS Controls
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs h-auto py-1.5">
                        GDPR
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                    How to Use the Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="p-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ask specific questions</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          "What is the BlackCat ransomware?" works better than "Tell me about threats"
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="p-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Specify timeframes</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          "What are the latest ransomware threats in 2023?" provides more relevant results
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="p-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400">
                        <RefreshCw className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Follow-up questions</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Ask follow-up questions to get more detailed information on specific aspects
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="p-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400">
                        <Bookmark className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Use suggested questions</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Click on suggested questions below the chat to quickly get information
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Info className="h-5 w-5 text-cyan-500 mr-2" />
                    About This Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    The DeepCyberQ AI Assistant provides information about cybersecurity threats, vulnerabilities,
                    attack techniques, and security best practices. It's powered by a comprehensive threat intelligence
                    database that's regularly updated with the latest security information.
                  </p>
                  <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/10 rounded-lg border border-cyan-100 dark:border-cyan-900/20">
                    <p className="text-xs text-cyan-700 dark:text-cyan-400">
                      <strong>Note:</strong> This assistant provides general cybersecurity information. For
                      organization-specific security concerns or active incidents, please contact your security team
                      directly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
