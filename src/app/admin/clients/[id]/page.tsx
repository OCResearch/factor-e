import type { Metadata } from "next"
import { ClientDetail } from "./client-detail"

export const metadata: Metadata = {
  title: "Client",
}

export default function ClientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <ClientDetail params={params} />
}
