import { UnknownError } from 'services/errors'

export const extractBrackets = (
  word: string,
): [string, string, string, string, string] => {
  const match = word.match(/^([^[]*?)\s*([^[\s]*)\[(.+)\]([^\s]*)\s*(.*)$/)
  if (!match) {
    throw new UnknownError(`Couldn't match word ${word}`)
  }
  return [match[1], match[2], match[3], match[4], match[5]]
}
