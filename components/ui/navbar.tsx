"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import ColorModeToggle from "./color-mode-toggle";

const Navbar = () => (
  <div className="flex justify-between w-full py-2 items-center">
    <p>Custom resume generator</p>
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Generate</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-1 whitespace-nowrap">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/generate">Use the generator</Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/sample">Try a sample</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <ColorModeToggle />
    </NavigationMenu>
  </div>
);

export default Navbar;
