"use client";

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as Navlink, Button} from "@nextui-org/react";
import { ModeToggle } from '@/components/mode-toggle'

const anchors: {[pathname: string]: string[]} = {
  "/": [
    "Experience",
    "Projects",
    "Hobbies",
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
    // <div className="border-b fixed top-0 z-20 w-screen">
      // <div className="flex h-16 items-center px-4 max-w-screen-xl mx-auto">
        <Navbar className="border-b">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <button onClick={scrollToTop} className="inline-flex">
              <div className="font-extrabold text-primary">rudyorre</div>.com
            </button>
            {/* <p className="font-bold text-inherit">ACME</p> */}
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {pathname in anchors ? anchors[pathname].map((link, i) => 
              <NavbarItem key={i}>
                <a
                  href={`/#${link}`}
                  className="text-sm font-medium text-secondary-foreground transition-colors hover:text-primary"
                >
                  {link}
                </a>
              </NavbarItem>
            ) : null}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <ModeToggle />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      // </div>
    // </div>
  );
  // return (
  //   <nav
  //     className={cn("flex items-center space-x-4 lg:space-x-6", className)}
  //     {...props}
  //   >
  //     {pathname === "/" ?
  //       <button onClick={scrollToTop} className="inline-flex">
  //         <div className="font-extrabold text-primary">rudyorre</div>.com
  //       </button>
  //     :
  //       <Link href="/" className="inline-flex">
  //         <div className="font-extrabold text-primary">rudyorre</div>.com
  //       </Link>
  //     }
      // {pathname in anchors ? anchors[pathname].map((link, i) => 
      //   <a
      //     href={`/#${link}`}
      //     className="text-sm font-medium text-secondary-foreground transition-colors hover:text-primary"
      //   >
      //     {link}
      //   </a>
      // ) : null}
  //   </nav>
  // )
}