interface TestType {
  key: string
}

type Foo = "apple" | "orange"

export const foo: Foo = "apple"
export const bar: TestType = {
  key: "bar",
}
