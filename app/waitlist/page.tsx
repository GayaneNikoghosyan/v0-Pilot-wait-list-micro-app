import WaitlistForm from "@/components/waitlist-form"

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Join our waitlist</h1>
          <p className="text-zinc-600">
            Be the first to know when we launch. We're building something special and can't wait to share it with you.
          </p>
        </div>
        <WaitlistForm />
      </div>
    </div>
  )
}
