import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";

export default function OpenHours() {
  return (
    <Drawer>
      <DrawerTrigger className="flex gap-2 justify-center items-center py-3.5 px-7 rounded-full text-white bg-indigo-600 shadow-md w-fit transition-all duration-500 mx-auto xl:mx-0 hover:bg-indigo-700">
        Open hours
        <svg
          width="17"
          height="13"
          viewBox="0 0 17 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 6.88281L14.8333 6.88281M10.6667 11.8828L15.0774 7.47207C15.3552 7.19429 15.4941 7.0554 15.4941 6.88281C15.4941 6.71022 15.3552 6.57133 15.0774 6.29356L10.6667 1.88281"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </DrawerTrigger>
      <DrawerContent className=" container flex items-center justify-center bg-gradient-to-br from-cyan-400 to-teal-950">
        <Separator className="my-4 2xl:my-8 opacity-0" />
        <DrawerHeader>
          <DrawerTitle className="flex flex-col items-center ">
            <h1 className="xl:text-5xl 2xl:text-6xl tracking-wide uppercase font-bold text-white">
              open
            </h1>
            <div className="relative h-12 xl:w-36 2xl:w-40 flex items-center justify-center text-wrap before:absolute before:left-0 before:w-2.5 before:top before:h-2.5 before:bg-white before:rounded-full after:absolute after:right-0 after:w-2.5 after:h-2.5 after:bg-white after:rounded-full">
              <h2 className="xl:text-3xl 2xl:text-4xl tracking-wide text-center uppercase font-bold text-white ">
                hours
              </h2>
            </div>
          </DrawerTitle>
          <DrawerDescription className=" mx-auto p-2.5 px-4 border border-white mt-6">
            <article className="flex flex-col gap-y-2.5">
              <h3 className="grid grid-cols-3 text-center items-center text-2xl uppercase font-bold text-white">
                <span>monday</span>{" "}
                <span className="inline-flex justify-center items-end">
                  <span className="text-xs font-normal tracking-tighter relative after:absolute after:inset-0 after:h-0.5 after:bg-white before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-white">
                    thru
                  </span>
                </span>
                <span>friday</span>
              </h3>
              <p className="grid grid-cols-3 items-center text-center text-xl xl:text-4xl 2xl:text-5xl tracking-tight uppercase font-bold text-white">
                <span className="">12:00 pm</span> <span>-</span>{" "}
                <span>6:00 pm</span>
              </p>
            </article>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
