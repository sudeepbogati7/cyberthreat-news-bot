"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2, AlertCircle, Lock } from "lucide-react"
import { motion } from "framer-motion"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail("")
    }, 1500)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-sm text-cyan-500 mb-4">
            <Mail className="mr-1 h-3.5 w-3.5" />
            <span>Stay Informed</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Subscribe to Cyber Threat Updates</h2>

          <p className="text-slate-400 md:text-lg mb-8">
            Get the latest cybersecurity news, threat alerts, and security tips delivered directly to your inbox.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md mx-auto"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You for Subscribing!</h3>
                <p className="text-slate-400 text-center">
                  You've been added to our newsletter. We'll keep you updated with the latest cybersecurity insights.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-slate-700 hover:bg-slate-800"
                  onClick={() => setIsSubmitted(false)}
                >
                  Subscribe Another Email
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-900 border-slate-700 focus-visible:ring-cyan-500"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          )}

          <div className="flex items-center justify-center mt-8 space-x-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-2">
                <Mail className="h-5 w-5 text-cyan-500" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Weekly Updates</div>
                <div className="text-xs text-slate-400">Curated security news</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Threat Alerts</div>
                <div className="text-xs text-slate-400">Critical vulnerabilities</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-2">
                <Lock className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Security Tips</div>
                <div className="text-xs text-slate-400">Best practices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
