"use client";

import Link from "next/link";

import ColorModeToggle from "./color-mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";

const Navbar = () => (
  <NavigationMenu
    className="flex justify-between w-full py-2 items-center sticky top-0 z-10 bg-background"
    viewport={false}
  >
    <NavigationMenuLink
      asChild
      className="text-md font-(family-name:--font-merriweather-sans)"
    >
      <Link href="/">Custom Resume Generator</Link>
    </NavigationMenuLink>
    <div className="flex items-center gap-2">
      <ColorModeToggle />
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
    </div>
  </NavigationMenu>
);

export default Navbar;
