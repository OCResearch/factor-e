import type { Metadata } from "next"
import { BookingFlow } from "./booking-flow"

export const metadata: Metadata = {
  title: "Book a working session",
}

export default function BookPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] px-5 py-12 sm:px-8">
      <h1 className="headline max-w-4xl text-[clamp(3rem,9vw,6.5rem)]">
        Choose the next compounding hour
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        Service, weekday, time, then a receipt. The booking opens a client
        record so hosting and work are not trapped in an email thread.
      </p>
      <div className="mt-10">
        <BookingFlow />
      </div>
    </main>
  )
}
