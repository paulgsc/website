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
        <DrawerHeader>
          <DrawerTitle>
            <h1 className="uppercase">open</h1>
            <h2 className="uppercase">hours</h2>
          </DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
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
