"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AlertCircle, BarChart3, Bot, BrainCircuit, Globe, Mail, Zap } from "lucide-react"

const features = [
  {
    icon: AlertCircle,
    title: "Real-time Alerts",
    description:
      "Get instant notifications about emerging threats and vulnerabilities that could impact your organization.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Analysis",
    description:
      "Our advanced AI analyzes threat patterns and provides actionable intelligence tailored to your security needs.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Bot,
    title: "Interactive Chatbot",
    description:
      "Ask questions and get immediate insights about cyber threats from our intelligent security assistant.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Globe,
    title: "Global Threat Map",
    description: "Visualize cyber attacks and threats worldwide with our interactive threat intelligence map.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: BarChart3,
    title: "Trend Analysis",
    description: "Track and analyze cybersecurity trends to better prepare for emerging threats and vulnerabilities.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Mail,
    title: "Custom Alerts",
    description: "Configure personalized alerts based on your industry, technology stack, and security concerns.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
]

export function FeatureSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 bg-slate-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50"></div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-sm text-cyan-500 mb-4">
            <Zap className="mr-1 h-3.5 w-3.5" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Stay Protected with Advanced Threat Intelligence
          </h2>
          <p className="text-slate-400 md:text-lg">
            Our platform combines cutting-edge AI technology with comprehensive cybersecurity data to keep you informed
            and protected against evolving threats.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-6 rounded-xl border transition-all duration-300 ${
                activeFeature === index
                  ? "border-slate-700 bg-slate-900/80 shadow-lg"
                  : "border-slate-800 bg-slate-900/50"
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <div className="inline-block p-1 bg-slate-800 rounded-full">
            <div className="flex space-x-1">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeFeature === index ? "bg-cyan-500" : "bg-slate-600"
                  }`}
                  onClick={() => setActiveFeature(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
