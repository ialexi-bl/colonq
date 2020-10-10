export const extractLetterAnswer = (content: string, options: string[]) => {
  return options.indexOf(
    content.length > 0
      ? content.toLowerCase()
      : content.split('').find((x) => x !== x.toLowerCase())!,
  )
}
