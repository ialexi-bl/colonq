import React from 'react'

export default function AppError({ id }: { id: string }) {
  return <div>Не удалось загрузить приложение {id}</div>
}
