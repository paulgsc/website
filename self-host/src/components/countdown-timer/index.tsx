import { CountDownCard, CountDowndTitle } from "./bg-card"

const Countdown = () => {
  return (
    <CountDownCard className="flex flex-col items-center justify-center">
      <CountDowndTitle>
        we<span className="-ms-1 italic">&apos;</span>re launching soon
      </CountDowndTitle>
    </CountDownCard>
  )
}

export default Countdown
