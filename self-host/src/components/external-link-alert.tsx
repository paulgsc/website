import type { ComponentProps, FC } from "react"
import type NextLink from "next/link"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"

type ExternalLinkProps = Omit<
  ComponentProps<typeof NextLink>,
  "href" | "rel"
> & {
  href?: string
}

const ExternalLinkAlert: FC<ExternalLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const { className, ...rest } = props
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button role="link" className={className}>
          {children}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Open an External link from the web
          </AlertDialogTitle>
          <AlertDialogDescription className="inline-block space-x-2.5">
            <p className="text-accent-foreground text-nowrap text-sm leading-6">
              You’re about to be navigated to
            </p>
            <span className="text-accent- truncate text-wrap text-sm tracking-tight">
              {href}
            </span>
            <span className="text-base font-semibold leading-6">
              Is that okay?
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <a href={href} rel="noreferrer" {...rest}>
              continue
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ExternalLinkAlert
