/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { FC, ComponentProps } from "react";
import NextLink from "next/link";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href?: string;
};

const Link: FC<LinkProps> = ({ children, href, ...props }) => {
  if (!href || href.toString().startsWith("http")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href?.toString()} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
