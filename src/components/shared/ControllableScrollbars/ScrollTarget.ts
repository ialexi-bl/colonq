import Scrollbars, { positionValues } from 'react-custom-scrollbars'

export type ScrollEvent = CustomEvent<positionValues>
export type ScrollHandler = (event: ScrollEvent) => unknown

export class ScrollTarget extends EventTarget {
  public scrollApi: Scrollbars | null = null

  constructor() {
    super()
    this.onScrollFrame = this.onScrollFrame.bind(this)
    this.addScrollListener = this.addScrollListener.bind(this)
    this.removeScrollListener = this.removeScrollListener.bind(this)
  }

  public onScrollFrame(values: positionValues) {
    this.dispatchEvent(new CustomEvent('scroll', { detail: values }))
  }

  public addScrollListener(callback: ScrollHandler) {
    this.addEventListener('scroll', callback as any)
  }

  public removeScrollListener(callback: ScrollHandler) {
    this.removeEventListener('scroll', callback as any)
  }
}
