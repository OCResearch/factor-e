import type { StoreState } from "./types"

export const seedState = (): StoreState => ({
  bookings: [],
  clients: [
    {
      id: "cli_harbor",
      company: "Harbor & Rye",
      contactName: "Mara Ellison",
      email: "mara@harborandrye.com",
      phone: "207-555-0142",
      createdAt: "2026-07-12T14:00:00.000Z",
      hosting: {
        provider: "factor-e",
        url: "https://harbor-and-rye.factor-e.site",
        lastDeployedAt: "2026-09-02T18:12:00.000Z",
      },
      work: [
        {
          id: "wrk_harbor_1",
          title: "Storefront rebuild from Squarespace",
          status: "live",
          notes: "Menu, hours, and catering request live on factor-e hosting.",
          updatedAt: "2026-09-02T18:12:00.000Z",
        },
        {
          id: "wrk_harbor_2",
          title: "Catering inquiry form → kitchen spreadsheet",
          status: "rebuild",
          notes: "Replace the buried Google Form with a short intake on the site.",
          updatedAt: "2026-09-08T11:00:00.000Z",
        },
      ],
    },
    {
      id: "cli_northline",
      company: "Northline HVAC",
      contactName: "Chris Patel",
      email: "chris@northlinehvac.com",
      phone: "207-555-0190",
      createdAt: "2026-08-03T09:30:00.000Z",
      hosting: {
        provider: "pending",
        url: null,
        lastDeployedAt: null,
      },
      work: [
        {
          id: "wrk_nl_1",
          title: "Service-area site + dispatch intake",
          status: "intake",
          notes: "Current site is a 2014 WordPress theme. Dispatch lives in a shared inbox.",
          updatedAt: "2026-08-21T16:40:00.000Z",
        },
      ],
    },
    {
      id: "cli_paloma",
      company: "Paloma Legal",
      contactName: "Elena Paloma",
      email: "elena@palomalegal.com",
      phone: "617-555-0118",
      createdAt: "2026-06-18T12:00:00.000Z",
      hosting: {
        provider: "client-existing",
        url: "https://www.palomalegal.com",
        lastDeployedAt: "2026-08-14T10:00:00.000Z",
      },
      work: [
        {
          id: "wrk_pal_1",
          title: "Practice-area rebuild, keep existing host",
          status: "live",
          notes: "Shipped Quiet style. DNS stays at the firm’s registrar.",
          updatedAt: "2026-08-14T10:00:00.000Z",
        },
        {
          id: "wrk_pal_2",
          title: "Conflict-check intake",
          status: "paused",
          notes: "Waiting on malpractice carrier language before the form goes live.",
          updatedAt: "2026-08-28T15:20:00.000Z",
        },
      ],
    },
  ],
})
