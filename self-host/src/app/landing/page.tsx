"use client"

import { type FC } from "react"

import AutoPlayCarousel from "@/components/shared-components/autoplay-carousel"

const Home: FC = () => {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <AutoPlayCarousel />
    </main>
  )
}

export default Home
