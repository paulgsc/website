import { Icons } from "@/components/icons"

const ChallengesHome = () => {
  return (
    <div className="absolute inset-0 grid grid-rows-[3fr_1fr] bg-red-500">
      <Icons.stars className="size-auto" />
      <Icons.hills className="size-auto" />
    </div>
  )
}

export default ChallengesHome
