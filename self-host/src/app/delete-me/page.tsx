import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel"

export const CarouselSpacing = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Carousel className="w-full max-w-sm -scale-x-100 transition-transform duration-500 ease-linear">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="-scale-x-100 transition-transform duration-500 ease-linear"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="-left-12 rotate-180" />
        <CarouselNext defaultDirection="right" />
      </Carousel>
    </main>
  )
}

export default CarouselSpacing
