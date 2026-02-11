import { Button } from "@/components/ui/button";

const navs = ["Features", "Integrations"];

const Navbar = () => (
  <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white text-black backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 flex h-16 items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-6 rounded-lg flex items-center justify-center">
          <img src="logo.svg" />
        </div>
        <h2 className="text-xl font-extrabold tracking-tight text-black">
          Zendo
        </h2>
      </div>
      <nav className="hidden md:flex flex-1 justify-center gap-10">
        {navs.map((item) => (
          <a
            key={item}
            className="text-sm font-semibold hover:text-primary transition-colors"
            href={`#${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Button className="hidden sm:block text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer text-white">
          <a href="/signin">Login</a>
        </Button>
        <Button className="px-5 text-white cursor-pointer">
          <a href="/signup">Get Started</a>
        </Button>
      </div>
    </div>
  </header>
);

export default Navbar;
