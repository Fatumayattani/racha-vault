import { openDB, IDBPDatabase } from 'idb'
import { VaultStore, VaultRecord } from './vaultStore'

const DB_NAME = 'rachaVaultDB'
const DB_VERSION = 1
const STORE_NAME = 'vaults'

async function initDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'vaultDid' })
      }
    },
  })
}

export class IndexedDbVaultStore implements VaultStore {
  async save(record: VaultRecord): Promise<void> {
    const db = await initDB()
    await db.put(STORE_NAME, record)
  }

  async get(vaultDid: string): Promise<VaultRecord | null> {
    const db = await initDB()
    return (await db.get(STORE_NAME, vaultDid)) ?? null
  }

  async list(): Promise<VaultRecord[]> {
    const db = await initDB()
    return await db.getAll(STORE_NAME)
  }

  async delete(vaultDid: string): Promise<void> {
    const db = await initDB()
    await db.delete(STORE_NAME, vaultDid)
  }
}