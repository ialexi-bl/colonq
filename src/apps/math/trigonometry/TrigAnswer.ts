import { TrigActiveKeys } from './TrigKeyboard'

type CursorPosition =
  | 'start'
  | 'minus'
  | 'coef'
  | 'rootStart'
  | 'rootEnd'
  | 'end'
export type Coef = {
  type: 'coef'
  value: number | string
}
export type Sqrt = {
  type: 'sqrt'
  value: number | string | null
  cursor: false | 'start' | 'end'
}
export type Minus = {
  type: 'minus'
}
export type Csr = {
  type: 'cursor'
}
export type Expr = (Coef | Minus | Sqrt | Csr)[]
export type Answer = {
  fraction: boolean
  numerator: Expr
  denominator: Expr
  undefined: boolean
}

class Expression {
  public coef: number | null = null
  public rootValue: number | null = null
  public rootVisible = false
  public negative = false

  valid() {
    return this.rootVisible ? this.rootValue !== null : this.coef !== null
  }

  isEnd(position: CursorPosition) {
    if (position === 'end') return true
    if (position === 'coef' && !this.rootVisible) return true
    if (position === 'start' && this.coef === null && !this.rootVisible)
      return true
    return false
  }

  getEndPosition() {
    if (this.rootVisible) return 'end'
    if (this.coef !== null) return 'coef'
    return 'start'
  }

  isStart(position: CursorPosition) {
    return position === 'start'
  }

  leftPosition(position: CursorPosition): CursorPosition {
    /* eslint-disable no-fallthrough */
    switch (position) {
      case 'end':
        if (this.rootVisible && this.rootValue !== null) return 'rootEnd'
      case 'rootEnd':
        if (this.rootVisible && this.rootValue === null) return 'rootStart'
      case 'rootStart':
        if (this.coef !== null) return 'coef'
      case 'coef':
        if (this.negative) return 'minus'
      default:
        return 'start'
    }
    /* eslint-enable no-fallthrough */
  }

  rightPosition(position: CursorPosition): CursorPosition {
    /* eslint-disable no-fallthrough */
    switch (position) {
      case 'start':
        if (this.negative) return 'minus'
      case 'minus':
        if (this.coef !== null) return 'coef'
      case 'coef':
        if (this.rootVisible) return 'rootStart'
      case 'rootStart':
        if (this.rootValue !== null) return 'rootEnd'
      default:
        return 'end'
    }
    /* eslint-enable no-fallthrough */
  }

  toArray(cursor?: null | CursorPosition): Expr {
    const result: Expr = []
    if (cursor === 'start') result.push({ type: 'cursor' })
    if (this.negative) {
      result.push({ type: 'minus' })
      if (cursor === 'minus') result.push({ type: 'cursor' })
    }
    if (this.coef !== null) {
      result.push({
        type: 'coef',
        value: this.coef,
      })
      if (cursor === 'coef') result.push({ type: 'cursor' })
    }
    if (this.rootVisible) {
      result.push({
        type: 'sqrt',
        value: this.rootValue,
        cursor:
          cursor === 'rootStart'
            ? 'start'
            : cursor === 'rootEnd'
            ? 'end'
            : false,
      })
    }
    if (cursor === 'end') result.push({ type: 'cursor' })

    return result
  }

  assignFromString(str: string) {
    const parts = str.split('sqrt')
    if (parts[0]) this.coef = +parts[0]
    if (parts.length === 2) {
      this.rootVisible = true
      this.rootValue = +parts[1]
    }
  }
}
class Cursor {
  public location: 'numerator' | 'denominator' = 'numerator'
  public position: CursorPosition = 'start'
}

export default class TrigAnswer {
  public static UNDEFINED = 'Неопределён'

  public cursor = new Cursor()
  public isFraction = false

  public denominator = new Expression()
  public numerator = new Expression()

  public static fromString(str: string): TrigAnswer {
    const answer = new TrigAnswer()

    if (str === TrigAnswer.UNDEFINED) {
      answer.isFraction = true
      answer.numerator.coef = 1
      answer.denominator.coef = 0
      return answer
    }

    const parts = str.split('/')
    answer.numerator.assignFromString(parts[0])
    if (parts.length === 2) {
      answer.isFraction = true
      answer.denominator.assignFromString(parts[1])
    }
    return answer
  }

  public allowedKeys(): TrigActiveKeys {
    const keys: TrigActiveKeys = {
      sqrt: this.canSqrt(),
      frac: this.canFrac(),
      left: this.canLeft(),
      right: this.canRight(),
      minus: this.canMinus(),
      submit: this.canSubmit(),
      delete: this.canDelete(),
      undefined: true,
    }

    // numbers
    const { location, position } = this.cursor
    const expr = this[location]
    if (
      ((position === 'start' || position === 'minus') && expr.coef === null) ||
      (expr.rootVisible && position === 'rootStart' && expr.rootValue === null)
    ) {
      keys[0] = keys[1] = keys[2] = keys[3] = true
    }

    return keys
  }

  public 0(): void {
    return this.number(0)
  }

  public 1(): void {
    return this.number(1)
  }

  public 2(): void {
    return this.number(2)
  }

  public 3(): void {
    return this.number(3)
  }

  public minus(): void {
    if (this.canMinus()) {
      this[this.cursor.location].negative = true
      this.cursor.position = 'minus'
    }
  }

  public sqrt(): void {
    if (this.canSqrt()) {
      this[this.cursor.location].rootVisible = true
      this.cursor.position = 'rootStart'
    }
  }

  public up(): void {
    if (this.cursor.location === 'denominator') {
      this.cursor.location = 'numerator'
      this.cursor.position = this.numerator.getEndPosition()
    }
  }

  public down(): void {
    if (this.isFraction && this.cursor.location === 'numerator') {
      this.cursor.location = 'denominator'
      this.cursor.position = 'start'
    }
  }

  public right(): void {
    const { location, position } = this.cursor
    if (!this.canRight()) return

    const expr = this[location]
    if (this.isFraction && location === 'numerator' && expr.isEnd(position)) {
      this.cursor.location = 'denominator'
      this.cursor.position = 'start'
      return
    }

    this.cursor.position = expr.rightPosition(position)
  }

  public left(): void {
    const { location, position } = this.cursor
    if (!this.canLeft()) return

    const expr = this[location]
    if (location === 'denominator' && expr.isStart(position)) {
      this.cursor.location = 'numerator'
      this.cursor.position = expr.getEndPosition()
      return
    }

    this.cursor.position = expr.leftPosition(position)
  }

  public frac(): void {
    this.isFraction = true
    this.cursor.location = 'denominator'
    this.cursor.position = 'start'
  }

  public delete(): void {
    const { location, position } = this.cursor
    const expr = this[location]

    if (expr.isStart(position)) {
      if (location === 'denominator') {
        this.isFraction = false
        this.denominator = new Expression()
        this.cursor.location = 'numerator'
        this.cursor.position = this.numerator.getEndPosition()
      }
    } else if (position === 'minus') {
      this.cursor.position = 'start'
      expr.negative = false
    } else if (position === 'coef') {
      this.cursor.position = expr.leftPosition(position)
      expr.coef = null
    } else if (position === 'rootStart') {
      if (expr.rootValue === null) {
        this.cursor.position = expr.leftPosition(position)
        expr.rootVisible = false
      } else {
        this.left()
      }
    } else {
      expr.rootValue = null
      this.cursor.position = 'rootStart'
    }
  }

  public toObject(): Answer {
    const { location, position } = this.cursor
    return {
      undefined:
        this.denominator.coef === 0 || this.denominator.rootValue === 0,
      fraction: this.isFraction,
      numerator: this.numerator.toArray(location[0] === 'n' ? position : null),
      denominator: this.denominator.toArray(
        location[0] === 'd' ? position : null,
    ),
    }
  }

  public toString(): string {
    if (!this.isFraction) {
      return this.exprToString(this.numerator.coef, this.numerator.rootValue)
    }

    // @ts-ignore
    const negative = this.numerator.negative ^ this.denominator.negative
    let nCoef = this.numerator.coef ?? 1
    let nRoot = this.numerator.rootValue ?? 1
    let dCoef = this.denominator.coef ?? 1
    let dRoot = this.denominator.rootValue ?? 1

    if (dCoef === 0 || dRoot === 0) return TrigAnswer.UNDEFINED
    if (nCoef === 0 || nRoot === 0) return '0'

    if (dRoot > 1) {
      dCoef *= dRoot
      nRoot *= dRoot
      dRoot = 1
    }
    if (Number.isInteger(Math.sqrt(nRoot))) {
      nCoef *= Math.sqrt(nRoot)
      nRoot = 1
    }

    let d
    if ((d = this.gcd(nCoef, dCoef)) > 1) {
      nCoef /= d
      dCoef /= d
    }
    if ((d = this.gcd(nRoot, dRoot)) > 1) {
      nRoot /= d
      dRoot /= d
    }

    let result = ''
    if (negative) result += '-'
    result += this.exprToString(nCoef, nRoot)

    if (dCoef !== 1) {
      result += `/${dCoef}`
    }
    return result
  }

  // PRIVATE METHODS

  private exprToString(coef: number | null, root: number | null) {
    coef ??= 1
    root ??= 1

    if (coef === 1) {
      return root === 1 ? '1' : `sqrt${root}`
    } else {
      return root === 1 ? `${coef}` : `${coef}sqrt${root}`
    }
  }

  private gcd(a: number, b: number): number {
    if (!b) return a
    return this.gcd(b, a % b)
  }

  private number(number: 0 | 1 | 2 | 3): void {
    const { location, position } = this.cursor
    const expr = this[location]

    if ((position === 'start' || position === 'minus') && expr.coef === null) {
      expr.coef = number
      this.cursor.position = 'coef'
    } else if (position === 'rootStart' && expr.rootValue === null) {
      expr.rootValue = number
      this.cursor.position = 'end'
    }
  }

  private valid() {
    return (
      this.numerator.valid() && (!this.isFraction || this.denominator.valid())
    )
  }

  private canMinus() {
    return (
      this.cursor.position === 'start' && !this[this.cursor.location].negative
    )
  }

  private canSqrt() {
    return (
      !this[this.cursor.location].rootVisible &&
      (this.cursor.position === 'coef' || this.cursor.position === 'start')
    )
  }

  private canFrac() {
    return !this.isFraction
  }

  private canRight() {
    return !(this.isFraction
      ? this.cursor.location === 'denominator' &&
        this.denominator.isEnd(this.cursor.position)
      : this.numerator.isEnd(this.cursor.position))
  }

  private canLeft() {
    return !(
      this.cursor.location === 'numerator' && this.cursor.position === 'start'
    )
  }

  private canSubmit() {
    return this.valid()
  }

  private canDelete() {
    return (
      this.cursor.location !== 'numerator' ||
      !this.numerator.isStart(this.cursor.position)
    )
  }
}
