import { createVault } from '@lib/vault/vaultManager'
import { IndexedDbVaultStore } from '../../../lib/vault/indexedDbVaultStore'

const store = new IndexedDbVaultStore()

export async function createAndPersistVault(
  label: string,
  passphrase: string
): Promise<VaultMetadata> {
  const metadata = await createVault(label, passphrase)
  await store.save(metadata)
  return metadata
}

export async function listVaults() {
  return store.list()
}

export async function getVaults() {
  return store.list()
}