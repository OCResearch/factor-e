"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { hostingLabel } from "@/lib/catalog"
import { useStore } from "@/lib/store"

export function ClientsTable() {
  const { clients, ready, addClient, resetDemo, clearClients } = useStore()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
  })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.company.toLowerCase().includes(q) ||
        c.contactName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.hosting.url ?? "").toLowerCase().includes(q)
    )
  }, [clients, query])

  if (!ready) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search company, contact, hosting URL"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={resetDemo}>
            Restore demo
          </Button>
          <Button variant="outline" size="sm" onClick={clearClients}>
            Show empty
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="inline-flex h-8 items-center gap-1 rounded-full bg-primary px-3 text-[0.8rem] font-medium text-primary-foreground">
              <Plus className="size-3.5" />
              Add client
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New client</DialogTitle>
              </DialogHeader>
              <form
                className="grid gap-3 px-4 pb-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!form.company || !form.email) return
                  addClient(form)
                  setForm({ company: "", contactName: "", email: "", phone: "" })
                  setOpen(false)
                }}
              >
                <div className="grid gap-1.5">
                  <Label htmlFor="co">Company</Label>
                  <Input
                    id="co"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="cn">Contact</Label>
                  <Input
                    id="cn"
                    value={form.contactName}
                    onChange={(e) =>
                      setForm({ ...form, contactName: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="em">Email</Label>
                  <Input
                    id="em"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="ph">Phone</Label>
                  <Input
                    id="ph"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <Button type="submit">Save client</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {clients.length === 0 && (
        <div className="mt-10 rounded-3xl bg-white p-10 text-center ring-1 ring-black/6">
          <p className="font-medium">No clients on the books</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Bookings and studio deploys will land here. Restore the demo roster
            or add a company.
          </p>
        </div>
      )}

      {clients.length > 0 && filtered.length === 0 && (
        <div className="mt-10 rounded-3xl bg-white p-8 text-center text-sm ring-1 ring-black/6">
          No matching clients for “{query}”.{" "}
          <button
            type="button"
            className="underline"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-3xl bg-white ring-1 ring-black/6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Work</TableHead>
                <TableHead>Hosting</TableHead>
                <TableHead className="hidden sm:table-cell">Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((client) => {
                const latest = client.work[0]
                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="font-medium hover:underline"
                      >
                        {client.company}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {latest ? (
                        <div>
                          <Badge variant="secondary">{latest.status}</Badge>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {latest.title}
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">None yet</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <p>{hostingLabel[client.hosting.provider]}</p>
                      <p className="max-w-[180px] truncate text-xs text-muted-foreground">
                        {client.hosting.url ?? "—"}
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {client.contactName}
                      <p className="text-xs text-muted-foreground">
                        {client.email}
                      </p>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
