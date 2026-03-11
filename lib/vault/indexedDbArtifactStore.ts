import { openDB } from 'idb'
import { ArtifactStore, ArtifactRecord } from './artifactStore'

const DB_NAME = 'rachaVaultDB'
const DB_VERSION = 1
const STORE_NAME = 'artifacts'

async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {

      if (!db.objectStoreNames.contains(STORE_NAME)) {

        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id'
        })

        store.createIndex('vaultDid', 'vaultDid')
      }
    }
  })
}

export class IndexedDbArtifactStore implements ArtifactStore {

  async save(record: ArtifactRecord): Promise<void> {
    const db = await initDB()
    await db.put(STORE_NAME, record)
  }

  async list(vaultDid: string): Promise<ArtifactRecord[]> {

    const db = await initDB()

    const index = db.transaction(STORE_NAME)
      .store
      .index('vaultDid')

    return index.getAll(vaultDid)
  }
}