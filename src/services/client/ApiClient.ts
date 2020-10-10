import { NormalizedOptions, Options } from 'ky'
import { MixedDispatch } from 'store/types'

export default class ApiClient {
  public static async create(dispatch: MixedDispatch) {}

  private constructor() {
    this.afterResponse = this.afterResponse.bind(this)
    this.beforeRequest = this.beforeRequest.bind(this)
  }

  private async beforeRequest(req: Request, options: NormalizedOptions) {}

  private async afterResponse(req: Request, options: Options, res: Response) {
    // Adding request and options for logging purposes
    res._req = req
    res._opts = options
    return res
  }
}
