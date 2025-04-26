"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import WaitlistModal from "@/components/waitlist-modal"

export default function WaitlistCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex justify-center">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#1a2d5a] px-8 py-6 text-lg font-medium text-white hover:bg-[#2a3d6a]"
      >
        Join the Waitlist
      </Button>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
