import { AppsMap, LeafSection, Section } from './types'
import React from 'react'

const cache: { [key: string]: React.ComponentType } = {}
const applet = (name: string): LeafSection['loadComponent'] => async () => {
  return (
    cache[name] ||
    (cache[name] = (await import(`applets/${name}/index`)).default)
  )
}

const getLeaf = (section: string, leaf: string, title: string): LeafSection => {
  const path = section === '/' ? leaf : `${section.slice(1)}/${leaf}`
  return {
    title,
    location: `${section === '/' ? '' : section}/${leaf}`,
    parent: `${section}`,
    leaf: true,
    component: cache[path] || null,
    loadComponent: applet(path),
  }
}

export const appsMap: AppsMap = {
  '/': {
    title: 'Назад',
    location: '/',
    parent: null,
    leaf: false,
    items: [
      '/russian/accents',
      '/russian/verb-endings',
      '/russian/prefixes',
      '/russian/orthography',
      '/russian/paronyms',
    ],
  },

  // Russian
  // '/russian': {
  //   title: 'Русский язык',
  //   location: '/russian',
  //   parent: '/',
  //   leaf: false,
  //   items: [
  //     '/russian/accents',
  //     '/russian/n-or-nn',
  //     '/russian/verb-endings',
  //     '/russian/prefixes',
  //     '/russian/orthography',
  //   ],
  // },

  get '/russian/accents'(): Section {
    return getLeaf('/', 'russian/accents', 'Ударения')
  },
  get '/russian/n-or-nn'(): Section {
    return getLeaf('/', 'russian/n-or-nn', 'Н и НН')
  },
  get '/russian/verb-endings'(): Section {
    return getLeaf(
      '/',
      'russian/verb-endings',
      'Окончания глаголов и причастий',
    )
  },
  get '/russian/prefixes'(): Section {
    return getLeaf('/', 'russian/prefixes', 'Приставки')
  },
  get '/russian/orthography'(): Section {
    return getLeaf('/', 'russian/orthography', 'Орфография')
  },
  get '/russian/paronyms'(): Section {
    return getLeaf('/', 'russian/paronyms', 'Паронимы')
  },
}
