"use server"

import { z } from "zod"

const emailSchema = z.string().email("Please enter a valid email address")

type WaitlistResponse = {
  success: boolean
  error?: string
}

export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    // Validate email
    emailSchema.parse(email)

    // In a real application, you would:
    // 1. Check if the email already exists in your database
    // 2. Store the email in your database
    // 3. Potentially send a confirmation email

    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we're just returning success
    return { success: true }

    // In a real implementation, you might connect to a database:
    // const { data, error } = await supabase
    //   .from('waitlist')
    //   .insert([{ email }])
    //
    // if (error) throw new Error(error.message)
    // return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }

    return {
      success: false,
      error: "Failed to join waitlist. Please try again later.",
    }
  }
}
