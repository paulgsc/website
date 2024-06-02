/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { ComponentProps, FC } from "react"
import NextLink from "next/link"

import ExternalLinkAlert from "./external-link-alert"

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href" | "rel"> & {
  href?: string
}

const Link: FC<LinkProps> = ({ children, href, ...props }) => {
  if (!href || href.toString().startsWith("http")) {
    return (
      <ExternalLinkAlert href={href} {...props}>
        {children}
      </ExternalLinkAlert>
    )
  }

  return (
    <NextLink href={href?.toString()} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
