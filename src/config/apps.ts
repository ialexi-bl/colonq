import Accents from 'components/icons/subjects/russian/Accents'
import Config from 'config'
import Paronyms from 'components/icons/subjects/russian/Paronyms'
import Prefixes from 'components/icons/subjects/russian/Prefixes'
import Suffixes from 'components/icons/subjects/russian/Suffixes'
import Trigonometry from 'components/icons/subjects/maths/Trigonometry'
import Verbs from 'components/icons/subjects/russian/Verbs'

export type App = {
  category: string
  name: string
  path: string
  title: string
  icon: React.ComponentType
}
export type AppCategory = {
  name: string
  apps: string[]
  title: string
}

export const [Apps, AppsCategories] = flattenApps([
  {
    name: 'russian',
    title: 'Русский язык',
    apps: [
      {
        name: 'accents',
        title: 'Ударения',
        icon: Accents,
      },
      {
        name: 'paronyms',
        title: 'Паронимы',
        icon: Paronyms,
      },
      {
        name: 'prefixes',
        title: 'Приставки и правописание Ъ и Ь',
        icon: Prefixes,
      },
      {
        name: 'suffixes',
        title: 'Суффиксы',
        icon: Suffixes,
      },
      {
        name: 'verbs',
        title: 'Окончания глаголов и суффиксы причастий',
        icon: Verbs,
      },
    ],
  },
  {
    name: 'maths',
    title: 'Математика',
    apps: [
      {
        name: 'trigonometry',
        title: 'Значения тригонометрических функций',
        icon: Trigonometry,
      },
    ],
  },
])

/**
 * Utility function to map categories from easy-to-write format
 * to easy-to-use formats
 * @param categories
 */
function flattenApps(
  categories: {
    title: string
    name: string
    apps: { name: string; title: string; icon: React.ComponentType }[]
  }[],
) {
  const result: Record<string, App> = {}
  const categoriesList: AppCategory[] = []

  categories.forEach((category) => {
    const apps: string[] = []
    category.apps.forEach((app) => {
      const path = `${category.name}/${app.name}`

      if (Config.IS_DEV) {
        if (path in result) {
          console.warn(`Encoundered duplicate app path "${path}"`)
        }
      }

      apps.push(path)
      result[path] = {
        category: category.name,
        title: app.title,
        name: app.name,
        icon: app.icon,
        path,
      }
    })
    categoriesList.push({
      apps,
      name: category.name,
      title: category.title,
    })
  })
  return [result, categoriesList] as const
}
