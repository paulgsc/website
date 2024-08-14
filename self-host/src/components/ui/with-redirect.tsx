import { FC } from "react"
import { redirect } from "next/navigation"

type WithRedirectProps = {
  path?: string
}

const WithRedirect: FC<WithRedirectProps> = ({ path = "/404" }) => {
  return redirect(path)
}

export default WithRedirect
