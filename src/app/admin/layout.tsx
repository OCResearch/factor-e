import type { ReactNode } from "react"
import { AdminNav } from "./admin-nav"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col md:flex-row">
      <AdminNav />
      <div className="min-w-0 flex-1 px-4 py-8 sm:px-6">{children}</div>
    </div>
  )
}
