"use client";

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

const anchors: {[pathname: string]: string[]} = {
  "/": [
    "Experience",
    "Projects",
  ],
  "/projects": [],
};

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname: string = usePathname();
  console.log({pathname});
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {pathname in anchors ? anchors[pathname].map((link, i) => 
        <Link
          href={`/#${link}`}
          className="text-sm font-medium text-secondary-foreground transition-colors hover:text-primary"
        >
          {link}
        </Link>
      ) : null}
    </nav>
  )
}