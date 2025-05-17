"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion } from "framer-motion"
import { toast } from "sonner"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                full_name: formData.fullName,
                password: formData.password
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            toast.error(data.message || 'Registration failed')
            setIsLoading(false)
            return
        }

        toast.success('Registration successful!')
        setIsSuccess(true)
        
        // Redirect to login after showing success message
        setTimeout(() => {
            router.push("/account/login")
        }, 2000)

    } catch (error) {
        toast.error('An error occurred during registration')
        console.error('Registration error:', error)
    } finally {
        setIsLoading(false)
    }
}

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-8"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Registration Successful!</h1>
        <p className="text-slate-400 text-center mb-6">
          Your account has been created. You will be redirected to the login page shortly.
        </p>
        <Button
          onClick={() => router.push("/account/login")}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
        >
          Go to Login
        </Button>
      </motion.div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
        <p className="text-slate-400">
          Already have an account?{" "}
          <Link href="/account/login" className="text-cyan-500 hover:text-cyan-400">
            Sign in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className={`bg-slate-950 border-slate-800 focus-visible:ring-cyan-500 ${
              errors.fullName ? "border-red-500" : ""
            }`}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-slate-950 border-slate-800 focus-visible:ring-cyan-500 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={`bg-slate-950 border-slate-800 focus-visible:ring-cyan-500 pr-10 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`bg-slate-950 border-slate-800 focus-visible:ring-cyan-500 pr-10 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="terms" className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500" />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to the{" "}
            <Link href="/terms" className="text-cyan-500 hover:text-cyan-400">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-cyan-500 hover:text-cyan-400">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 mt-6"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </div>
  )
}
