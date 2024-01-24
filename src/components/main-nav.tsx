"use client";

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "./ui/button";

const anchors: {[pathname: string]: string[]} = {
  "/": [
    "Experience",
    "Projects",
  ],
  "/projects": [],
};

const isBrowser = () => typeof window !== 'undefined';
const scrollToTop = () => {
  if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname: string = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {pathname === "/" ?
        <button onClick={scrollToTop} className="inline-flex">
          <div className="font-extrabold text-primary">rudyorre</div>.com
        </button>
      :
        <Link href="/" className="inline-flex">
          <div className="font-extrabold text-primary">rudyorre</div>.com
        </Link>
      }
      {pathname in anchors ? anchors[pathname].map((link, i) => 
        <a
          href={`/#${link}`}
          className="text-sm font-medium text-secondary-foreground transition-colors hover:text-primary"
        >
          {link}
        </a>
      ) : null}
    </nav>
  )
}