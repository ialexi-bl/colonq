import { RouteComponentProps } from 'config/routes'
import React from 'react'
import SettingsPage from 'apps/shared/Settings'

export default function SettingsRoute(controls: RouteComponentProps) {
  return <SettingsPage app={'russian/paronyms'} {...controls} />
}
