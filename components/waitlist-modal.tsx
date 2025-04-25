"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitWaitlistForm } from "@/app/actions"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else {
      // Check if email is from a public domain
      const publicDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com"]
      const domain = formState.email.split("@")[1]

      if (!domain) {
        newErrors.email = "Please enter a valid email address"
      } else if (publicDomains.includes(domain.toLowerCase())) {
        newErrors.email = "Please use your work email (not a public email domain)"
      }
    }

    if (!formState.company.trim()) {
      newErrors.company = "Company name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would call your server action
      await submitWaitlistForm(formState)
      setIsSuccess(true)
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors({ form: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const resetForm = () => {
    setFormState({ name: "", email: "", company: "" })
    setErrors({})
    setIsSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetForm()}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" className="h-6 w-6 rounded-full p-0" onClick={resetForm}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4">
              <Image src="/images/logo.png" alt="Lumenarc" width={80} height={80} className="h-auto" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#1a2d5a]">Thank you for joining!</h3>
            <p className="mb-6 text-[#4a5568]">We've added you to our waitlist and will notify you when we launch.</p>
            <Button onClick={resetForm} className="bg-[#1a2d5a] text-white hover:bg-[#2a3d6a]">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <Image src="/images/logo.png" alt="Lumenarc" width={60} height={60} className="h-auto" />
            </div>

            <h3 className="text-center text-xl font-bold text-[#1a2d5a]">Join the Lumenarc Waitlist</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formState.name} onChange={handleChange} placeholder="John Smith" />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                />
                {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
              </div>

              {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

              <Button
                type="submit"
                className="w-full bg-[#1a2d5a] text-white hover:bg-[#2a3d6a]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
