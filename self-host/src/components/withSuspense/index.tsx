import type { ComponentType, FC } from "react"
import { Suspense } from "react"

import { Icons } from "@/components/icons"

// Define the props for the loading component

// Create a default loading component
const DefaultLoading: FC = () => (
  <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
    <Icons.spinner className="mr-2 size-4 animate-spin" />
    Loading...
  </div>
)

// Improve type inference for the HOC
function withSuspense<P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> {
  const WithSuspenseWrapper: FC<P> = (props) => {
    const { ...componentProps } = props
    return (
      <Suspense fallback={<DefaultLoading />}>
        <WrappedComponent {...(componentProps as P)} />
      </Suspense>
    )
  }

  WithSuspenseWrapper.displayName = `WithSuspense(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`

  return WithSuspenseWrapper
}

export default withSuspense
