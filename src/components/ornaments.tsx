import { cn } from "@/lib/utils"

/** Original compounding-e blob — not Ploy’s candy gum. */
export function HeroEBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 180"
      className={cn("pointer-events-none", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="eblob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f98a" />
          <stop offset="55%" stopColor="#c6e24a" />
          <stop offset="100%" stopColor="#9ec22a" />
        </linearGradient>
      </defs>
      <path
        fill="url(#eblob)"
        d="M42 88c-8-38 22-78 78-78 48 0 86 28 90 70 4 46-28 82-78 88-42 6-82-18-90-80z"
      />
      <ellipse cx="128" cy="86" rx="34" ry="38" fill="#f3f3f3" />
      <path
        fill="#b5d63a"
        d="M118 70c18-2 32 8 34 22 2 16-10 28-26 30-14 2-28-8-30-22-2-12 8-28 22-30z"
        opacity="0.45"
      />
    </svg>
  )
}

export function PinkSmear({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 90"
      className={cn("pointer-events-none", className)}
      aria-hidden
    >
      <path
        fill="#f4a0e4"
        d="M12 48c18-28 70-42 140-38 62 4 108 22 118 40 8 16-18 28-70 34-78 8-168 4-188-16-8-8-8-14 0-20z"
      />
    </svg>
  )
}

export function StarBurst({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("pointer-events-none", className)}
      aria-hidden
    >
      <path
        fill="#d9e020"
        d="M60 4l10 38 38 10-38 10-10 38-10-38-38-10 38-10z"
      />
      <circle cx="60" cy="60" r="16" fill="#f6ff57" />
    </svg>
  )
}

export function FloatStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn("pointer-events-none", className)} aria-hidden>
      <path fill="#c8e24a" d="M40 2l8 28 28 8-28 8-8 28-8-28-28-8 28-8z" />
    </svg>
  )
}

export function FloatGum({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 50" className={cn("pointer-events-none", className)} aria-hidden>
      <rect x="4" y="8" width="82" height="34" rx="17" fill="#e89ad8" />
    </svg>
  )
}

export function FloatCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn("pointer-events-none", className)} aria-hidden>
      <circle cx="28" cy="32" r="18" fill="#c8e24a" />
      <circle cx="50" cy="28" r="16" fill="#d4f06a" />
      <circle cx="40" cy="50" r="16" fill="#b5d63a" />
    </svg>
  )
}

export function FloatFlower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn("pointer-events-none", className)} aria-hidden>
      <circle cx="40" cy="22" r="12" fill="#c5d8f5" />
      <circle cx="58" cy="40" r="12" fill="#d5e4f8" />
      <circle cx="40" cy="58" r="12" fill="#c5d8f5" />
      <circle cx="22" cy="40" r="12" fill="#d5e4f8" />
      <circle cx="40" cy="40" r="9" fill="#eef3fb" />
    </svg>
  )
}
