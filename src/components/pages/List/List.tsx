import { ScrollablePage } from 'components/shared/Page'
import { app } from 'config/routes'
import Accents from 'components/icons/Accents'
import ListIcon from 'components/icons/List'
import Orthography from 'components/icons/Orthography'
import PageTitle from 'components/shared/PageTitle'
import Prefixes from 'components/icons/Prefixes'
import React from 'react'
import ThemeCard from 'components/shared/ThemeCard/ThemeCard'
import Title from 'components/shared/Title'
import Verbs from 'components/icons/Verbs'

export default function List() {
  return (
    <ScrollablePage>
      <PageTitle icon={<ListIcon />} label={'Темы'} />
      <div className={'w-100 px-4'}>
        <Title className={'font-3 mb-4'} level={2}>
          Русский язык
        </Title>
        <ThemeCard
          to={app('russian/accents')}
          icon={<Accents />}
          label={'Ударения'}
          className={'mb-3'}
        />
        <ThemeCard
          to={app('russian/prefixes')}
          icon={<Prefixes />}
          label={'Приставки'}
          className={'mb-3'}
        />
        <ThemeCard
          to={app('russian/orthography')}
          icon={<Orthography />}
          label={'Орфография'}
          className={'mb-3'}
        />
        <ThemeCard
          to={app('russian/verb-endings')}
          icon={<Verbs />}
          label={'Окончания глаголов и причастий'}
          className={'mb-5'}
        />

        <Title className={'text-center font-2 mb-5'} level={3}>
          Новые темы и предметы скоро!
        </Title>
      </div>
    </ScrollablePage>
  )
}
