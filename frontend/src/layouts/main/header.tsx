import Image from "@/components/Image";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/image";
import { SignOutButton } from "@clerk/react-router";

export default function Header() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <section className="flex justify-start items-center">
          <a href="#" className="flex items-center justify-between mr-4">
            <Image
              src={IMAGES.LOGO}
              className="mr-3 h-8"
              alt="Logo"
              fallbackSrc="/logo.png"
              objectFit="contain"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden sm:inline-block">
              OpenB2B
            </span>
          </a>
        </section>
        <section className="flex items-center lg:order-2">
          <ThemeToggle className="mr-2" />
          <SignOutButton>
            <Button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 dark:hover:bg-primary-600 cursor-pointer">
              Sign Out
            </Button>
          </SignOutButton>
        </section>
      </div>
    </nav>
  );
}
