import Image from "next/image"
import WaitlistCTA from "@/components/waitlist-cta"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-[#f5f8ff] px-4 py-12">
      <div className="container max-w-4xl text-center">
        <div className="mb-10 flex justify-center">
          <Image src="/images/logo-full.png" alt="Lumenarc" width={300} height={80} priority className="h-auto" />
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#1a2d5a] sm:text-5xl md:text-6xl">
          Powering the Future of AI-driven B2B Marketing
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-xl text-[#4a5568]">
          At Lumenarc, we turn raw Go-to-Market ideas into automated workflows. Join the waitlist to be among the first
          to experience it.
        </p>

        <WaitlistCTA />
      </div>
    </main>
  )
}
