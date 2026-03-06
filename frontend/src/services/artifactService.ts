import { encryptFileAesGcm } from '@lib/crypto/encrypt'
import type { UnlockedVault } from '@lib/vault/vaultManager'
import { uploadEncryptedBlob } from './storachaService'

export type EncryptedArtifact = {
  vaultDid: string
  filename: string
  originalSize: number
  encryptedSize: number
  encryptedBlob: Blob
  createdAt: number
  cid: string
}

export async function encryptArtifactForVault(
  vault: UnlockedVault,
  file: File
): Promise<EncryptedArtifact> {
  const { encryptedBlob, meta } = await encryptFileAesGcm(file, vault.masterKey)

  const cid = await uploadEncryptedBlob(encryptedBlob)

return {
  vaultDid: vault.vaultDid,
  filename: meta.originalName,
  originalSize: meta.originalSize,
  encryptedSize: encryptedBlob.size,
  encryptedBlob,
  cid,
  createdAt: Date.now(),
}
}