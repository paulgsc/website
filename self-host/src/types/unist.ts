import type { Node } from "unist-builder"

export interface UnistNode extends Node {
  type: string
  name?: string
  tagName?: string
  value?: string
  properties?: {
    __rawString__?: string
    __className__?: string
    __event__?: string
    [key: string]: unknown
  } & NpmCommands
  attributes?: Array<{
    name: string
    value: unknown
    type?: string
  }>
  children?: Array<UnistNode>
}

export interface UnistTree extends Node {
  children: Array<UnistNode>
}

export interface NpmCommands {
  __npmCommand__?: string
  __yarnCommand__?: string
  __pnpmCommand__?: string
  __bunCommand__?: string
}
