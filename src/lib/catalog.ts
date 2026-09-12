import type { RebuildStyleId, ServiceId, WorkStatus } from "./types"

export const services: {
  id: ServiceId
  name: string
  duration: string
  minutes: number
  blurb: string
}[] = [
  {
    id: "intake",
    name: "Compounding intake",
    duration: "45 min",
    minutes: 45,
    blurb:
      "Walk through the current site, the systems around it, and what should compound next.",
  },
  {
    id: "rebuild",
    name: "Rebuild studio session",
    duration: "30 min",
    minutes: 30,
    blurb:
      "Paste the live URL, pick a style, and leave with a rebuild direction you can ship.",
  },
  {
    id: "ops",
    name: "Hosting & ops review",
    duration: "30 min",
    minutes: 30,
    blurb:
      "Decide where the site lives, who owns DNS, and how updates get out the door.",
  },
]

export const slotTimes = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "13:00",
  "13:30",
  "14:00",
  "15:00",
  "16:00",
]

export const rebuildStyles: {
  id: RebuildStyleId
  name: string
  pitch: string
}[] = [
  {
    id: "compound",
    name: "Compound",
    pitch: "Ink, serif headlines, a gold mark. Built to feel like a firm.",
  },
  {
    id: "ledger",
    name: "Ledger",
    pitch: "Navy rules, tabular numbers, operations first.",
  },
  {
    id: "storefront",
    name: "Storefront",
    pitch: "Warm paper, rounded cards, a shop that still looks serious.",
  },
  {
    id: "quiet",
    name: "Quiet",
    pitch: "Wide margins, thin type, one idea per screen.",
  },
]

export const workStatusLabel: Record<WorkStatus, string> = {
  intake: "Intake",
  rebuild: "Rebuild",
  live: "Live",
  paused: "Paused",
}

export const hostingLabel: Record<
  import("./types").HostingProvider,
  string
> = {
  "factor-e": "factor-e hosted",
  "client-vercel": "Client Vercel",
  "client-existing": "Client existing host",
  pending: "Not placed yet",
}
