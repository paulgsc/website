import { CountDownCard, CountDownCardItem, CountDowndTitle } from "./bg-card"
import TimeCardUi from "./time-card-ui"

const Countdown = () => {
  return (
    <CountDownCard>
      <div className="2xl:gap-18 flex flex-col items-center justify-center max-lg:min-h-screen md:mt-28 md:gap-14 lg:mt-24 lg:gap-16 2xl:mt-32">
        <CountDowndTitle>
          we<span className="-ms-1 italic">&apos;</span>re launching soon
        </CountDowndTitle>

        <CountDownCardItem className="flex shrink-0 items-center gap-x-8 gap-y-4">
          <TimeCardUi />
        </CountDownCardItem>
      </div>
    </CountDownCard>
  )
}

export default Countdown
