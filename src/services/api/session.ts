import { ApiResponse, Endpoint } from 'services/client/config'
import Api from './api'

export default class SessionApi {
  public static getLesson<TProblem>(app: string, lesson: string) {
    return (token: string) =>
      Api.get<ApiResponse.Session.SessionData<TProblem>>(
        Endpoint.session.lesson(app, lesson),
        { token },
      )
  }

  public static getPracticeLesson<TProblem>(app: string) {
    return (token: string) =>
      Api.get<ApiResponse.Session.SessionData<TProblem>>(
        Endpoint.session.appPractice(app),
        { token },
      )
  }
}
