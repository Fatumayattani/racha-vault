import { useState } from 'react'
import { unlockVault, VaultMetadata, UnlockedVault } from '@lib/vault/vaultManager'

export function useVaultSession() {
  const [unlockedVault, setUnlockedVault] = useState<UnlockedVault | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function unlock(metadata: VaultMetadata, passphrase: string) {
    try {
      setError(null)
      const vault = await unlockVault(metadata, passphrase)
      setUnlockedVault(vault)
    } catch (err: any) {
      setError('Invalid passphrase')
      setUnlockedVault(null)
    }
  }

  function lock() {
    setUnlockedVault(null)
  }

  return {
    unlockedVault,
    unlock,
    lock,
    error,
  }
}