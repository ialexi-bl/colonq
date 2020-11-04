import { ApiErrorName } from 'services/client/config'
import { ColonqError } from './Error'
import { NormalizedOptions } from 'ky'
import ErrorName from './ErrorName'

export class HttpError extends ColonqError {
  public status: number
  private apiMessage: string | null = null
  private apiName: string | null = null
  private detail: any | null = null

  constructor(
    public readonly request: Request,
    public readonly response: Response,
    public readonly options: NormalizedOptions,
  ) {
    super(ErrorName.HTTP_ERRROR, response.statusText)
    this.status = response.status

    this.getApiMessage = this.getApiMessage.bind(this)
    this.getApiName = this.getApiName.bind(this)
    this.getDetail = this.getDetail.bind(this)
  }

  async populateDetails() {
    if (!this.apiName) {
      try {
        const data = await this.response.json()
        this.apiName = data.error?.name || ApiErrorName.UNKNOWN_ERROR
        this.detail = data.error?.detail || null
        this.apiMessage = data.error?.message || 'Неизвестная ошибка'
      } catch (e) {
        this.apiName = ApiErrorName.UNKNOWN_ERROR
        this.apiMessage = 'Неизвестная ошибка'
      }
    }
  }

  async getApiName() {
    await this.populateDetails()
    return this.apiName as string
  }

  async getApiMessage() {
    await this.populateDetails()
    return this.apiMessage as string
  }

  async getDetail() {
    await this.populateDetails()
    return this.detail
  }
}
