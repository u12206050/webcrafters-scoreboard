/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Score {
  id: string
  name: string
  rank: number
  score: number
  location: string
}

declare module 'v3-infinite-loading' {
  import type { Component } from 'vue'
  const InfiniteLoading: Component<{
    target: String
    distance: Number
    top: Boolean
    identifier: any
    firstLoad: Boolean
  }, any, any>
  export default InfiniteLoading
}