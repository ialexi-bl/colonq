import { Link } from 'react-router-dom'
import { NavContainer } from './NavContainer'
import { NavList } from './NavList'
import { NavListContainer } from './NavListContainer'
import { NavTitle } from './NavTitle'
import { ParentSection, Section, siteMap } from 'config/site-map'
import { Report } from 'components/icons/Report'
import { feedback } from 'config/routes'
import { useCurrentLocation } from 'hooks/util/use-current-location'
import { usePrevious } from 'hooks/util/use-previous'
import { useRipples } from 'hooks/useRipples'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Nav.module.scss'

export type NavProps = {
  close?: () => unknown
  open?: boolean
}
export enum State {
  STATIC,
  PREPARE,
  ANIMATE,
}

export const TIMEOUT = parseInt(styles.transitionDuration)

const getLocationFromBrowser = (browserLocation: string): string =>
  siteMap[browserLocation]
    ? siteMap[browserLocation].leaf
      ? siteMap[browserLocation].parent!
      : browserLocation
    : '/'

const getTop = (title: HTMLElement | null, Nav: HTMLElement | null) => {
  if (!title || !Nav) return 0
  const { transform } = title.style
  title.style.transform = 'translate(0)'
  const titleRect = title.getBoundingClientRect()
  title.style.transform = transform
  return (titleRect.top || 0) - (Nav?.getBoundingClientRect().top || 0)
}

export default React.memo(({ close, open }: NavProps) => {
  const [makeRipple, ripples, clearRipples] = useRipples()

  const browserLocation = useCurrentLocation()
  const [currentLocation, setCurrentLocation] = useState(() =>
    getLocationFromBrowser(browserLocation),
  )
  const [nextLocation, setNextLocation] = useState(currentLocation)

  const [animating, setAnimating] = useState<State>(State.STATIC)
  const [prevBrowserLocation, prevOpen] = usePrevious([browserLocation, open])

  const navRef = useRef<null | HTMLDivElement>(null)
  const newTitleRef = useRef<null | HTMLLIElement>(null)
  const listRef = useRef<null | HTMLUListElement>(null)
  const scrollerRef = useRef<null | HTMLDivElement>(null)

  const out = nextLocation === siteMap[currentLocation]?.parent
  const currentSection = siteMap[currentLocation] as ParentSection
  const nextSection = siteMap[nextLocation] as ParentSection

  const startTransition = useCallback(
    (e: React.MouseEvent<HTMLElement>, section: Section, title?: boolean) => {
      if (title && !section.parent) {
        close?.()
      } else if (!section.leaf) {
        makeRipple(e)
        setNextLocation((title && section.parent) || section.location)
      }
    },
    [close, makeRipple],
  )

  useEffect(() => {
    if (open) {
      navRef.current?.querySelector('button')?.focus()
    }
  }, [open])
  useEffect(() => {
    //  Handling new location
    if (!siteMap[currentLocation] || !siteMap[nextLocation]) {
      setCurrentLocation('/')
      setNextLocation('/')
    } else if (currentLocation !== nextLocation) {
      setAnimating(State.PREPARE)
    }
  }, [currentLocation, nextLocation])
  useEffect(() => {
    if (open && !prevOpen && browserLocation !== prevBrowserLocation) {
      const location = getLocationFromBrowser(browserLocation)
      setCurrentLocation(location)
      setNextLocation(location)
    }
  }, [browserLocation, open, prevBrowserLocation, prevOpen])
  useEffect(() => {
    if (animating === State.PREPARE) {
      setAnimating(State.ANIMATE)

      setTimeout(() => {
        setAnimating(State.STATIC)
        setCurrentLocation(nextLocation)
        clearRipples()
      }, TIMEOUT)
    }
  }, [animating, clearRipples, nextLocation])

  useEffect(() => {
    const { current: elem } = scrollerRef
    if (!elem) return
    elem.style.marginRight = `-${elem.offsetWidth - elem.clientWidth}px`
  }, [])

  const placeholderProps = animating !== State.STATIC && {
    style: { top: getTop(newTitleRef.current, navRef.current) },
    placeholder: true,
    ripples,
  }
  return (
    <NavContainer ref={navRef} animating={animating} out={out} open={open}>
      <NavTitle
        tabIndex={open ? 0 : -1}
        section={currentSection}
        startTransition={
          animating === State.STATIC ? startTransition : undefined
        }
        {...(animating !== State.STATIC && out ? placeholderProps : {})}
      />
      {animating !== State.STATIC && (
        <NavTitle section={nextSection} {...(!out ? placeholderProps : {})} />
      )}

      <NavListContainer scrollerRef={scrollerRef}>
        <NavList
          isOld
          tabIndex={open ? 0 : -1}
          newTitleLocation={nextLocation}
          newTitleRef={newTitleRef}
          startTransition={
            animating === State.STATIC ? startTransition : undefined
          }
          section={currentSection}
          ref={listRef}
        />
        {animating !== State.STATIC && (
          <NavList
            isNew
            //  key={NEW_LIST}
            section={nextSection}
            itemsStyle={
              out
                ? {
                    transform: `translateY(-${
                      nextSection.items.length * 4 + 10
                    }rem)`,
                  }
                : undefined
            }
            newTitleRef={newTitleRef}
            newTitleLocation={out ? currentLocation : nextLocation}
          />
        )}
      </NavListContainer>
      <div className={styles.Buttons}>
        <Link to={feedback()} onClick={close} className={styles.Button}>
          <Report className={styles.Icon} />
        </Link>
      </div>
    </NavContainer>
  )
})
