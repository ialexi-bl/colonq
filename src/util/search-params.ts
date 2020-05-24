import fromPairs  from 'lodash/fromPairs'

export const getSearchParamsObject = (search: string) =>
  fromPairs(Array.from(new URLSearchParams(search).entries()))

export const hasSearchParam = (search: string, param: string) =>
  new URLSearchParams(search).has(param)
export const getSearchParam = (search: string, param: string) =>
  new URLSearchParams(search).get(param)

export const addSearchParam = (
  search: string,
  name: string,
  value: string = '1',
) => {
  const params = new URLSearchParams(search)
  params.set(name, value)
  return params.toString()
}
export const deleteSearchParam = (search: string, name: string) => {
  const params = new URLSearchParams(search)
  params.delete(name)
  return params.toString()
}
