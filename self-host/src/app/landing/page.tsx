import type { FC } from "react"

import YoutubeBadge from "@/components/youtube-badge"

import { About } from "./components/about"

const Home: FC = () => {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex lg:max-w-5xl">
        <YoutubeBadge />
        <About />
      </div>
    </main>
  )
}

export default Home
