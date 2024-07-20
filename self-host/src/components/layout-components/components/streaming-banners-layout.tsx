import { type FC } from "react"

import { Separator } from "@/components/ui/separator"
import BannerFormDrawer from "@/components/streaming/banner-msg/banner-form-drawer"
import { BannerMarquee } from "@/components/streaming/banner-msg/banner-marquee"
import BannerFormsCard from "@/components/streaming/banner-msg/forms"

const StreamingBannersLayout: FC = () => {
  const msg = "adding blog markdown - using nodejs.org as template"
  return (
    <div className="relative justify-center sm:h-[980px] lg:h-[1200px] xl:h-[540px] 2xl:h-[55rem]">
      <main className="absolute inset-0 flex items-center justify-center">
        <BannerMarquee msg={msg} duration={24} />
      </main>
      <BannerFormDrawer>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <BannerFormsCard />
        </div>
      </BannerFormDrawer>
    </div>
  )
}

export default StreamingBannersLayout
