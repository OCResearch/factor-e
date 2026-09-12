"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { format, isSameDay, isWeekend, startOfDay } from "date-fns"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { services, slotTimes } from "@/lib/catalog"
import { useStore } from "@/lib/store"
import type { ServiceId } from "@/lib/types"
import { cn } from "@/lib/utils"

const steps = ["Service", "Time", "Details", "Confirmation"] as const

export function BookingFlow() {
  const { addBooking, ready } = useStore()
  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState<ServiceId | null>(null)
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState<string | null>(null)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    notes: "",
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const [clientId, setClientId] = useState<string | null>(null)

  const service = services.find((s) => s.id === serviceId)

  const availableTimes = useMemo(() => {
    if (!date) return []
    if (isWeekend(date)) return []
    return slotTimes
  }, [date])

  function pickDate(next?: Date) {
    setDate(next)
    setTime(null)
    setSlotsError(null)
    if (!next) return
    if (isWeekend(next)) {
      setSlotsError("We keep weekends for client work, not intake. Choose a weekday.")
      return
    }
    setLoadingSlots(true)
    window.setTimeout(() => setLoadingSlots(false), 700)
  }

  function nextFromService() {
    if (!serviceId) {
      toast.error("Choose a session type first.")
      return
    }
    setStep(1)
  }

  function nextFromTime() {
    if (!date || !time) {
      toast.error("Pick a weekday and a time.")
      return
    }
    setStep(2)
  }

  function confirmDetails() {
    setFormError(null)
    if (!form.name.trim() || !form.company.trim()) {
      setFormError("Name and company are required.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("Enter a real work email so the client record can be opened.")
      return
    }
    if (!serviceId || !date || !time) {
      setFormError("Session, date, and time dropped. Start again from the calendar.")
      return
    }
    const { booking, client } = addBooking({
      serviceId,
      date: format(date, "yyyy-MM-dd"),
      time,
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      website: form.website.trim(),
      notes: form.notes.trim(),
    })
    setReference(booking.id)
    setClientId(client.id)
    setStep(3)
  }

  if (!ready) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div>
        <ol className="mb-8 flex flex-wrap gap-2 text-xs font-medium">
          {steps.map((label, i) => (
            <li
              key={label}
              className={cn(
                "rounded-full border px-3 py-1",
                i === step && "border-foreground bg-foreground text-background",
                i < step && "border-foreground/20 bg-white text-foreground",
                i > step && "border-transparent bg-white/60 text-muted-foreground"
              )}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="grid gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setServiceId(s.id)}
                className={cn(
                  "rounded-3xl border bg-white p-4 text-left transition-colors",
                  serviceId === s.id
                    ? "border-foreground ring-2 ring-foreground/15"
                    : "border-transparent ring-1 ring-black/6 hover:bg-white"
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.duration}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.blurb}</p>
              </button>
            ))}
            <Button className="mt-2 w-fit" onClick={nextFromService} disabled={!serviceId}>
              Continue
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-6 md:grid-cols-[auto_1fr]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={pickDate}
              disabled={(d) => startOfDay(d) < startOfDay(new Date())}
            />
            <div>
              <p className="text-sm font-medium">
                {date ? format(date, "EEEE, MMM d") : "Select a date"}
              </p>
              {slotsError && (
                <Alert variant="destructive" className="mt-3">
                  <AlertCircle />
                  <AlertTitle>No weekday slots</AlertTitle>
                  <AlertDescription>{slotsError}</AlertDescription>
                </Alert>
              )}
              {loadingSlots && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-9" />
                  ))}
                </div>
              )}
              {!loadingSlots && date && !slotsError && (
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {availableTimes.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={time === slot ? "default" : "outline"}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              )}
              {!date && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Choose a weekday. Weekends stay empty on purpose.
                </p>
              )}
              <div className="mt-6 flex gap-2">
                <Button variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button onClick={nextFromTime}>Continue</Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid max-w-lg gap-4">
            {formError && (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Cannot confirm yet</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Current website (optional)</Label>
              <Input
                id="website"
                placeholder="https://"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">What should compound first?</Label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={confirmDetails}>Confirm booking</Button>
            </div>
          </div>
        )}

        {step === 3 && reference && (
          <div className="max-w-lg rounded-3xl bg-white p-6 ring-1 ring-black/6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Booking complete
            </p>
            <h2 className="headline mt-2 text-4xl">You are on the calendar.</h2>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Reference</dt>
                <dd className="font-mono">{reference}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Session</dt>
                <dd>{service?.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">When</dt>
                <dd>
                  {date && format(date, "EEE, MMM d")} at {time}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Company</dt>
                <dd>{form.company}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted-foreground">
              A client record is open in admin with this booking as intake work.
              Hosting is still “not placed yet” until studio deploys.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {clientId && (
                <Button
                  nativeButton={false}
                  render={<Link href={`/admin/clients/${clientId}`} />}
                >
                  Open client
                </Button>
              )}
              <Button nativeButton={false} variant="outline" render={<Link href="/studio" />}>
                Go to studio
              </Button>
            </div>
          </div>
        )}
      </div>

      <aside className="h-fit rounded-3xl bg-white p-5 text-sm ring-1 ring-black/6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Session details
        </p>
        <p className="mt-3 font-medium">{service?.name ?? "No session yet"}</p>
        <p className="mt-1 text-muted-foreground">{service?.duration ?? "—"}</p>
        <p className="mt-4">
          {date ? format(date, "EEEE, MMMM d") : "Date open"}
          {time ? ` · ${time}` : ""}
        </p>
        {date && isSameDay(date, new Date()) && (
          <p className="mt-3 text-xs text-muted-foreground">
            Same-day slots are first-come. If we cannot take it, we will say so
            on the call.
          </p>
        )}
      </aside>
    </div>
  )
}
