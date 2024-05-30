import type { FC, PropsWithChildren } from "react"

const ChannelLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative hidden w-full grid-cols-[.20fr_.65fr_.15fr] md:mt-12 md:grid">
    <aside></aside>
    {children}
  </div>
)

export default ChannelLayout
