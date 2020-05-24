import { IDBPDatabase, openDB } from 'idb'

export const APPDATA_STORAGE = 'appdata'

type Database = IDBPDatabase<{
  appdata: any
}>
function db(): Promise<Database> {
  if ('indexedDB' in window) {
    return openDB('data', 1, {
      upgrade(db, oldVersion) {
        if (oldVersion === 0) {
          db.createObjectStore(APPDATA_STORAGE)
        }
      },
    })
  } else {
    return Promise.resolve(({
      get() {
        return null
      },
      put(_: any, data: any) {
        return data
      },
    } as unknown) as Database)
  }
}

export const getDb = db()
