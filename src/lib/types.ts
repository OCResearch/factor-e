export type WorkStatus = "intake" | "rebuild" | "live" | "paused"

export type HostingProvider =
  | "factor-e"
  | "client-vercel"
  | "client-existing"
  | "pending"

export type WorkItem = {
  id: string
  title: string
  status: WorkStatus
  notes: string
  updatedAt: string
}

export type Hosting = {
  provider: HostingProvider
  url: string | null
  lastDeployedAt: string | null
}

export type Client = {
  id: string
  company: string
  contactName: string
  email: string
  phone: string
  hosting: Hosting
  work: WorkItem[]
  createdAt: string
}

export type ServiceId = "intake" | "rebuild" | "ops"

export type Booking = {
  id: string
  serviceId: ServiceId
  date: string
  time: string
  name: string
  email: string
  company: string
  website: string
  notes: string
  clientId: string
  createdAt: string
}

export type RebuildStyleId = "compound" | "ledger" | "storefront" | "quiet"

export type RebuildDraft = {
  sourceUrl: string
  styleId: RebuildStyleId
  company: string
  headline: string
  subhead: string
  cta: string
  clientId: string | null
}

export type StoreState = {
  clients: Client[]
  bookings: Booking[]
}
