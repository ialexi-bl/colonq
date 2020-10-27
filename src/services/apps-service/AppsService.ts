import { ApiResponse, Endpoint } from 'services/client/config'
import { App, Apps, addAppDetails, addApps } from 'store/user'
import { StoreConsumer } from 'store'
import ApiClient from 'services/client'

export default class AppsService extends StoreConsumer {
  private loading: Record<string, Promise<App | null>> = {}
  private appsLoading: Promise<Apps | null> | null = null

  get user() {
    return this.selector((state) => state.user)
  }

  constructor(private readonly apiClient: ApiClient) {
    super()
  }

  public async getApps() {
    if (this.appsLoading) {
      return this.appsLoading
    }

    const result = await (this.appsLoading = this.fetchApps())
    this.appsLoading = null
    return result
  }

  public async getApp(app: string) {
    const { apps } = this.user
    if (apps?.[app]) {
      return apps[app]
    }
    if (this.loading[app]) {
      return this.loading[app]
    }

    const result = await (this.loading[app] = this.fetchApp(app))
    delete this.loading[app]
    return result
  }

  private async fetchApps(): Promise<Apps | null> {
    const { user } = this
    if (user.status !== 'authenticated') return null

    const { data } = await this.apiClient.get<ApiResponse.User.GetApps>(
      Endpoint.user.getApps(user.id),
      { authenticate: true },
    )

    this.dispatch(addApps(data))
    return this.user.apps
  }

  private async fetchApp(app: string): Promise<App | null> {
    const { user } = this
    if (user.status !== 'authenticated') return null

    const { data } = await this.apiClient.get<ApiResponse.User.GetApp>(
      Endpoint.user.getApp(user.id, app),
      { authenticate: true },
    )

    this.dispatch(addAppDetails({ app, lessons: data.lessons }))
    return this.user.apps![app]
  }
}
