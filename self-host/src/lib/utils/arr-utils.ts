export const arraysEqualIgnoringOrder = <T>(a: Array<T>, b: Array<T>) => {
  const setA = new Set(a)
  const setB = new Set(b)
  return setA.size === setB.size && [...setA].every((value) => setB.has(value))
}
