"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Wordmark } from "@/components/wordmark"
import { cn } from "@/lib/utils"

const links = [
  { href: "/studio", label: "Studio" },
  { href: "/admin", label: "Admin" },
  { href: "/book", label: "Book" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-6 rounded-full bg-white px-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:h-[58px] sm:px-5">
        <Wordmark />
        <nav className="hidden flex-1 items-center gap-6 text-[13.5px] text-[#111]/75 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-[#111]",
                pathname === link.href ||
                  (link.href !== "/book" && pathname.startsWith(link.href))
                  ? "text-[#111]"
                  : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/studio" />}
            size="sm"
            className="hidden h-9 rounded-full border-[#e5e5e5] bg-white px-4 text-[13px] md:inline-flex"
          >
            Open studio
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/book" />}
            size="sm"
            className="h-9 rounded-full px-4 text-[13px]"
          >
            Book a session
          </Button>
          <Sheet>
            <SheetTrigger
              className="inline-flex size-9 items-center justify-center rounded-full md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pb-6 text-sm">
                <Link href="/studio">Studio</Link>
                <Link href="/admin">Admin</Link>
                <Link href="/book">Book a session</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
