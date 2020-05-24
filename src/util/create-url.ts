export const createUrl = (
  uri: string,
  query: { [key: string]: string | number },
) => {
  const url = new URL(uri)
  Object.keys(query).forEach(key =>
    url.searchParams.append(key, query[key].toString()),
  )
  return url.toString()
}
