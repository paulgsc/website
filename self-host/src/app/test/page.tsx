import YoutubeBadge from "@/components/youtube-badge"

const Page = () => {
  return (
    <main className="max-lg:min-h-screen overflow-auto bg-red-500 size-full xl:flex xl:items-center xl:justify-center">
      <div className="hidden lg:grid w-full grid-flow-col grid-cols-[.05fr_.4fr_.5fr_.05fr] bg-green-50">
        <div className="size-full border border-black col-start-2">
          <div className="space-y-4 xl:me-12 xl:mt-12 ">
            <YoutubeBadge />
            <div className="w-full max-w-lg truncate text-wrap">
              <span className="text-end capitalize">
                # Yet another zero user webiste!
              </span>
              <span>
                #### I learn best by building, thus this site. Hosting is
                expensive so this site has hours of operation. Btw checkout my
                youtube, easier growing that than this website.
              </span>
            </div>
          </div>
        </div>
        <div className="size-full border border-black col-start-3">foo</div>
      </div>
      <div className="md:hidden size-full">
        {Array.from({ length: 10 }, (v) => (
          <div
            key={v}
            className="w-full h-fit flex items-center justify-center border border-black"
          >
            foo
          </div>
        ))}
      </div>
    </main>
  )
}

export default Page
