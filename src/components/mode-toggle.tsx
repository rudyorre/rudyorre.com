"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from "@/components/ui/command"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme, themes, theme } = useTheme();
  const [delayHandler, setDelayHandler] = React.useState<NodeJS.Timeout | undefined>(undefined);
  const [open, setOpen] = React.useState<boolean>(false);
  const [cachedTheme, setCachedTheme] = React.useState<string | undefined>(undefined);
  const [search, setSearch] = React.useState<string>("");
 
  React.useEffect(() => {
    if (open) {
      setCachedTheme(theme);
    }
    if (!open && cachedTheme) {
      setTheme(cachedTheme);
    }
  }, [open])

  const handleMouseEnter = (t: string) => {
    setDelayHandler(setTimeout(() => {
      setTheme(t);
    }, 300))
  };

  const handleMouseLeave = () => {
    clearTimeout(delayHandler);
  };

  const handleClick = (t: string) => {
    setTheme(t);
    setCachedTheme(t);
  }

  const handleOnChange = (s: string) => {
    setSearch(s);
    for (let i = 0; i < themes.length; i++) {
      if (themes[i].startsWith(s)) {
        handleMouseEnter(themes[i]);
        break;
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || !cachedTheme) {
      return null;
    }
    for (let i = 0; i < themes.length; i++) {
      if (themes[i].startsWith(search)) {
        setCachedTheme(themes[i]);
        break;
      }
    }
    setOpen(false);
  };

  const mapThemeToItem = (t: string, i: number) => (
    <div
      key={"suggested" + i}
      onMouseEnter={() => handleMouseEnter(t)}
      onMouseLeave={() => handleMouseLeave()}
      onClick={() => handleClick(t)}
    >
      <CommandItem  className="cursor-pointer">
        <FontAwesomeIcon
          icon={faCheck}
          className={cn(
            t === cachedTheme ? "opacity-100" : "opacity-0",
            "mr-2"
          )}
        />
        {t}
      </CommandItem>
    </div>
  );

  return (
    <>
      <Button variant="outline" size="icon" className="rounded-lg" onClick={() => setOpen(true)}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={handleOnChange}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggested Themes">
            {themes.slice(0,3).map(mapThemeToItem)}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Themes">
            {themes.slice(3,themes.length - 1).map(mapThemeToItem)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
};
