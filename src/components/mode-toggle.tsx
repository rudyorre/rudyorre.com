"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme, themes, theme } = useTheme();
  const [delayHandler, setDelayHandler] = React.useState<NodeJS.Timeout | undefined>(undefined);
  const [open, setOpen] = React.useState<boolean>(false);
  const [cachedTheme, setCachedTheme] = React.useState<string | undefined>(undefined);
  const [search, setSearch] = React.useState<string>("");
  const [pointer, setPointer] = React.useState<number>(0);
 
  React.useEffect(() => {
    if (open) {
      setCachedTheme(theme);
    }
    if (!open && cachedTheme) {
      setTheme(cachedTheme);
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
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
    setOpen(false);
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

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || !cachedTheme) {
      for (let i = 0; i < themes.length; i++) {
        if (themes[i].startsWith(search)) {
          setCachedTheme(themes[i]);
          break;
        }
      }
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      setPointer(Math.min(pointer + 1, themes.length - 1));
    }
    if (e.key === 'ArrowUp') {
      setPointer(Math.max(pointer - 1, 0));
    }
  };

  const mapThemeToItem = (t: string, i: number) => (
    <div
      key={"suggested" + i}
      onMouseEnter={() => handleMouseEnter(t)}
      onMouseLeave={() => handleMouseLeave()}
      onClick={() => handleClick(t)}
    >
      <CommandItem className="cursor-pointer">
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
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-lg" onClick={() => setOpen(true)}>
                <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                <span className="sr-only">Toggle theme</span>
              </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p><kbd className="px-2 py-1 font-semibold border border-border bg-muted rounded-lg">ESC</kbd> to Open</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={handleOnChange}
          onKeyDown={handleInputKeyDown}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Default Themes">
            {themes.slice(0,2).map(mapThemeToItem)}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Special Themes">
            {themes.slice(2,themes.length).map(mapThemeToItem)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
};
