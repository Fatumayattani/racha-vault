import { createVaultDid } from './vaultDid'
import {
  generateKdfParams,
  deriveKekFromPassphrase,
} from '../crypto/keyDerivation'
import {
  generateVaultMasterKey,
  wrapVaultMasterKey,
  unwrapVaultMasterKey,
} from '../crypto/wrap'

export type VaultMetadata = {
  vaultDid: string
  label: string
  createdAt: number
  wrappedKey: ArrayBuffer
  kdf: {
    salt: Uint8Array
    iterations: number
    hash: 'SHA-256'
  }
}

export type UnlockedVault = {
  vaultDid: string
  label: string
  createdAt: number
  masterKey: CryptoKey
}

export async function createVault(
  label: string,
  passphrase: string
): Promise<VaultMetadata> {
  if (!label.trim()) {
    throw new Error('Vault label is required')
  }

  const vaultDid = createVaultDid()
  const createdAt = Date.now()

  const masterKey = await generateVaultMasterKey()
  const kdf = generateKdfParams()
  const kek = await deriveKekFromPassphrase(passphrase, kdf)
  const wrappedKey = await wrapVaultMasterKey(masterKey, kek)

  return {
    vaultDid,
    label,
    createdAt,
    wrappedKey,
    kdf,
  }
}

export async function unlockVault(
  metadata: VaultMetadata,
  passphrase: string
): Promise<UnlockedVault> {
  const kek = await deriveKekFromPassphrase(passphrase, metadata.kdf)
  const masterKey = await unwrapVaultMasterKey(
    metadata.wrappedKey,
    kek
  )

  return {
    vaultDid: metadata.vaultDid,
    label: metadata.label,
    createdAt: metadata.createdAt,
    masterKey,
  }
}