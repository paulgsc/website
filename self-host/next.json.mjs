"use strict"

import _authors from "./authors.json" with { type: "json" }

/** @type {Record<string, import('./types').Author>} */
export const authors = _authors
