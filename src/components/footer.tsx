import { Icons } from "./icons";

const socialLinks = [
  {
    href: "https://youtube.com",
    icon: <Icons.youtube aria-hidden="true" className="h-7 w-7 text-red-600" />,
  },
  {
    href: "https://linkedin.com",
    icon: (
      <Icons.linkedin
        aria-hidden="true"
        className="h-5 w-5 text-white bg-blue-600"
      />
    ),
  },
  {
    href: "https://twitter.com",
    icon: <Icons.twitter aria-hidden="true" className="h-4 w-4" />,
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/faqs", label: "FAQs" },
  { href: "/pricing", label: "Price Plan" },
  { href: "/features", label: "Features" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "Products" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-tr from-zinc-200 to-sky-100 dark:from-transparent dark:to-slate-800">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="py-14 grid grid-cols-12 gap-x-5 gap-y-8">
          <div className="col-span-full xl:col-span-3 relative bg-gradient-to-tr from-slate-300 dark:from-slate-700 to-sky-200 dark:to-slate-950 rounded-md gap-12 p-6 xl:w-72 h-96 flex flex-col justify-center items-center">
            <h3>Limited Availability - See Our Operating Hours</h3>
            <p className="text-center text-white font-medium tracking-wide ">
              Trusted in more than 100 countries & 5 million customers. Have any
              query? contact us we are here for you.
            </p>

            <div className="flex space-x-4 sm:justify-center">
              {socialLinks.map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="block text-center xl:text-left xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3 xl:pl-5">
            <h4 className="text-lg text-gray-900 font-bold mb-9">
              Get In Touch
            </h4>
            <ul className="text-gray-900 dark:text-white transition-all duration-500 grid gap-6">
              <li>support@pagedone.com</li>
              <li>+91 945 658 3256</li>
              <li>61-A, Elm street, Gujarat, India.</li>
            </ul>
          </div>
          <div className="block xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3">
            <h4 className="text-lg text-gray-900 dark:text-white font-bold mb-9 text-center xl:text-left">
              Quick Links
            </h4>
            <div className="flex gap-6 xl:gap-12 max-xl:justify-center">
              <ul className="text-gray-600 dark:text-white transition-all duration-500 grid gap-6">
                {quickLinks
                  .slice(0, quickLinks.length / 2)
                  .map(({ href, label }) => (
                    <li key={href}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
              </ul>
              <ul className="text-gray-600 transition-all duration-500 grid gap-6">
                {quickLinks
                  .slice(quickLinks.length / 2)
                  .map(({ href, label }) => (
                    <li key={href}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="block xl:py-16 col-span-full md:col-span-4 xl:col-span-3">
            <h4 className="text-lg text-gray-900 font-bold mb-9 text-center xl:text-left">
              Limited Availability - See Our Operating Hours
            </h4>
            <div className="grid gap-7 ">
              <p
                role="text"
                className=" text-wrap inline-flex flex-shrink tracking-tight text-sm"
              >
                Please note: This website has limited operating hours. To ensure
                the best experience, please visit us during our operational
                times. If you try to access the site outside of these hours, you
                might see a Cloudflare error message. We apologize for any
                inconvenience this may cause.
              </p>
              <button
                type="submit"
                className="flex gap-2 justify-center items-center py-3.5 px-7 rounded-full text-white bg-indigo-600 shadow-md w-fit transition-all duration-500 mx-auto xl:mx-0 hover:bg-indigo-700"
              >
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
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 bg-indigo-50 dark:bg-slate-950 dark:bg-blend-screen">
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-800 dark:text-white">
            Copyright@2024 All Right Reserved by{" "}
            <a href="https://pagedone.io/">pagedone</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
