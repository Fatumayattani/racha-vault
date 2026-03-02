import { useEffect, useState } from 'react'
import { createAndPersistVault, getVaults } from './services/vaultService'
import { useVaultSession } from './state/useVaultSession'
import type { VaultMetadata } from '@lib/vault/vaultManager'

export default function App() {
  const [label, setLabel] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [vaults, setVaults] = useState<VaultMetadata[]>([])
  const [unlockPassphrase, setUnlockPassphrase] = useState('')
  const [selectedVault, setSelectedVault] = useState<VaultMetadata | null>(null)

  const { unlockedVault, unlock, lock, error } = useVaultSession()

  async function refreshVaults() {
    const list = await getVaults()
    setVaults(list)
  }

  useEffect(() => {
    refreshVaults()
  }, [])

  async function handleCreate() {
    await createAndPersistVault(label, passphrase)
    setLabel('')
    setPassphrase('')
    refreshVaults()
  }

  async function handleUnlock() {
    if (!selectedVault) return
    await unlock(selectedVault, unlockPassphrase)
    setUnlockPassphrase('')
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold text-center">Racha Vault</h1>

        {/* Create Vault */}
        <div className="space-y-3 border border-gray-800 p-4 rounded">
          <h2 className="text-lg">Create Vault</h2>
          <input
            type="text"
            placeholder="Vault label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded"
          />
          <input
            type="password"
            placeholder="Passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded"
          />
          <button
            onClick={handleCreate}
            className="w-full py-2 bg-white text-black rounded"
          >
            Create Vault
          </button>
        </div>

        {/* Vault List */}
        <div className="space-y-3 border border-gray-800 p-4 rounded">
          <h2 className="text-lg">Vaults</h2>

          {vaults.length === 0 && (
            <p className="text-gray-500 text-sm">No vaults yet.</p>
          )}

          {vaults.map((vault) => (
            <div
              key={vault.vaultDid}
              className="p-3 bg-gray-900 border border-gray-700 rounded cursor-pointer"
              onClick={() => setSelectedVault(vault)}
            >
              {vault.label}
            </div>
          ))}

          {selectedVault && !unlockedVault && (
            <div className="space-y-2 mt-4">
              <input
                type="password"
                placeholder="Enter passphrase"
                value={unlockPassphrase}
                onChange={(e) => setUnlockPassphrase(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded"
              />
              <button
                onClick={handleUnlock}
                className="w-full py-2 bg-red-600 rounded"
              >
                Unlock
              </button>
              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}
            </div>
          )}

          {unlockedVault && (
            <div className="mt-4 p-3 bg-green-900 rounded">
              Vault unlocked: {unlockedVault.label}
              <button
                onClick={lock}
                className="ml-4 text-sm underline"
              >
                Lock
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}