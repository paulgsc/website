/*
 * This React component is adapted from the "shadcn-landing-page" repository
 * by leoMirandaa, available under the MIT License.
 *
 * Repository: https://github.com/leoMirandaa/shadcn-landing-page
 * License: MIT (https://opensource.org/licenses/MIT)
 */

import Image from "next/image";
import { Statistics } from "./statistics";
import { Pilot } from "@/assets";

export const About = () => {
  return (
    <section className=" max-sm:w-full md:container ">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image src={Pilot} alt="" className="object-contain rounded-lg" />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Company
              </h2>
              <p className="text-base lg:text-xl text-wrap text-muted-foreground mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
