"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import ColorModeToggle from "./color-mode-toggle";

const Navbar = () => (
  <NavigationMenu
    className="flex justify-between w-full py-2 items-center sticky top-0 z-10 bg-background"
    viewport={false}
  >
    <NavigationMenuLink asChild>
      <Link href="/">Custom Resume Generator</Link>
    </NavigationMenuLink>
    <div className="flex items-center gap-2 pr-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/generate">Generate</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <ColorModeToggle />
    </div>
  </NavigationMenu>
);

export default Navbar;
