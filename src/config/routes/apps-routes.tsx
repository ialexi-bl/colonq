import { RouteComponentProps, RouteOptions } from './types'
import Config from 'config'
import NotFound from 'components/pages/NotFound'
import React from 'react'

const getKey: RouteOptions['getKey'] = ({ match: { params } }) =>
  `${params.category}/${params.name}/${params.lesson || ''}`
const appsRoutes: RouteOptions[] = [
  {
    getKey,
    path: '/app/:category/:name/stats',
    name: 'appList',
    getComponent: ({
      match: {
        params: { category, name },
      },
    }) => importAppComponent(category, name, 'stats'),
  },
  {
    getKey,
    path: '/app/:category/:name/settings',
    name: 'appSettings',
    getComponent: ({
      match: {
        params: { category, name },
      },
    }) => importAppComponent(category, name, 'settings'),
  },
  {
    getKey,
    path: '/app/:category/:name/practice',
    name: 'appSession',
    getComponent: ({
      match: {
        params: { category, name },
      },
    }) => importAppComponent(category, name, 'practice'),
  },
  {
    getKey,
    path: '/app/:category/:name/lesson/:lesson',
    name: 'appPractice',
    getComponent: ({
      match: {
        params: { category, name, lesson },
      },
    }) =>
      importAppComponent(category, name, 'session').then((module) => ({
        default: (controls: RouteComponentProps) => (
          <module.default lesson={lesson} {...controls} />
        ),
      })),
  },
]
export default appsRoutes

function importAppComponent(category: string, name: string, path: string) {
  return import(`apps/${category}/${name}/${path}.route`).catch((e) => {
    if (Config.IS_DEV) console.warn(e)
    return { default: NotFound }
  })
}
