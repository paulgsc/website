import type { FC, PropsWithChildren } from "react"

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

const BannerFormDrawer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Drawer>
      <DrawerTrigger className="absolute inset-0">
        <span className="sr-only">Open</span>
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-[80vh] px-10">
        {children}
      </DrawerContent>
    </Drawer>
  )
}

export default BannerFormDrawer
