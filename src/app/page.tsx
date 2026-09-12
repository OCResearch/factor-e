import Link from "next/link"
import { CalendarDays, Globe, Server } from "lucide-react"
import { Mark } from "@/components/mark"
import { Button } from "@/components/ui/button"

const surfaces = [
  {
    icon: CalendarDays,
    title: "Book",
    body: "A public calendar with a receipt. Service, weekday, time — then a client record, not an inbox thread.",
  },
  {
    icon: Globe,
    title: "Rebuild",
    body: "Paste a live URL, pick a style, edit the copy, and mock-deploy. Hosting is written down when you ship.",
  },
  {
    icon: Server,
    title: "Host",
    body: "factor-e, the client’s Vercel, or their existing host. The location lives on the client, not in someone’s memory.",
  },
]

const process = [
  {
    label: "Book",
    title: "Sit for the compounding hour.",
    body: "Intake, rebuild, or ops review. Forty-five minutes on the record so the next year is cheaper to run — not another restart.",
  },
  {
    label: "Rebuild",
    title: "Start from the URL that already exists.",
    body: "Studio reads the live site, applies Compound, Ledger, Storefront, or Quiet, and lets you rewrite the headline before deploy.",
  },
  {
    label: "Host",
    title: "Write where it actually lives.",
    body: "Mock deploy stamps a factor-e hosting URL on the client. Swap to their Vercel or existing host when DNS is real.",
  },
]

export default function HomePage() {
  return (
    <div>
      {/* 548e4f30 — poster hero + 3-up card */}
      <section className="relative mx-auto max-w-[1200px] px-4 pb-6 pt-8 text-center sm:px-8 sm:pt-12">
        <div className="relative mx-auto max-w-[1120px]">
          <Mark
            src="/marks/e-lime-3d.png"
            className="absolute top-[-6%] right-[4%] z-0 w-[34%] max-w-[320px] sm:right-[10%] sm:w-[30%]"
          />
          <h1 className="headline relative z-10 text-[clamp(3.4rem,11.8vw,9.25rem)]">
            The site is the front.
            <br />
            The e is the engine.
          </h1>
        </div>
        <p className="relative z-10 mx-auto mt-8 max-w-md text-[15px] leading-6 text-[#6b6b6b]">
          factor-e builds websites and the business systems around them. The e
          is compounding — each engagement should return more than the last.
        </p>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <div className="grid overflow-hidden rounded-[28px] bg-white md:grid-cols-3 md:divide-x md:divide-[#eee]">
          {surfaces.map((item) => (
            <article key={item.title} className="px-8 py-10 text-left sm:px-10 sm:py-12">
              <div className="flex size-8 items-center justify-center rounded-md bg-[#111] text-white">
                <item.icon className="size-3.5" aria-hidden />
              </div>
              <h2 className="mt-16 text-[17px] font-medium">{item.title}</h2>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#6b6b6b]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* c61d8e3e — photo under floating nav, logo row */}
      <section className="mx-auto mt-14 max-w-[1200px] px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px]">
          <div className="flex min-h-[320px] flex-col items-center justify-center bg-[radial-gradient(circle_at_18%_40%,#6a4a28,transparent_42%),radial-gradient(circle_at_80%_20%,#2a3840,transparent_40%),linear-gradient(#2a221c,#0c0b0a)] px-6 py-24 sm:min-h-[420px]">
            <div className="flex flex-wrap justify-center gap-2">
              <Button nativeButton={false} render={<Link href="/book" />} size="lg">
                Book a session
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href="/studio" />}
                size="lg"
                className="border-white/35 bg-white/10 text-white hover:bg-white/20"
              >
                Open studio
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-[12px] tracking-wide text-[#8a8a8a]">
          Demo roster already on the books
        </p>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-[13px] text-[#9a9a9a]">
          <span>Harbor &amp; Rye</span>
          <span>Northline HVAC</span>
          <span>Paloma Legal</span>
        </p>
        <div className="relative mx-auto mt-10 max-w-[900px] pb-24 pt-16 text-center">
          <Mark
            src="/marks/e-lime-3d.png"
            className="absolute top-0 left-1/2 z-10 w-[160px] -translate-x-1/2 sm:w-[200px]"
          />
          <p className="headline relative text-[clamp(2.8rem,10vw,7.5rem)] text-[#d9d9d9]">
            The site is the front.
          </p>
        </div>
      </section>

      {/* daa906a0 — lemon band */}
      <section className="mx-auto mt-6 max-w-[1200px] px-4 sm:px-8">
        <div className="flex min-h-[460px] flex-col items-center justify-center rounded-[28px] bg-[#f4ff3a] px-6 py-20 text-center sm:min-h-[560px] sm:py-28">
          <Mark src="/marks/e-yellow-3d.png" className="mb-2 w-28 sm:w-36" />
          <h2 className="headline max-w-5xl text-[clamp(3rem,10vw,8rem)]">
            Start from the live URL.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-6 text-[#111]/70">
            Studio reads the site you already have, applies a style, and writes
            hosting onto the client when you mock-deploy.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/studio" />}
            size="lg"
            className="mt-8"
          >
            Open rebuild studio
          </Button>
        </div>
      </section>

      {/* 4ca3fc99 — highlighter + left labels */}
      <section className="mx-auto mt-24 max-w-[1120px] px-4 sm:px-8">
        <h2 className="headline max-w-[980px] text-[clamp(3rem,9vw,7rem)]">
          The hour goes on the{" "}
          <span className="relative inline-block">
            <Mark
              src="/marks/e-pink-3d.png"
              className="absolute top-[-35%] left-[8%] z-0 w-[1.15em] max-w-none"
            />
            <span className="relative z-10">record</span>
          </span>
          , not into a slide.
        </h2>
        <div className="mt-16 grid gap-6 sm:grid-cols-[170px_1fr] sm:items-start">
          <span className="w-fit rounded-full bg-[#111] px-3 py-1 text-[11px] font-medium text-white">
            The operating loop
          </span>
          <div>
            <h3 className="text-[28px] font-medium leading-[1.15] tracking-tight sm:text-[36px]">
              You run the company.
              <br />
              We keep site and systems on one client.
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#6b6b6b]">
              The e is compounding: each rebuild, form, and hosting decision
              should make the next year cheaper to run. Booking, studio, and
              admin are one loop.
            </p>
          </div>
        </div>
        <div className="mt-4">
          {process.map((step) => (
            <div
              key={step.label}
              className="grid gap-3 border-t border-[#e6e6e6] py-10 sm:grid-cols-[220px_1fr] sm:gap-12"
            >
              <p className="headline text-[48px] sm:text-[64px]">{step.label}</p>
              <div className="max-w-xl">
                <h3 className="text-[22px] font-medium tracking-tight sm:text-[28px]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-6 text-[#6b6b6b]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 0fe98f50 — pink metrics */}
      <section className="mx-auto mt-10 max-w-[1200px] px-4 sm:px-8">
        <div className="relative">
          <div className="rounded-[28px] bg-[linear-gradient(180deg,#ff7ec8_0%,#ffb4e8_52%,#ffe38a_100%)] px-6 pb-40 pt-14 sm:px-12 sm:pt-16">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <h2 className="headline text-[clamp(2.8rem,7.5vw,6.2rem)]">
                The site should earn more
                <br />
                the longer it lives.
              </h2>
              <p className="max-w-sm pb-2 text-[14px] leading-6 text-[#111]/70">
                Three surfaces, one operating loop — intake, rebuild, hosting —
                so work does not reset every year.
              </p>
            </div>
          </div>
          <div className="relative z-10 mx-auto -mt-32 grid max-w-[1100px] gap-4 px-3 sm:grid-cols-3 sm:px-8">
            {[
              {
                kicker: "Sessions",
                n: "45",
                unit: "min",
                label: "Working sessions on the calendar",
                spark: "bg-[#ff8ad4]/50",
                meta: [
                  ["Weekdays", "open"],
                  ["Receipt", "yes"],
                  ["Client", "opens"],
                ],
                chip: "On the books",
              },
              {
                kicker: "Studio",
                n: "4",
                unit: "",
                label: "Rebuild styles from a live URL",
                spark: "bg-[#d4f06a]/80",
                meta: [
                  ["Compound", "1"],
                  ["Ledger", "1"],
                  ["Quiet", "1"],
                ],
                chip: "Preview then deploy",
              },
              {
                kicker: "Hosting",
                n: "1",
                unit: "",
                label: "Hosting field on every client",
                spark: "bg-[#f4ff3a]",
                meta: [
                  ["factor-e", "yes"],
                  ["Vercel", "yes"],
                  ["Existing", "yes"],
                ],
                chip: "Written on the record",
              },
            ].map((stat) => (
              <article
                key={stat.kicker}
                className="rounded-[22px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.1)]"
              >
                <p className="text-[12px] text-[#8a8a8a]">{stat.kicker}</p>
                <div className="mt-1 flex items-end justify-between gap-3">
                  <p className="headline text-[72px] leading-none">
                    {stat.n}
                    {stat.unit ? (
                      <span className="text-[28px] text-[#c8c8c8]">{stat.unit}</span>
                    ) : null}
                  </p>
                  <span className={`mb-2 h-12 w-28 rounded-full ${stat.spark}`} />
                </div>
                <p className="mt-3 text-[13px] text-[#6b6b6b]">{stat.label}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-[#f0f0f0] pt-3 text-[11px] text-[#8a8a8a]">
                  {stat.meta.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd className="text-[#111]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-[12px] text-[#8a8a8a]">{stat.chip}</p>
              </article>
            ))}
          </div>
          <div className="-mt-12 h-28 rounded-b-[28px] bg-[#f4ff3a]" />
        </div>
      </section>

      {/* 3c4554b9 — white card dual pills */}
      <section className="mx-auto mt-16 max-w-[1120px] px-4 sm:px-8">
        <div className="rounded-[28px] bg-white px-6 py-16 text-center sm:px-20 sm:py-24">
          <span className="inline-flex rounded-full bg-[#111] px-3 py-1 text-[11px] font-medium text-white">
            From a live URL
          </span>
          <h2 className="headline mx-auto mt-6 max-w-4xl text-[clamp(2.8rem,8vw,6.2rem)]">
            Preview the rebuild before hosting is written.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-6 text-[#6b6b6b]">
            Paste the URL. Edit the copy. Mock-deploy so the hosting field lands
            on the client, not in a thread.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Button nativeButton={false} render={<Link href="/studio" />} size="lg">
              Rebuild a live URL
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/book" />}
              size="lg"
              className="border-[#ddd] bg-white"
            >
              Talk through a session
            </Button>
          </div>
        </div>
      </section>

      {/* 1977036c — stacked headline, floating 3D e, dual pills */}
      <section className="relative mx-auto mt-6 max-w-[1200px] overflow-hidden px-4 py-28 text-center sm:px-8 sm:py-36">
        <Mark
          src="/marks/e-lime-3d.png"
          className="absolute top-10 left-[6%] w-16 rotate-[-18deg] sm:w-24"
        />
        <Mark
          src="/marks/e-pink-3d.png"
          className="absolute top-16 right-[7%] w-20 rotate-[22deg] sm:w-28"
        />
        <Mark
          src="/marks/e-yellow-3d.png"
          className="absolute bottom-16 left-[10%] w-16 sm:w-24"
        />
        <Mark
          src="/marks/e-blue-3d.png"
          className="absolute right-[9%] bottom-14 w-16 sm:w-24"
        />
        <span className="inline-flex rounded-full bg-[#111] px-3 py-1 text-[11px] font-medium text-white">
          For operators
        </span>
        <h2 className="headline relative mx-auto mt-6 max-w-5xl text-[clamp(3rem,10vw,7.8rem)]">
          A theme is a shortcut.
          <br />
          A system is the return.
        </h2>
        <p className="relative mx-auto mt-6 max-w-md text-[15px] leading-6 text-[#6b6b6b]">
          For teams still shipping from a theme they outgrew, and owners who
          want hosting written down — not “I think it’s on GoDaddy.”
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Button nativeButton={false} render={<Link href="/book" />} size="lg">
            Book a session
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/admin" />}
            size="lg"
            className="border-[#ddd] bg-white"
          >
            Open the roster
          </Button>
        </div>
      </section>

      {/* 4a0fc54f — two cards */}
      <section className="mx-auto max-w-[1120px] px-4 pb-8 sm:px-8">
        <h2 className="headline mx-auto max-w-2xl text-center text-[clamp(2.6rem,6vw,4.4rem)]">
          Operators already on the books.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-[14px] text-[#6b6b6b]">
          Demo notes from Harbor &amp; Rye and Paloma Legal — the same roster in
          admin.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="overflow-hidden rounded-[22px] border border-[#e8e8e8] bg-white">
            <div className="flex min-h-[220px] items-end bg-[#1c1c1c] p-6">
              <p className="headline max-w-[18rem] text-[40px] text-white">
                The form should feed the kitchen.
              </p>
            </div>
            <div className="p-6">
              <p className="text-[15px] leading-6 text-[#333]">
                “Catering intake used to live in a shared inbox. The working
                session put it on the calendar and on the client.”
              </p>
              <p className="mt-4 text-[13px] text-[#6b6b6b]">
                Harbor &amp; Rye · Demo bakery
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-[22px] border border-[#e8e8e8] bg-white">
            <div className="flex min-h-[220px] items-end bg-[#2a2030] p-6">
              <p className="headline max-w-[18rem] text-[40px] text-[#f4ff3a]">
                Hosting is a field, not a rumor.
              </p>
            </div>
            <div className="p-6">
              <p className="text-[15px] leading-6 text-[#333]">
                “We needed a quieter public face without losing conflict checks
                behind the practice-area pages.”
              </p>
              <p className="mt-4 text-[13px] text-[#6b6b6b]">
                Paloma Legal · Demo firm
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* 6f2ad491 — two-column credit table */}
      <section className="mx-auto mt-16 max-w-[1120px] px-4 sm:px-8">
        <div className="rounded-[28px] bg-[#ececec] px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
            <div>
              <h2 className="text-[28px] font-medium tracking-tight">
                How the loop works
              </h2>
              <p className="mt-3 max-w-sm text-[14px] leading-6 text-[#6b6b6b]">
                Booking, studio, and hosting share one client record. Time spent
                in a working session should show up as a field, not an email.
              </p>
            </div>
            <div className="divide-y divide-[#d8d8d8] text-sm">
              {[
                {
                  t: "A session opens a client",
                  b: "Name, company, and email land on the roster with the booking as intake work.",
                },
                {
                  t: "A URL becomes a rebuild",
                  b: "Studio reads the live site. You pick a style, edit copy, and mock-deploy.",
                },
                {
                  t: "Deploy writes hosting",
                  b: "The factor-e URL is stamped on the client. Swap to their Vercel or existing host later.",
                },
                {
                  t: "Empty and error are real states",
                  b: "Show empty in admin. Paste a URL containing fail in studio to see the blocked rebuild.",
                },
              ].map((row) => (
                <div
                  key={row.t}
                  className="grid gap-2 py-5 sm:grid-cols-[0.9fr_1.2fr]"
                >
                  <p className="font-medium">{row.t}</p>
                  <p className="text-[#6b6b6b]">{row.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 92c77da8 — numbered 3D markers, editorial split */}
      <section className="mx-auto mt-20 max-w-[1120px] px-4 pb-24 sm:px-8">
        <h2 className="headline max-w-4xl text-[clamp(2.8rem,8vw,5.8rem)]">
          Three compounding steps. Not another restart.
        </h2>
        <div className="mt-12 space-y-10">
          {[
            {
              n: "01",
              mark: "/marks/e-lime-3d.png",
              title: "Book the hour.",
              body: "Pick intake, rebuild, or ops review. Weekday slots only. You leave with a receipt and a client record.",
            },
            {
              n: "02",
              mark: "/marks/e-yellow-3d.png",
              title: "Rebuild from the live URL.",
              body: "Paste what exists. Choose Compound, Ledger, Storefront, or Quiet. Edit the headline before you ship.",
            },
            {
              n: "03",
              mark: "/marks/e-pink-3d.png",
              title: "Write the hosting field.",
              body: "Mock deploy records factor-e hosting on the client. The location is not a rumor and not a Slack thread.",
            },
          ].map((step) => (
            <article
              key={step.n}
              className="grid items-center gap-6 border-t border-[#e6e6e6] pt-10 sm:grid-cols-[160px_1fr]"
            >
              <div className="flex items-center gap-2">
                <Mark src={step.mark} className="h-14 w-14 object-contain" />
                <p className="headline text-[42px]">{step.n}</p>
              </div>
              <div>
                <h3 className="text-[24px] font-medium tracking-tight sm:text-[30px]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-6 text-[#6b6b6b]">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
