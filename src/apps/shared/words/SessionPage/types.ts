// export type WordsProblem = {
//   problem: string
//   options?: string[]
//   answer: number
//   id: string
// }
export type WordsNext = (answer: number | string) => void
export type ProblemWithAnswer = {
  id: string
  answer: string | number
}
