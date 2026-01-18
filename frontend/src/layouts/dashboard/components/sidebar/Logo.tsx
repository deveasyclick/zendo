import { memo } from "react";
import { IMAGES } from "@/constants/image";
import Image from "@/components/Image";

const Logo = memo(() => (
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
));

export default Logo;
