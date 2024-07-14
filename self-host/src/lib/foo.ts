"invalid ts" // not invalid

const foo = (bar: string): number => [bar]

const test2: string[] = foo(5)

export { test2 }

// this should create error! this  should error!
