import { memo } from "react";
import { IMAGES } from "@/constants/image";
import Image from "@/components/Image";

const Logo = memo(() => (
  <a href="#" className="flex items-center">
    <Image
      src={IMAGES.LOGO}
      className="h-8"
      alt="Logo"
      fallbackSrc="/logo.png"
      objectFit="contain"
    />
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden sm:inline-block ml-1">
      Zendo
    </span>
  </a>
));

export default Logo;
