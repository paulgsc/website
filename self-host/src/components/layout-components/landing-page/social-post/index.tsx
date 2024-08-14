import { FC } from "react"
import { BellRing, Check, Users } from "lucide-react"

import type { RequiredAccess, RoleWithAllAccess } from "@/types/auth/roles"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createCMSComponent } from "@/components/withCMS"

const notifications = [
  {
    title: "landing page for unknowns.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

const SocialPost = () => {
  return (
    <main className="flex items-center justify-center">
      <Card className="w-full max-w-sm backdrop-blur-md bg-cyan-900 border-transparent">
        <CardHeader>
          <CardTitle className="text-emerald-200">Latest activity</CardTitle>
          <CardDescription className="text-amber-100">
            OP has made some changes...
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-white">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-slate-800">
            <Check className="mr-2 h-4 w-4 " /> Follow on
            <span className="text-red-500 ps-1.5">youtube</span>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

const requiredRoles: Array<
  RoleWithAllAccess<Array<RequiredAccess<"waitlist">>>
> = ["unknown", "recruiter"]

const AuthorizedSocialPost = createCMSComponent(requiredRoles, SocialPost)

export default AuthorizedSocialPost
