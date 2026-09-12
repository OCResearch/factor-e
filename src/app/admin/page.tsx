import type { Metadata } from "next"
import { ClientsTable } from "./clients-table"

export const metadata: Metadata = {
  title: "Clients",
}

export default function AdminPage() {
  return (
    <div>
      <h1 className="headline text-[clamp(2.4rem,6vw,4rem)]">Clients</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Each company, the work in motion, and where the site is hosted. Search
        is live; empty roster and empty search both have their own states.
      </p>
      <div className="mt-6">
        <ClientsTable />
      </div>
    </div>
  )
}
