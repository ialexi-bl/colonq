import { IDBPDatabase, openDB } from 'idb'

export const APPDATA_STORAGE = 'appdata'

type Schema = {
  appdata: any
}
type Database = IDBPDatabase<Schema>

async function db(): Promise<Database> {
  if ('indexedDB' in window) {
    try {
      const db = await openDB<Schema>('data', 1, {
        upgrade(db, oldVersion) {
          if (oldVersion === 0) {
            db.createObjectStore(APPDATA_STORAGE)
          }
        },
      })
      return db
    } catch (e) {}
  }

  return ({
    get() {
      return null
    },
    put(_: any, data: any) {
      return data
    },
  } as unknown) as Database
}

export const getDb = db()
