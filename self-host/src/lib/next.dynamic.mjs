"use server";

/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import { glob } from "glob";

/**
 * We create a locale cache of Glob Promises
 * to avoid reading the file system multiple times
 *
 * this is done since we don't need to constantly re-run the glob
 * query as it is only needed once
 *
 * @type {Map<string, Promise<string>>} */
const globCacheByPath = new Map();

/**
 * This method is responsible for retrieving a glob of all files that exist
 * within a given language directory
 *
 * Note that we ignore the blog directory for static builds as otherwise generating
 * that many pages would be too much for the build process to handle.
 *
 * @param {string} root the root directory to search from
 * @param {string} cwd the given locale code
 * @param {Array<string>} ignore an array of glob patterns to ignore
 * @returns {Promise<Array<string>>} a promise containing an array of paths
 */
const getMarkdownFiles = async (root, cwd, ignore = []) => {
  const cacheKey = `${root}${cwd}${ignore.join("")}`;

  if (!globCacheByPath.has(cacheKey)) {
    globCacheByPath.set(cacheKey, glob("**/*.{md,mdx}", { root, cwd, ignore }));
  }

  return globCacheByPath.get(cacheKey);
};

// const DYNAMIC_ROUTES = new Map([
//   // Provides Routes for all Blog Categories
//   ...provideBlogCategories().map((c) => [`blog/${c}`, "blog-category"]),
//   // Provides Routes for all Blog Categories w/ Pagination
//   ...provideBlogCategories()
//     // retrieves the amount of pages for each blog category
//     .map((c) => [c, provideBlogPosts(c).pagination.pages])
//     // creates a numeric array for each page and define a pathname for
//     // each page for a category (i.e. blog/all/page/1)
//     .map(([c, t]) => [...Array(t).keys()].map((p) => `blog/${c}/page/${p + 1}`))
//     // creates a tuple of each pathname and layout for the route
//     .map((paths) => paths.map((path) => [path, "blog-category"]))
//     // flattens the array since we have a .map inside another .map
//     .flat(),
// ]);

const getDynamicRouter = async () => {
  // Keeps the map of pathnames to filenames
  const pathnameToFilename = new Map();

  const websitePages = await getMarkdownFiles(process.cwd(), `pages/`);

  websitePages.forEach((filename) => {
    // This Regular Expression is used to remove the `index.md(x)` suffix
    // of a name and to remove the `.md(x)` extensions of a filename.
    let pathname = filename.replace(/((\/)?(index))?\.mdx?$/i, "");

    if (pathname.length > 1 && pathname.endsWith(sep)) {
      pathname = pathname.substring(0, pathname.length - 1);
    }

    pathname = normalize(pathname).replace(".", "");

    // We map the pathname to the filename to be able to quickly
    // resolve the filename for a given pathname
    pathnameToFilename.set(pathname, filename);
  });

  return [...pathnameToFilename.keys()];
};

export default getDynamicRouter;
