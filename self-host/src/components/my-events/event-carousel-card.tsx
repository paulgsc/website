const EventCarouselCard = () => {
  return (
    <div className="flex items-center justify-center -space-x-20 transition-transform duration-500 ease-linear rtl:space-x-reverse">
      <div className="bg-accent-foreground z-0 size-72 scale-90 rounded-xl" />
      <div className="bg-accent z-10 size-72 scale-105 rounded-xl" />
      <div className="-translate-x-ful z-0 size-72 scale-90 rounded-xl bg-teal-300 transition-transform duration-500 ease-linear" />
    </div>
  )
}

export default EventCarouselCard
