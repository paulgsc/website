import { cn } from "@/lib"

const ChallengesHome = () => {
  return (
    <div
      style={{
        backgroundRepeat: "no-repeat, repeat",
      }}
      className={cn(
        "bg-countdown-timer absolute inset-0",
        "bg-[url('./assets/challenges/countdown-timer/hills.svg'),_url('./assets/challenges/countdown-timer/stars.svg')]",
        "bg-contain bg-[position:bottom,_top]"
      )}
    ></div>
  )
}

export default ChallengesHome
