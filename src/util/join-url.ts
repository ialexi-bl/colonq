export const joinUrl = (base: string, path: string) =>
  `${base}/${path}`.replace(/([^:])\/{2,}/g, '$1/')
