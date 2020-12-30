import { Location } from 'history'
import { Ref } from 'react'
import { Route, Switch } from 'react-router'
import { RouteComponentProps, routesArray } from 'config/routes'
import Boundary from 'components/pages/Boundary'
import LoadingErrorPage from './LoadingErrorPage'
import NotFound from 'components/pages/NotFound'

/**
 * Displays all app routes and manages their loading process
 */
export default function Routes({
  location,
  innerRef,
  ...controls
}: { location: Location; innerRef?: Ref<HTMLElement> } & RouteComponentProps) {
  // console.log(`RENDERING ${location.pathname}`)
  return (
    <Boundary>
      <Switch location={location}>
        {routesArray.map((route) => (
          <Route
            exact
            key={route.name}
            path={route.path}
            render={(data) => {
              const key = route.getKey?.(data) || 'default'
              route._importStarted ||= {}
              route._imported ||= {}

              if (route._imported[key]) {
                const Component = route._imported[key]
                // console.log('RENDERING COMPONENT', Component)
                return <Component {...controls} {...data} />
              }
              if (route._importStarted[key]) {
                // console.log('RENDERING NULL')
                return null
              }

              // This should be outside of "importPage" because
              // if it's created inside, react treats it as a different
              // component every time and rerenders error page
              const ImportError = () => (
                <LoadingErrorPage
                  ref={innerRef}
                  retry={importPage}
                  {...controls}
                />
              )
              function importPage() {
                // Preventing route from being imported multiple times
                route._importStarted![key] = true
                return route
                  .getComponent(data)
                  .catch(() => {
                    route._importStarted![key] = false

                    return { default: ImportError, NO_LOADING_REQUIRED: false }
                  })
                  .then((m) => {
                    route._imported![key] = m.default
                    controls.setProgress('_imported' as any)
                  })
              }
              importPage()
              console.log('RENDERING NOTHING')
            }}
          />
        ))}
        <Route render={() => <NotFound {...controls} />} />
      </Switch>
    </Boundary>
  )
}
