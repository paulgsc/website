/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import { dynamicRouter } from "@/lib";
import { MetadataRoute } from "next";

// This is the combination of the Application Base URL and Base PATH
//@todo fix this os it returns something?
const BASE_URL = process.env.WWW_SERVER_URL;
const baseUrlAndPath = `${BASE_URL}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths: Array<string> = [];

  const routes = await dynamicRouter();

  paths.push(...routes.map((route) => `${baseUrlAndPath}/${route}`));
  const currentDate = new Date().toISOString();

  return [...paths].map((route) => ({
    url: route,
    lastModified: currentDate,
    changeFrequency: "always",
    priority: 1,
  }));
}

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error";
