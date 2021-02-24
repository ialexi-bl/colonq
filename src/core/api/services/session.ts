import { Api, ApiPromise, Endpoint } from 'core/api/config'
import ApiService from './api'

function getLesson<TProblem>(
  app: string,
  lesson: string,
): ApiPromise<Api.Session.SessionData<TProblem>> {
  return ApiService.get<Api.Session.SessionData<TProblem>>(
    Endpoint.session.lesson(app, lesson),
  )
}

function getPracticeLesson<TProblem>(
  app: string,
): ApiPromise<Api.Session.SessionData<TProblem>> {
  return ApiService.get<Api.Session.SessionData<TProblem>>(
    Endpoint.session.appPractice(app),
  )
}

function submitAnswers<TAnswers>(
  app: string,
  answers: TAnswers,
  disabled: string[] = [],
): ApiPromise<Api.Session.Submit> {
  return ApiService.post<Api.Session.Submit>(
    Endpoint.session.submitAnswers(app),
    { json: { answers, disabled } },
  )
}

const SessionsService = { getLesson, getPracticeLesson, submitAnswers }
export default SessionsService
