"use client"

import { useEffect, useRef, useState } from "react"

// Mock data for threat locations
const threatLocations = [
  { lat: 40.7128, lng: -74.006, intensity: 0.8 }, // New York
  { lat: 51.5074, lng: -0.1278, intensity: 0.6 }, // London
  { lat: 48.8566, lng: 2.3522, intensity: 0.7 }, // Paris
  { lat: 35.6762, lng: 139.6503, intensity: 0.9 }, // Tokyo
  { lat: 22.3193, lng: 114.1694, intensity: 0.8 }, // Hong Kong
  { lat: 37.7749, lng: -122.4194, intensity: 0.7 }, // San Francisco
  { lat: 55.7558, lng: 37.6173, intensity: 0.6 }, // Moscow
  { lat: -33.8688, lng: 151.2093, intensity: 0.5 }, // Sydney
  { lat: 19.4326, lng: -99.1332, intensity: 0.4 }, // Mexico City
  { lat: -23.5505, lng: -46.6333, intensity: 0.5 }, // São Paulo
]

export function ThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Draw world map (simplified)
    ctx.fillStyle = "#f1f5f9" // Light blue for oceans
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw simplified continents (just for visualization)
    ctx.fillStyle = "#e2e8f0" // Light gray for land
    // North America
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.25, canvas.height * 0.4, canvas.width * 0.15, canvas.height * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()
    // South America
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.3, canvas.height * 0.7, canvas.width * 0.1, canvas.height * 0.15, 0, 0, Math.PI * 2)
    ctx.fill()
    // Europe & Africa
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.5, canvas.height * 0.45, canvas.width * 0.1, canvas.height * 0.3, 0, 0, Math.PI * 2)
    ctx.fill()
    // Asia
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.7, canvas.height * 0.4, canvas.width * 0.15, canvas.height * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()
    // Australia
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.08, canvas.height * 0.1, 0, 0, Math.PI * 2)
    ctx.fill()

    // Draw threat locations
    threatLocations.forEach((location) => {
      // Convert lat/lng to x/y coordinates (simplified)
      const x = ((location.lng + 180) / 360) * canvas.width
      const y = ((90 - location.lat) / 180) * canvas.height

      // Draw threat point with glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20 * location.intensity)
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)") // Red center
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)") // Transparent edge

      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(x, y, 20 * location.intensity, 0, Math.PI * 2)
      ctx.fill()

      // Draw point center
      ctx.beginPath()
      ctx.fillStyle = "rgba(239, 68, 68, 1)"
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    })

    // Animate pulsing effect
    let alpha = 0
    const animate = () => {
      alpha += 0.02
      if (alpha > Math.PI * 2) alpha = 0

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Redraw map
      ctx.fillStyle = "#f1f5f9"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Redraw continents
      ctx.fillStyle = "#e2e8f0"
      ctx.beginPath()
      ctx.ellipse(canvas.width * 0.25, canvas.height * 0.4, canvas.width * 0.15, canvas.height * 0.2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(canvas.width * 0.3, canvas.height * 0.7, canvas.width * 0.1, canvas.height * 0.15, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(canvas.width * 0.5, canvas.height * 0.45, canvas.width * 0.1, canvas.height * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(canvas.width * 0.7, canvas.height * 0.4, canvas.width * 0.15, canvas.height * 0.2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.08, canvas.height * 0.1, 0, 0, Math.PI * 2)
      ctx.fill()

      // Redraw threat locations with pulsing effect
      threatLocations.forEach((location) => {
        const x = ((location.lng + 180) / 360) * canvas.width
        const y = ((90 - location.lat) / 180) * canvas.height

        const pulseSize = 20 * location.intensity * (1 + 0.2 * Math.sin(alpha))
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize)
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)")
        gradient.addColorStop(1, "rgba(239, 68, 68, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = "rgba(239, 68, 68, 1)"
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [dimensions])

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-md border">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  )
}
