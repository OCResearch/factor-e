"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { seedState } from "./seed"
import type {
  Booking,
  Client,
  HostingProvider,
  RebuildDraft,
  StoreState,
  WorkItem,
} from "./types"

type StoreContextValue = {
  ready: boolean
  clients: Client[]
  bookings: Booking[]
  addBooking: (
    booking: Omit<Booking, "id" | "clientId" | "createdAt">
  ) => { booking: Booking; client: Client }
  addClient: (input: {
    company: string
    contactName: string
    email: string
    phone: string
  }) => Client
  updateClient: (id: string, patch: Partial<Client>) => void
  addWork: (clientId: string, work: Omit<WorkItem, "id" | "updatedAt">) => void
  updateWork: (clientId: string, workId: string, patch: Partial<WorkItem>) => void
  setHosting: (
    clientId: string,
    hosting: {
      provider: HostingProvider
      url: string | null
      lastDeployedAt?: string | null
    }
  ) => void
  deployRebuild: (draft: RebuildDraft) => Client
  resetDemo: () => void
  clearClients: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

const uid = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40)
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(seedState)

  const addClient = useCallback(
    (input: {
      company: string
      contactName: string
      email: string
      phone: string
    }) => {
      const client: Client = {
        id: uid("cli"),
        company: input.company,
        contactName: input.contactName,
        email: input.email,
        phone: input.phone,
        createdAt: new Date().toISOString(),
        hosting: { provider: "pending", url: null, lastDeployedAt: null },
        work: [
          {
            id: uid("wrk"),
            title: "Compounding intake",
            status: "intake",
            notes: "Opened from a booking or a new client record.",
            updatedAt: new Date().toISOString(),
          },
        ],
      }
      setState((prev) => ({ ...prev, clients: [client, ...prev.clients] }))
      return client
    },
    []
  )

  const addBooking = useCallback(
    (input: Omit<Booking, "id" | "clientId" | "createdAt">) => {
      const now = new Date().toISOString()
      let resultClient: Client | null = null
      let resultBooking: Booking | null = null
      setState((prev) => {
        const existing = prev.clients.find(
          (c) => c.email.toLowerCase() === input.email.toLowerCase()
        )
        const client: Client =
          existing ??
          ({
            id: uid("cli"),
            company: input.company,
            contactName: input.name,
            email: input.email,
            phone: "",
            createdAt: now,
            hosting: { provider: "pending", url: null, lastDeployedAt: null },
            work: [
              {
                id: uid("wrk"),
                title:
                  input.serviceId === "rebuild"
                    ? "Rebuild studio session"
                    : input.serviceId === "ops"
                      ? "Hosting & ops review"
                      : "Compounding intake",
                status: "intake",
                notes: input.website
                  ? `Booked from ${input.website}. ${input.notes}`.trim()
                  : input.notes || "Booked from the public calendar.",
                updatedAt: now,
              },
            ],
          } satisfies Client)
        const booking: Booking = {
          ...input,
          id: uid("bk"),
          clientId: client.id,
          createdAt: now,
        }
        resultClient = client
        resultBooking = booking
        return {
          clients: existing ? prev.clients : [client, ...prev.clients],
          bookings: [booking, ...prev.bookings],
        }
      })
      return { booking: resultBooking!, client: resultClient! }
    },
    []
  )

  const updateClient = useCallback((id: string, patch: Partial<Client>) => {
    setState((prev) => ({
      ...prev,
      clients: prev.clients.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }))
  }, [])

  const addWork = useCallback(
    (clientId: string, work: Omit<WorkItem, "id" | "updatedAt">) => {
      const item: WorkItem = {
        ...work,
        id: uid("wrk"),
        updatedAt: new Date().toISOString(),
      }
      setState((prev) => ({
        ...prev,
        clients: prev.clients.map((c) =>
          c.id === clientId ? { ...c, work: [item, ...c.work] } : c
        ),
      }))
    },
    []
  )

  const updateWork = useCallback(
    (clientId: string, workId: string, patch: Partial<WorkItem>) => {
      setState((prev) => ({
        ...prev,
        clients: prev.clients.map((c) =>
          c.id === clientId
            ? {
                ...c,
                work: c.work.map((w) =>
                  w.id === workId
                    ? { ...w, ...patch, updatedAt: new Date().toISOString() }
                    : w
                ),
              }
            : c
        ),
      }))
    },
    []
  )

  const setHosting = useCallback(
    (
      clientId: string,
      hosting: {
        provider: HostingProvider
        url: string | null
        lastDeployedAt?: string | null
      }
    ) => {
      setState((prev) => ({
        ...prev,
        clients: prev.clients.map((c) =>
          c.id === clientId
            ? {
                ...c,
                hosting: {
                  provider: hosting.provider,
                  url: hosting.url,
                  lastDeployedAt:
                    hosting.lastDeployedAt ?? c.hosting.lastDeployedAt,
                },
              }
            : c
        ),
      }))
    },
    []
  )

  const deployRebuild = useCallback((draft: RebuildDraft) => {
    const now = new Date().toISOString()
    let result: Client | null = null
    setState((prev) => {
      const target =
        prev.clients.find((c) => c.id === draft.clientId) ??
        ({
          id: uid("cli"),
          company: draft.company,
          contactName: draft.company,
          email: `hello@${slugify(draft.company) || "client"}.example`,
          phone: "",
          createdAt: now,
          hosting: { provider: "pending", url: null, lastDeployedAt: null },
          work: [],
        } satisfies Client)
      const isNew = !prev.clients.some((c) => c.id === target.id)
      const hostedUrl = `https://${slugify(draft.company) || "site"}.factor-e.site`
      const next: Client = {
        ...target,
        company: draft.company,
        hosting: {
          provider: "factor-e",
          url: hostedUrl,
          lastDeployedAt: now,
        },
        work: [
          {
            id: uid("wrk"),
            title: `${draft.styleId} rebuild of ${draft.sourceUrl}`,
            status: "live",
            notes: `${draft.headline} — mock deploy to factor-e hosting.`,
            updatedAt: now,
          },
          ...target.work,
        ],
      }
      result = next
      return {
        ...prev,
        clients: isNew
          ? [next, ...prev.clients]
          : prev.clients.map((c) => (c.id === next.id ? next : c)),
      }
    })
    return result!
  }, [])

  const resetDemo = useCallback(() => setState(seedState()), [])
  const clearClients = useCallback(
    () => setState({ clients: [], bookings: [] }),
    []
  )

  const value = useMemo(
    () => ({
      ready: true,
      clients: state.clients,
      bookings: state.bookings,
      addBooking,
      addClient,
      updateClient,
      addWork,
      updateWork,
      setHosting,
      deployRebuild,
      resetDemo,
      clearClients,
    }),
    [
      state.clients,
      state.bookings,
      addBooking,
      addClient,
      updateClient,
      addWork,
      updateWork,
      setHosting,
      deployRebuild,
      resetDemo,
      clearClients,
    ]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used inside StoreProvider")
  return ctx
}
