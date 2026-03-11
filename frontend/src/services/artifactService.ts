import { encryptFileAesGcm } from '@lib/crypto/encrypt'
import type { UnlockedVault } from '@lib/vault/vaultManager'
import { uploadEncryptedBlob } from './storachaService'
import { IndexedDbArtifactStore } from '@lib/vault/indexedDbArtifactStore'
import type { ArtifactRecord } from '@lib/vault/artifactStore'

export type EncryptedArtifact = {
  vaultDid: string
  filename: string
  originalSize: number
  encryptedSize: number
  encryptedBlob: Blob
  cid: string
  createdAt: number
}

const artifactStore = new IndexedDbArtifactStore()

export async function encryptArtifactForVault(
  vault: UnlockedVault,
  file: File
): Promise<EncryptedArtifact> {

  const { encryptedBlob, meta } = await encryptFileAesGcm(file, vault.masterKey)

  const cid = await uploadEncryptedBlob(encryptedBlob)

  const record: ArtifactRecord = {
    id: crypto.randomUUID(),
    vaultDid: vault.vaultDid,
    filename: meta.originalName,
    originalSize: meta.originalSize,
    encryptedSize: encryptedBlob.size,
    cid,
    createdAt: Date.now(),
  }

  await artifactStore.save(record)

  return {
    vaultDid: vault.vaultDid,
    filename: meta.originalName,
    originalSize: meta.originalSize,
    encryptedSize: encryptedBlob.size,
    encryptedBlob,
    cid,
    createdAt: record.createdAt,
  }
}

export async function listArtifactsForVault(
  vaultDid: string
): Promise<ArtifactRecord[]> {
  return artifactStore.list(vaultDid)
}