export const extractLetterAnswer = (_: string, options: string[]) => {
  return options.indexOf(options.find((x) => x !== x.toLowerCase())!)
}
