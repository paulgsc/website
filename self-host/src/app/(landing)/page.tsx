import Image from "next/image";
import { About } from "./components/about";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="z-10 w-full lg:max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <About />
      </div>
    </main>
  );
}
