import { authors as authorsMap } from "next.json.mjs"

import { getGitHubAvatarUrl } from "./github-utils"

export const mapAuthorToCardAuthors = (author: string) => {
  const authors = author.split(/, | and |;| & | prepared by | by /i)

  return authors.map((fullName) => {
    let src = `https://ui-avatars.com/api/?name=${fullName}`

    src = getGitHubAvatarUrl(authorsMap[fullName].id)

    return { fullName, src }
  })
}
