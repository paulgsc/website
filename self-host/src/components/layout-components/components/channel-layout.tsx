import type { FC, PropsWithChildren } from "react"

const ChannelLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-7.5rem)] w-full shrink-0 overflow-y-auto rounded-r-md border-r bg-[url('./assets/barn_owl.png')] bg-cover bg-[position:55%_center] bg-no-repeat py-6 pr-2 opacity-90 md:sticky md:block lg:py-10"></aside>
    {children}
  </div>
)

export default ChannelLayout
