import { UnknownError } from 'services/errors'

export const extractBrackets = (word: string): [string, string, string] => {
  const match = word.match(/^(.*?)\[(.+)\](.*)$/)
  if (!match) {
    throw new UnknownError(`Couldn't match word ${word}`)
  }
  return [match[1], match[2], match[3]]
}
