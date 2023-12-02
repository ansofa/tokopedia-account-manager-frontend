import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileLoading() {
  return (
      <Card >
        <CardContent className="grid my-4 gap-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
            <div className="space-y-2">
            <Skeleton className="h-3.5 w-[120px]" />
            <Skeleton className="h-3.5 w-[150px]" />
            <Skeleton className="h-3.5 w-[150px]" />
            </div>
          </div>
        </CardContent>
      </Card>
  )
}
