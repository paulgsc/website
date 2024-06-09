import { cn } from "@/lib"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "@/components/link"

const NotFoundPage = () => {
  return (
    <div className="via-muted absolute inset-0 flex items-center justify-center bg-gradient-to-b from-pink-50 to-pink-100 ">
      <article className=" xl:bg-card absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-inherit shadow-md shadow-pink-100 xl:inset-[14%] xl:inset-x-1/3 2xl:inset-1/4 2xl:inset-x-1/3">
        <figure className="relative">
          <h1 className="font-heading absolute -top-14 left-[35%] scroll-m-20 text-4xl font-bold uppercase leading-10 tracking-wide">
            404!
          </h1>
          <div className="flex h-6 w-60 items-center justify-between rounded-t-md bg-blue-600 px-2">
            <span className="inline-flex shrink-0 items-center space-x-0.5">
              {Array.from({ length: 3 }, (_, k) => (
                <div
                  key={k}
                  className="size-3 rounded-full bg-blue-800 brightness-95"
                />
              ))}
            </span>
            <div className="h-3 w-4 rounded-full bg-blue-800 brightness-95" />
          </div>
          <div className="bg-accent flex h-48 w-60 flex-col items-center justify-center gap-y-6 rounded-md shadow-lg">
            <h3
              role="alert"
              className="inline-flex size-20 shrink-0 items-center justify-center rounded-full bg-indigo-400 p-2.5 text-center font-bold uppercase leading-10 tracking-tight text-pink-100 blur-sm 2xl:text-lg"
            >
              404!
            </h3>
            <span className="-space-x-1.5 space-y-1">
              <div
                aria-hidden="true"
                className="after:bg-accent-foreground/40 relative me-4 h-1.5 w-12 rounded-lg bg-gray-300 saturate-50 after:absolute after:-right-8 after:h-1.5  after:w-5 after:rounded-lg"
              />
              <div
                aria-hidden="true"
                className="after:bg-accent-foreground/40 relative h-1.5 w-4 rounded-lg bg-gray-300 saturate-50 after:absolute after:-right-16 after:h-1.5  after:w-14 after:rounded-lg"
              />
              <div
                aria-hidden="true"
                className="after:bg-accent-foreground/40 relative h-1.5 w-8 rounded-lg bg-gray-300 saturate-50 after:absolute after:-right-16 after:h-1.5  after:w-8 after:rounded-lg"
              />
            </span>
          </div>
        </figure>
        <p className="mb-2.5w-full mt-6 max-w-xs truncate text-wrap text-center text-sm font-medium tracking-tight 2xl:text-lg">
          The page you searched for could not be found! That&apos;s all we know!
        </p>
        <span className="mt-6">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link" }),
              "inline-flex shrink-0 items-center space-x-1.5 bg-blue-600 text-center text-white"
            )}
          >
            <span> Back to Home</span>
            <Icons.arrowRight className="size-3" />
          </Link>
        </span>
      </article>
    </div>
  )
}

export default NotFoundPage
