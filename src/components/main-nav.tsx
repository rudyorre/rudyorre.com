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
    "Contact",
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
        <Navbar className="border-b">
          <NavbarBrand>
            {pathname === "/" ?
              <button onClick={scrollToTop} className="inline-flex">
                <div className="font-extrabold text-primary">rudyorre</div>.com
              </button>
            :
              <Link href="/" className="inline-flex">
                <div className="font-extrabold text-primary">rudyorre</div>.com
              </Link>
            }
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
  );
}