"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  { href: "/admin", label: "Clients" },
  { href: "/studio", label: "Rebuild studio" },
  { href: "/book", label: "Public booking" },
]

export function AdminNav() {
  const pathname = usePathname()
  return (
    <aside className="border-b border-black/6 bg-white md:w-56 md:border-r md:border-b-0">
      <div className="px-4 py-4">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Ops
        </p>
        <nav className="mt-3 flex gap-2 overflow-x-auto md:flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-sm",
                pathname === item.href
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
