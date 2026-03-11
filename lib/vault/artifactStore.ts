export type ArtifactRecord = {
  id: string
  vaultDid: string
  filename: string
  originalSize: number
  encryptedSize: number
  cid?: string
  createdAt: number
}

export interface ArtifactStore {
  save(record: ArtifactRecord): Promise<void>
  list(vaultDid: string): Promise<ArtifactRecord[]>
}