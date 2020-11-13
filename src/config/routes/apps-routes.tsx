import { RouteOptions } from './types'
import { allowedCategories } from 'apps'
import Config from 'config'
import EnsureAuthenticated from 'components/shared/EnsureAuthenticated'
import NotFound from 'components/pages/NotFound'
import React, { ComponentType, lazy } from 'react'

const appsRoutes: RouteOptions[] = [
  {
    path: '/app/:category/:name/list',
    name: 'appList',
    render: ({
      match: {
        params: { category, name },
      },
    }) => renderAppPage(category, name, 'list'),
  },
  {
    path: '/app/:category/:name/settings',
    name: 'appSettings',
    render: ({
      match: {
        params: { category, name },
      },
    }) => renderAppPage(category, name, 'settings'),
  },
  {
    path: '/app/:category/:name/practice',
    name: 'appSession',
    render: ({
      match: {
        params: { category, name },
      },
    }) => renderAppPage(category, name, 'practice'),
  },
  {
    path: '/app/:category/:name/lesson/:lesson',
    name: 'appPractice',
    render: ({
      match: {
        params: { category, name, lesson },
      },
    }) => renderAppPage(category, name, 'session', { lesson }),
  },
]
export default appsRoutes

const cache: Record<string, ComponentType<any>> = {}
function getComponent(category: string, name: string, path: string) {
  if (!(category in allowedCategories)) {
    return NotFound
  }

  const file = `${category}/${name}/${path}`
  return (cache[file] ||= lazy(() =>
    import(`apps/${file}.route`).catch((e) => {
      if (Config.IS_DEV) console.warn(e)
      return { default: NotFound }
    }),
  ))
}
function renderAppPage(
  category: string,
  name: string,
  path: string,
  props: any = {},
) {
  const Component = getComponent(category, name, path)
  return (
    <EnsureAuthenticated>
      <Component {...props} />
    </EnsureAuthenticated>
  )
}
