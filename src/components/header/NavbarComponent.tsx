"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "@/types/menu";


export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <Navbar isBordered
    isMenuOpen={isMenuOpen}
    onMenuOpenChange={setIsMenuOpen}>
   <NavbarContent className="sm:hidden" justify="start">
        <div className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" style={{color: 'warning'}}>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
      </NavbarContent>

    <NavbarContent className="sm:hidden pr-3" justify="center">
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <Link href="/">
          HEMECHI
          </Link>
        </p>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent className="hidden sm:flex gap-7" justify="center">
      <NavbarBrand>
        <p className="font-bold text-inherit">
        <Link href="/">
          HEMECHI
          </Link>
        </p>
      </NavbarBrand>
      <NavbarItem className="hover:text-skin">
        <Link color="foreground" href="/about-us">
          About
        </Link>
      </NavbarItem>
      <NavbarItem className="hover:text-skin">
        <Link href="/policy" aria-current="page" color="warning">
          Policy
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex hover:text-skin">
        <Link href="#">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="warning" href="/dashboard" variant="flat">
          Dashboard
        </Button>
      </NavbarItem>
    </NavbarContent>

    <NavbarMenu>
      {menu.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
              color="foreground"
              href={item.path}
              className={`${pathname === item.path && "font-bold hover:text-skin"}`}
            >
              {
                item.title
              }
            </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  </Navbar>
  );
}
