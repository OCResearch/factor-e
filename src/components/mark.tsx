import { markDataUrls } from "@/lib/marks"
import { cn } from "@/lib/utils"

export function Mark({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={markDataUrls[src] ?? src}
      alt=""
      className={cn("pointer-events-none select-none", className)}
    />
  )
}
