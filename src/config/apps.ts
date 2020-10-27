import Accents from 'components/icons/subjects/russian/Accents'
import Config from 'config'
import Paronyms from 'components/icons/subjects/russian/Paronyms'
import Prefixes from 'components/icons/subjects/russian/Prefixes'
import Suffixes from 'components/icons/subjects/russian/Suffixes'
import Trigonometry from 'components/icons/subjects/maths/Trigonometry'
import Verbs from 'components/icons/subjects/russian/Verbs'

export type App = {
  icon: React.ComponentType
  name: string
  path: string
  title: string
  category: string
  description: string
}
export type AppCategory = {
  name: string
  apps: string[]
  title: string
}

export const [Apps, AppsCategories] = flattenApps([
  {
    name: 'maths',
    title: 'Математика',
    apps: [
      {
        icon: Trigonometry,
        name: 'trigonometry',
        title: 'Значения тригонометрических функций',
        description:
          'Значения тригонометрических функций для особых углов в градусах и радианах. Выбрать единицы измерения или включить секансы и косекансы можно в настройках.',
      },
    ],
  },
  {
    name: 'russian',
    title: 'Русский язык',
    apps: [
      {
        name: 'accents',
        title: 'Ударения',
        icon: Accents,
        description:
          'Слова с непривычным ударением, включая все из орфоэпического словника ФИПИ. Соответствует заданию 4 ЕГЭ.',
      },
      {
        name: 'paronyms',
        title: 'Паронимы',
        icon: Paronyms,
        description:
          'Слова с похожим написанием, но разным значением. Соответствует заданию 5 ЕГЭ.',
      },
      {
        name: 'prefixes',
        title: 'Приставки и правописание Ъ и Ь',
        icon: Prefixes,
        description:
          'Приставки, оканчивающиеся на парный согласный, разница между “пре-” и “при-”, Ы и И после приставок и правописание твёрдого и мягкого знака в разных частях слова. Соответствует заданию 10 ЕГЭ.',
      },
      {
        name: 'suffixes',
        title: 'Суффиксы',
        icon: Suffixes,
        description:
          'Правописание суффиксов различных частей речи. Соответствует заданию 11 ЕГЭ.',
      },
      {
        name: 'verbs',
        title: 'Окончания глаголов и суффиксы причастий',
        icon: Verbs,
        description:
          'Глаголы и причастия, написание окончаний которых зависит от спряжения или гласной в суффиксе глагола. Соответствует заданию 12 ЕГЭ.',
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
    apps: Omit<App, 'category' | 'path'>[]
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
        path,
        ...app,
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
