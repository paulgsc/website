import { cn } from "@/lib"

const ChallengesHome = () => {
  return (
    <div
      className={cn(
        "bg-countdown-timer absolute inset-0",
        "bg-[url('./assets/challenges/countdown-timer/hills.svg')] bg-bottom bg-no-repeat"
      )}
    ></div>
  )
}

export default ChallengesHome
