type AnalyticsEvent = {
  event: string
  props?: Record<string, unknown>
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void
  }
}

export function trackEvent({ event, props }: AnalyticsEvent) {
  if (typeof window === 'undefined') return

  try {
    window.plausible?.(event, props ? { props } : undefined)
  } catch {
    // no-op: analytics should never break UX flows
  }
}
