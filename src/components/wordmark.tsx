import Link from "next/link"
import { cn } from "@/lib/utils"

export function Wordmark({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline text-[17px] font-semibold tracking-tight",
        inverted ? "text-white" : "text-[#111]",
        className
      )}
    >
      factor
      <span className="relative ml-px inline-block px-[0.06em]">
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-[0.08em] top-[0.32em] -rotate-2 rounded-[2px] bg-[#f4ff3a]"
        />
        <span className="relative italic">e</span>
      </span>
    </Link>
  )
}
