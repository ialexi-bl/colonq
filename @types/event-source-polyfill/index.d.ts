declare module 'event-source-polyfill' {
  export class EventSourcePolyfill extends EventSource {
    constructor(
      url: string,
      options?: {
        headers?: any
      },
    )

    addEventListener(type: string, handler: (event: MessageEvent) => void): void
    removeEventListener(
      type: string,
      handler: (event: MessageEvent) => void,
    ): void
  }
}
