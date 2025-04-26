"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // Clear error when user starts typing
    if (error) setError("")
  }

  const validateEmail = (email: string) => {
    const publicDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com"]
    const domain = email.split("@")[1]

    if (!domain) return false
    return !publicDomains.includes(domain.toLowerCase())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!form.name || !form.email || !form.company) {
      setError("All fields are required")
      return
    }

    // Validate email domain
    if (!validateEmail(form.email)) {
      setError("Please use your work email (not a public email domain)")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || "Something went wrong. Please try again.")
      } else {
        setSuccess(true)
        setForm({ name: "", email: "", company: "" })
      }
    } catch (err) {
      setError("Failed to submit. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({ name: "", email: "", company: "" })
    setError("")
    setSuccess(false)
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

        {success ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4">
              <Image src="/images/logo.png" alt="Lumenarc" width={80} height={80} className="h-auto" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#1a2d5a]">Thanks! You're on the waitlist.</h3>
            <p className="mb-6 text-[#4a5568]">We'll notify you when we launch.</p>
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
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Work Email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full bg-[#1a2d5a] text-white hover:bg-[#2a3d6a]" disabled={loading}>
                {loading ? "Submitting..." : "Join the Waitlist"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
