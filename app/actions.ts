"use server"

interface WaitlistFormData {
  name: string
  email: string
  company: string
}

export async function submitWaitlistForm(data: WaitlistFormData) {
  // Validate the data
  if (!data.name || !data.email || !data.company) {
    throw new Error("All fields are required")
  }

  // Check if email is from a public domain
  const publicDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com"]
  const domain = data.email.split("@")[1]

  if (!domain || publicDomains.includes(domain.toLowerCase())) {
    throw new Error("Please use your work email")
  }

  // Simulate a delay for the API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real application, you would:
  // 1. Store the data in your database
  // 2. Send a confirmation email
  // 3. Add the user to your CRM or marketing platform

  return { success: true }
}
