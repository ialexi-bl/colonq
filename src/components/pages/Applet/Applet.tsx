import { NotFound } from '../NotFound'
import { PageContainer } from 'components/shared/Page'
import { Section, siteMap } from 'config/site-map'
import { showLoading } from 'store/view'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import React, { useEffect, useState } from 'react'

export const APPLET_LOADING = 'Applet'

export default function Applet() {
  const match = useRouteMatch<{ path?: string }>()
  const location = '/' + (match.params.path || '')

  const dispatch = useDispatch()
  const section: Section | undefined = siteMap[location]
  const [Component, setComponent] = useState<React.ComponentType | null>(() =>
    section?.leaf ? section.component : null,
  )

  useEffect(() => {
    if (section && !Component && section.leaf) {
      dispatch(showLoading(APPLET_LOADING))
      section.loadComponent().then((x) => setComponent(() => x))
    }
  }, [Component, dispatch, section])

  if (!section?.leaf) {
    return <NotFound />
  }

  if (!Component) return null
  return (
    <PageContainer>
      <Component />
    </PageContainer>
  )
}
