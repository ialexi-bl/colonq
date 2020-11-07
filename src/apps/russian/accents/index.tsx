import { AppComponent } from 'apps'
import { PRACTICE } from 'apps/hooks/use-lesson'
import { Route, RouteComponentProps, Switch } from 'react-router'
import { app } from 'config/routes'
import AccentsSession from './AccentsSession'
import AppContainer from 'apps/AppContainer'
import NotFound from 'components/pages/NotFound'
import ProblemsProvider from 'apps/shared/ProblemsProvider'
import React from 'react'

const PracticeSession = () => (
  <ProblemsProvider
    app={'russian/accents'}
    lesson={PRACTICE}
    consumer={AccentsSession}
  />
)
const LessonSession = ({ match }: RouteComponentProps<{ lesson: string }>) => (
  <ProblemsProvider
    app={'russian/accents'}
    lesson={match.params.lesson}
    consumer={AccentsSession}
  />
)

const Accents: AppComponent = () => (
  <AppContainer id={'russian/accents'}>
    <Switch>
      <Route
        exact
        path={app('russian/accents', 'practice')}
        render={PracticeSession}
      />
      <Route
        exact
        path={app('russian/accents', 'list')}
        render={PracticeSession}
      />
      <Route
        exact
        path={app('russian/accents', ':lesson(\\d+)')}
        render={LessonSession}
      />
      <Route component={NotFound} />
    </Switch>
  </AppContainer>
)
export default Accents
