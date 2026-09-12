"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { rebuildStyles } from "@/lib/catalog"
import { useStore } from "@/lib/store"
import type { RebuildStyleId } from "@/lib/types"
import { cn } from "@/lib/utils"

function parseSource(raw: string) {
  const trimmed = raw.trim()
  if (!trimmed) return { error: "Paste a live website URL." as const }
  if (/fail|not-a-site/i.test(trimmed)) {
    return { error: "Could not reach that site. Check the URL and try again." as const }
  }
  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`)
    if (!["http:", "https:"].includes(url.protocol)) {
      return { error: "Use an http or https address." as const }
    }
    const host = url.hostname.replace(/^www\./, "")
    const company = host
      .split(".")[0]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
    return {
      sourceUrl: url.toString(),
      company,
      headline: `${company} should compound, not restart.`,
      subhead: `Rebuilt from ${host} with factor-e — website, intake, and a hosting target on the client.`,
      cta: "Book a working session",
    }
  } catch {
    return { error: "That does not look like a URL we can rebuild from." as const }
  }
}

const styleChrome: Record<
  RebuildStyleId,
  { wrap: string; kicker: string; button: string }
> = {
  compound: {
    wrap: "bg-[#0e0d0b] text-zinc-100",
    kicker: "text-amber-400",
    button: "bg-amber-400 text-zinc-950",
  },
  ledger: {
    wrap: "bg-[#0f1c2e] text-slate-100",
    kicker: "text-sky-300",
    button: "bg-sky-300 text-slate-950",
  },
  storefront: {
    wrap: "bg-[#f4ece2] text-stone-900",
    kicker: "text-orange-800",
    button: "bg-orange-800 text-orange-50",
  },
  quiet: {
    wrap: "bg-white text-neutral-900",
    kicker: "text-neutral-500",
    button: "border border-neutral-900 bg-transparent",
  },
}

export function StudioApp() {
  const { clients, ready, deployRebuild } = useStore()
  const [url, setUrl] = useState("")
  const [styleId, setStyleId] = useState<RebuildStyleId>("compound")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [draft, setDraft] = useState<{
    sourceUrl: string
    company: string
    headline: string
    subhead: string
    cta: string
    clientId: string | null
  } | null>(null)
  const [deploying, setDeploying] = useState(false)
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null)

  const chrome = styleChrome[styleId]
  const style = rebuildStyles.find((s) => s.id === styleId)

  const clientOptions = useMemo(
    () => [{ id: "", label: "Create from this URL" }, ...clients.map((c) => ({ id: c.id, label: c.company }))],
    [clients]
  )

  function analyze() {
    setError(null)
    setDeployedUrl(null)
    const parsed = parseSource(url)
    if ("error" in parsed && parsed.error) {
      setDraft(null)
      setError(parsed.error)
      return
    }
    setLoading(true)
    window.setTimeout(() => {
      setDraft({
        sourceUrl: parsed.sourceUrl!,
        company: parsed.company!,
        headline: parsed.headline!,
        subhead: parsed.subhead!,
        cta: parsed.cta!,
        clientId: null,
      })
      setLoading(false)
    }, 900)
  }

  function deploy() {
    if (!draft) return
    setDeploying(true)
    window.setTimeout(() => {
      try {
        const client = deployRebuild({
          ...draft,
          styleId,
        })
        setDeployedUrl(client.hosting.url)
        toast.success(`Mock deploy recorded on ${client.company}.`)
      } catch {
        toast.error("Deploy did not complete. Try again.")
      }
      setDeploying(false)
    }, 800)
  }

  if (!ready) {
    return <Skeleton className="h-80 w-full" />
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
      <div className="space-y-5 rounded-3xl bg-white p-5 ring-1 ring-black/6">
        <div className="grid gap-2">
          <Label htmlFor="src">Live website URL</Label>
          <Input
            id="src"
            placeholder="https://harborandrye.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            To see the error state, paste a URL containing “fail”.
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Rebuild blocked</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button onClick={analyze} type="button" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Reading site
            </>
          ) : (
            "Preview rebuild"
          )}
        </Button>

        <div>
          <p className="text-sm font-medium">Style</p>
          <div className="mt-2 grid gap-2">
            {rebuildStyles.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyleId(s.id)}
                className={cn(
                  "rounded-2xl border p-3 text-left text-sm",
                  styleId === s.id
                    ? "border-foreground"
                    : "border-transparent bg-muted/60"
                )}
              >
                <span className="font-medium">{s.name}</span>
                <span className="mt-1 block text-muted-foreground">{s.pitch}</span>
              </button>
            ))}
          </div>
        </div>

        {draft && (
          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-medium">Refine copy</p>
            <Input
              value={draft.company}
              onChange={(e) => setDraft({ ...draft, company: e.target.value })}
            />
            <Input
              value={draft.headline}
              onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
            />
            <Textarea
              value={draft.subhead}
              onChange={(e) => setDraft({ ...draft, subhead: e.target.value })}
            />
            <Input
              value={draft.cta}
              onChange={(e) => setDraft({ ...draft, cta: e.target.value })}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="client">Record hosting on</Label>
              <select
                id="client"
                className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                value={draft.clientId ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, clientId: e.target.value || null })
                }
              >
                {clientOptions.map((opt) => (
                  <option key={opt.id || "new"} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={deploy} disabled={deploying}>
              {deploying ? "Deploying…" : "Deploy (mock)"}
            </Button>
            {deployedUrl && (
              <p className="text-sm">
                Hosting target:{" "}
                <span className="font-mono text-xs">{deployedUrl}</span>
                {draft.clientId && (
                  <>
                    {" "}
                    ·{" "}
                    <Link className="underline" href={`/admin/clients/${draft.clientId}`}>
                      Open client
                    </Link>
                  </>
                )}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="min-h-[420px] overflow-hidden rounded-3xl bg-white ring-1 ring-black/6">
        {loading && (
          <div className="flex h-full min-h-[420px] flex-col justify-center gap-3 p-8">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}
        {!loading && !draft && (
          <div className="flex min-h-[420px] items-center justify-center p-8 text-center text-sm text-muted-foreground">
            Paste a URL and preview a rebuild. The canvas stays empty until the
            site can be read.
          </div>
        )}
        {!loading && draft && (
          <div className={cn("flex min-h-[420px] flex-col p-8 sm:p-12", chrome.wrap)}>
            <p className={cn("text-xs uppercase tracking-[0.2em]", chrome.kicker)}>
              {style?.name} · from {new URL(draft.sourceUrl).hostname}
            </p>
            <h2 className="headline mt-6 text-3xl leading-none sm:text-5xl">
              {draft.headline}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 opacity-80 sm:text-base">
              {draft.subhead}
            </p>
            <div className={cn("mt-8 inline-flex w-fit rounded-md px-4 py-2 text-sm", chrome.button)}>
              {draft.cta}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
