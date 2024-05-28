/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import { createContentlayerPlugin } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We want to always enforce that SWC minifies the sources even during Development mode
  // so that bundles are minified on-the-go. SWF minifying is fast, and has almost no penalties
  swcMinify: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/about/me",
        destination: "/about/meet-the-creator",
        permanent: true,
      },
      {
        source: "/about/author",
        destination: "/about/meet-the-creator",
        permanent: true,
      },
      {
        source: "/author",
        destination: "/about/meet-the-creator",
        permanent: true,
      },
      {
        source: "/paul",
        destination: "/about/meet-the-creator",
        permanent: true,
      },
      {
        source: "/docs/about/:path*",
        destination: "/about",
        permanent: true,
      },
    ]
  },

  webpack: function (config) {
    // Next.js WebPack Bundler does not know how to handle `.mjs` files on `node_modules`
    // This is not an issue when using TurboPack as it uses SWC and it is ESM-only
    // Once Next.js uses Turbopack for their build process we can remove this
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: { fullySpecified: false },
    })

    return config
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
