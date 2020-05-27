import styles from './util.module.scss'

export const cssUtil = styles as Record<
  | 'centered'
  | 'fullSize'
  | 'routeTransitionUp'
  | 'routeTransitionDown'
  | 'routeTransitionRight'
  | 'routeTransitionLeft'
  | 'routeTransitionOpacity'
  | 'routeTransitionBgOpacity',
  string
>
