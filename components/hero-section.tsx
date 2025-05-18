"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-500 mb-4 w-fit">
              <Zap className="mr-1 h-3.5 w-3.5" />
              <span>Real-time Threat Intelligence</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Stay Ahead of{" "}
              <span className="text-gradient bg-gradient-to-r from-cyan-500 to-purple-500">Cyber Threats</span>
            </h1>

            <p className="max-w-[600px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Your comprehensive platform for the latest cybersecurity news, threat intelligence, and data breach
              alerts—powered by advanced AI to keep you informed and protected.
            </p>

            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                Explore Threats
              </Button>
              <Button variant="outline" className="border-slate-700 bg-slate-700 hover:text-white hover:bg-slate-800 transition-all duration-300">
                <Link className="flex gap-1 items-center group transition-all duration-300" href={'/account/register'}>Try AI Assistant <ArrowRight className="transition-all duration-300 hidden group-hover:block" /> </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs font-medium`}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="font-medium text-white">10,000+</span> security professionals trust us
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=600')] opacity-10"></div>

                  <div className="absolute top-0 left-0 right-0 h-12 bg-slate-900 border-b border-slate-700 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-sm font-medium">Threat Dashboard</div>
                  </div>

                  <div className="absolute top-12 inset-x-0 bottom-0 p-4">
                    <div className="grid grid-cols-2 gap-3 h-full">
                      <div className="col-span-2 h-1/3 bg-slate-800 rounded-lg border border-slate-700 p-3 flex flex-col">
                        <div className="text-xs text-slate-400">Global Threat Level</div>
                        <div className="flex items-center mt-2">
                          <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-yellow-500 to-red-500"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-yellow-500">Elevated</span>
                        </div>
                        <div className="mt-auto flex justify-between text-xs text-slate-400">
                          <span>Updated 5m ago</span>
                          <span className="text-cyan-500">View Details</span>
                        </div>
                      </div>

                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-800 rounded-lg border border-slate-700 p-3 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div className="text-xs text-slate-400">Alert #{i}</div>
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div className="mt-2 text-sm font-medium truncate">
                            {i === 1 ? "Ransomware Campaign" : i === 2 ? "Zero-day Exploit" : "Phishing Attack"}
                          </div>
                          <div className="mt-auto text-xs text-cyan-500">Details</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Animated pulse effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                    <div
                      className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"
                      style={{ animationDuration: "3s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
