import { encryptFileAesGcm } from '@lib/crypto/encrypt'
import type { UnlockedVault } from '@lib/vault/vaultManager'

export type EncryptedArtifact = {
  vaultDid: string
  filename: string
  originalSize: number
  encryptedSize: number
  encryptedBlob: Blob
  createdAt: number
}

export async function encryptArtifactForVault(
  vault: UnlockedVault,
  file: File
): Promise<EncryptedArtifact> {
  const { encryptedBlob, meta } = await encryptFileAesGcm(file, vault.masterKey)

  return {
    vaultDid: vault.vaultDid,
    filename: meta.originalName,
    originalSize: meta.originalSize,
    encryptedSize: encryptedBlob.size,
    encryptedBlob,
    createdAt: Date.now(),
  }
}