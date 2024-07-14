"invalid ts" // not invalid

const foo = (bar: string): number => [bar]

const test: string[] = foo(5)

export { test }

// this should create error! stage this edit
