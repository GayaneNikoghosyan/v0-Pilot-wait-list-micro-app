"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { joinWaitlist } from "@/app/waitlist/actions"

const emailSchema = z.string().email("Please enter a valid email address")

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [waitlistCount, setWaitlistCount] = useState(1482)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Validate email
      emailSchema.parse(email)

      setIsSubmitting(true)

      // Submit to server action
      const result = await joinWaitlist(email)

      if (result.success) {
        setIsSuccess(true)
        setWaitlistCount(waitlistCount + 1)
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-zinc-900">You're on the list!</h3>
          <p className="text-zinc-600">Thanks for joining our waitlist. We'll notify you when we launch.</p>
          <div className="mt-4 text-sm text-zinc-500">
            <p>
              You've joined <span className="font-medium text-zinc-900">{waitlistCount}</span> others on the waitlist
            </p>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-900">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                disabled={isSubmitting}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join the waitlist"
              )}
            </Button>
          </form>
          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-zinc-500">
            <span>
              Already <span className="font-medium text-zinc-900">{waitlistCount}</span> people on the waitlist
            </span>
          </div>
        </>
      )}
    </div>
  )
}
