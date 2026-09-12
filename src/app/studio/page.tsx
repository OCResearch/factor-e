import type { Metadata } from "next"
import { StudioApp } from "./studio-app"

export const metadata: Metadata = {
  title: "Rebuild studio",
}

export default function StudioPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-8">
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] bg-[#f4ff3a] px-6 py-16 text-center sm:py-20">
        <h1 className="headline text-[clamp(3rem,9vw,6.5rem)]">
          Start from the live URL.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-6 text-[#111]/70">
          Paste the current URL, choose a style, edit the copy, then mock-deploy.
          Hosting is written onto the client — factor-e hosted — even when real
          DNS is not wired yet.
        </p>
      </div>
      <div className="mt-8">
        <StudioApp />
      </div>
    </main>
  )
}
