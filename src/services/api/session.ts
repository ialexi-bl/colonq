import { ApiResponse, Endpoint } from 'services/api/config'
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

  public static submitAnswers<TAnswers>(
    app: string,
    answers: TAnswers,
    disabled: string[] = [],
  ) {
    return (token: string) =>
      Api.post<ApiResponse.Session.Submit>(
        Endpoint.session.submitAnswers(app),
        { json: { answers, disabled }, token },
      )
  }
}
