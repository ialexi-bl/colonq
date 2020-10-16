import { Apps, AppsCategories } from 'config/apps'
import { ScrollablePage } from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import React from 'react'
import ThemeCard from 'components/shared/ThemeCard'

export default function AppsList() {
  return (
    <ScrollablePage>
      <PageTitle>Выбор тем</PageTitle>
      <p className={'px-4 mb-12'}>
        Выбери темы, по которым ты хочешь заниматься. Их можно будет добавить и
        убрать позже.
      </p>
      <div className={'px-4 pb-64'}>
        {AppsCategories.map((category) => (
          <div className={'mb-8'} key={category.name}>
            <h2 className={'text-3xl mb-2'}>{category.title}</h2>

            {category.apps.map((appPath, i) => {
              const app = Apps[appPath]
              return (
                <ThemeCard
                  key={app.name}
                  icon={<app.icon />}
                  title={app.title}
                />
              )
            })}
          </div>
        ))}
      </div>
    </ScrollablePage>
  )
}
