"use client"

import { use, useState } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { hostingLabel, workStatusLabel } from "@/lib/catalog"
import { useStore } from "@/lib/store"
import type { HostingProvider, WorkStatus } from "@/lib/types"

const providers: HostingProvider[] = [
  "factor-e",
  "client-vercel",
  "client-existing",
  "pending",
]

const statuses: WorkStatus[] = ["intake", "rebuild", "live", "paused"]

export function ClientDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { clients, ready, setHosting, addWork, updateWork } = useStore()
  const client = clients.find((c) => c.id === id)
  const [urlDraft, setUrlDraft] = useState<string | null>(null)
  const [providerDraft, setProviderDraft] = useState<HostingProvider | null>(
    null
  )
  const [workTitle, setWorkTitle] = useState("")
  const [workNotes, setWorkNotes] = useState("")
  const [hostError, setHostError] = useState<string | null>(null)

  const url = urlDraft ?? client?.hosting.url ?? ""
  const provider = providerDraft ?? client?.hosting.provider ?? "pending"

  if (!ready) {
    return <Skeleton className="h-64 w-full" />
  }

  if (!client) {
    return (
      <div className="space-y-4">
        <h1 className="headline text-4xl">Client not on the roster</h1>
        <p className="text-sm text-muted-foreground">
          That id is not in this browser’s store. Restore the demo clients or
          open the list.
        </p>
        <Button nativeButton={false} render={<Link href="/admin" />}>
          Back to clients
        </Button>
      </div>
    )
  }

  const record = client

  function saveHosting() {
    setHostError(null)
    if (provider !== "pending" && !url.trim()) {
      setHostError("A hosting target needs a URL, or set the provider to “not placed yet.”")
      return
    }
    setHosting(record.id, {
      provider,
      url: url.trim() || null,
    })
    toast.success("Hosting location saved on this client.")
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin" className="text-sm text-muted-foreground hover:underline">
          All clients
        </Link>
        <h1 className="headline mt-2 text-4xl">{record.company}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {record.contactName} · {record.email}
          {record.phone ? ` · ${record.phone}` : ""}
        </p>
      </div>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide">
          Hosting location
        </h2>
        {hostError && (
          <Alert variant="destructive" className="mt-3">
            <AlertCircle />
            <AlertTitle>Cannot save hosting</AlertTitle>
            <AlertDescription>{hostError}</AlertDescription>
          </Alert>
        )}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label>Provider</Label>
            <div className="flex flex-wrap gap-2">
              {providers.map((p) => (
                <Button
                  key={p}
                  type="button"
                  size="sm"
                  variant={provider === p ? "default" : "outline"}
                  onClick={() => setProviderDraft(p)}
                >
                  {hostingLabel[p]}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="host-url">Target URL</Label>
            <Input
              id="host-url"
              value={url}
              placeholder="https://"
              onChange={(e) => setUrlDraft(e.target.value)}
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Last deploy:{" "}
          {record.hosting.lastDeployedAt
            ? new Date(record.hosting.lastDeployedAt).toLocaleString()
            : "never"}
        </p>
        <Button className="mt-3" onClick={saveHosting}>
          Save hosting
        </Button>
      </section>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide">Work</h2>
        {record.work.length === 0 ? (
          <p className="mt-3 rounded-3xl bg-white p-6 text-sm text-muted-foreground ring-1 ring-black/6">
            No work items yet. Add one below, or deploy from studio.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {record.work.map((item) => (
              <li key={item.id} className="rounded-3xl bg-white p-4 ring-1 ring-black/6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{item.title}</p>
                  <Badge variant="secondary">{workStatusLabel[item.status]}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.notes}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      size="xs"
                      variant={item.status === status ? "default" : "ghost"}
                      onClick={() => updateWork(record.id, item.id, { status })}
                    >
                      {workStatusLabel[status]}
                    </Button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        <form
          className="mt-6 grid max-w-lg gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (!workTitle.trim()) {
              toast.error("Work needs a title.")
              return
            }
            addWork(record.id, {
              title: workTitle.trim(),
              notes: workNotes.trim(),
              status: "intake",
            })
            setWorkTitle("")
            setWorkNotes("")
            toast.success("Work added.")
          }}
        >
          <Label htmlFor="wt">Add work</Label>
          <Input
            id="wt"
            placeholder="Title"
            value={workTitle}
            onChange={(e) => setWorkTitle(e.target.value)}
          />
          <Textarea
            placeholder="Notes"
            value={workNotes}
            onChange={(e) => setWorkNotes(e.target.value)}
          />
          <Button type="submit" className="w-fit">
            Add work item
          </Button>
        </form>
      </section>
    </div>
  )
}
