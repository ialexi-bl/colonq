import { APPDATA_STORAGE, getDb } from 'services/database'
import { AppDataManager } from 'services/applets/AppletManager'

export type LocalAppData<TData> = {
  version: number
  data: TData
}
export async function getLocalData<TData, TStored>(
  manager: AppDataManager<TData, TStored, any>,
): Promise<null | LocalAppData<TData>> {
  try {
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
        data: manager.formatForClient(local.data),
      }
    }
  } catch (e) {}
  return null
}

export async function setLocalData<TData, TStored>(
  manager: AppDataManager<TData, TStored, any>,
  data: TData,
  version: number,
  fromServer?: false,
): Promise<void>
export async function setLocalData<TData, TStored>(
  manager: AppDataManager<TData, TStored, any>,
  data: TStored,
  version: number,
  fromServer: true,
): Promise<void>
export async function setLocalData<TData, TStored>(
  manager: AppDataManager<TData, TStored, any>,
  data: TData | TStored,
  version: number,
  fromServer: boolean = false,
) {
  const db = await getDb
  const local = {
    version,
    data: fromServer ? data : manager.formatToStore(data as TData),
  }

  await db.put(APPDATA_STORAGE, local, manager.applet)
}
