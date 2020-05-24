import { APPDATA_STORAGE, getDb } from 'services/database'
import { AppDataManager } from 'services/app-data/AppDataManager'

export type LocalAppData<TData> = {
  version: number
  data: TData
}
export async function getLocalData<TData>(
  manager: AppDataManager<TData, any>,
): Promise<null | LocalAppData<TData>> {
  try {
    // const local = JSON.parse(localStorage.getItem(key(manager.applet)) || '')
    const db = await getDb
    const local = await db.get(APPDATA_STORAGE, manager.applet)

    if (
      local &&
      typeof local === 'object' &&
      typeof local.version === 'number' &&
      manager.validate(local.data)
    ) {
      return {
        version: local.version,
        data: local.data,
      }
    }
  } catch (e) {}
  return null
}
export async function setLocalData<TData>(
  manager: AppDataManager<TData, any>,
  data: TData,
  version: number,
) {
  const db = await getDb
  const local = { version, data: manager.cleanup(data) }

  await db.put(APPDATA_STORAGE, local, manager.applet)
  // localStorage.setItem(key(manager.applet), JSON.stringify(local))
}
