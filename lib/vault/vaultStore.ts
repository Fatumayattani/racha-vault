
export type VaultRecord = {
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

export interface VaultStore {
  save(record: VaultRecord): Promise<void>
  get(vaultDid: string): Promise<VaultRecord | null>
  list(): Promise<VaultRecord[]>
  delete(vaultDid: string): Promise<void>
}