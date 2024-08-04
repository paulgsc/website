export const getAcronymFromString = (str: string) =>
  (str.trim().match(/\b(\w)/g) ?? [""]).join("").toUpperCase()

// Function to check if the entire string is enclosed with parentheses ()
export function isEnclosedWithParentheses(str: string): boolean {
  const regex = /^\([^)]*\)$/
  return regex.test(str)
}

// Function to check if the entire string is either [...<some_string>] or [[...<some_string>]]
export function isEnclosedWithBrackets(str: string): boolean {
  // Regex pattern for single brackets: [ ...some_string]
  const regexSingleBrackets = /^\[\.{3}\w+\]$/
  // Regex pattern for double brackets: [[ ...some_string ]]
  const regexDoubleBrackets = /^\[{2}\.{3}\w+\]{2}$/

  return regexSingleBrackets.test(str) || regexDoubleBrackets.test(str)
}
