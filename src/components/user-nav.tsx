import {
Avatar,
AvatarFallback,
AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuGroup,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuShortcut,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserNav() {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/rudyorre.png" alt="@shadcn" />
                <AvatarFallback>RO</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Rudy Orre</p>
                <p className="text-xs leading-none text-muted-foreground">
                rudyorre@gmail.com
                </p>
            </div>
            </DropdownMenuLabel>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}