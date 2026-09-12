import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl">Client not on the roster</h1>
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
