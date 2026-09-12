import Link from "next/link"
import { Wordmark } from "@/components/wordmark"

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#111] text-white">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8">
        <p className="headline text-[clamp(4rem,14vw,9rem)] leading-none text-[#f4ff3a]">
          e
        </p>
        <p className="mt-4 max-w-sm text-sm text-white/70">
          Websites and business systems. The e is compounding — each engagement
          should return more than the last.
        </p>
        <div className="mt-12 grid gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 text-white/40">Product</p>
            <div className="flex flex-col gap-2">
              <Link href="/book" className="hover:underline">
                Booking
              </Link>
              <Link href="/studio" className="hover:underline">
                Rebuild studio
              </Link>
              <Link href="/admin" className="hover:underline">
                Client admin
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-3 text-white/40">Work</p>
            <p className="max-w-[16rem] text-white/70">
              Intake on the calendar. Hosting on the client record. Rebuilds
              from a live URL.
            </p>
          </div>
          <div>
            <p className="mb-3 text-white/40">Contact</p>
            <Link href="/book" className="hover:underline">
              Book a working session →
            </Link>
          </div>
        </div>
        <div className="mt-12">
          <Wordmark inverted className="text-white" />
        </div>
      </div>
    </footer>
  )
}
