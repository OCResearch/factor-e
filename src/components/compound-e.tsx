import { cn } from "@/lib/utils"

export function CompoundE({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block px-[0.06em]", className)}>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-[0.08em] top-[0.32em] -rotate-2 rounded-[2px] bg-[#f4ff3a]"
      />
      <span className="relative italic">e</span>
    </span>
  )
}
