import type { ReactNode } from "react"

const Template = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <>
      {/* @todo add some banner logic here */}

      {/* <Marquee>some banner</Marquee> */}
      {children}
    </>
  )
}

export default Template
