export const getAcronymFromString = (str: string) =>
  (str.trim().match(/\b(\w)/g) ?? [""]).join("").toUpperCase()

// Function to check if the entire string is enclosed with parentheses ()
export function isEnclosedWithParentheses(str: string): boolean {
  const regex = /^\([^)]*\)$/
  return regex.test(str)
}

// Function to check if the entire string is either [...<some_string>] or [[...<some_string>]]
export function isEnclosedWithBrackets(str: string): boolean {
  const regex = /^\[.*\]$/

  return regex.test(str)
}
