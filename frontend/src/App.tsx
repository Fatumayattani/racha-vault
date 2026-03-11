import { useEffect, useState } from 'react'
import { createAndPersistVault, getVaults } from './services/vaultService'
import { useVaultSession } from './state/useVaultSession'
import { encryptArtifactForVault, listArtifactsForVault } from './services/artifactService'
import type { VaultMetadata } from '@lib/vault/vaultManager'
import type { ArtifactRecord } from '@lib/vault/artifactStore'

export default function App() {
  const [label, setLabel] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [vaults, setVaults] = useState<VaultMetadata[]>([])
  const [unlockPassphrase, setUnlockPassphrase] = useState('')
  const [selectedVault, setSelectedVault] = useState<VaultMetadata | null>(null)

  const [artifacts, setArtifacts] = useState<ArtifactRecord[]>([])
  const [encryptStatus, setEncryptStatus] = useState<string | null>(null)
  const [encryptedArtifact, setEncryptedArtifact] = useState<{
    filename: string
    originalSize: number
    encryptedSize: number
  } | null>(null)

  const { unlockedVault, unlock, lock, error } = useVaultSession()

  async function refreshVaults() {
    const list = await getVaults()
    setVaults(list)
  }

  async function refreshArtifacts(vaultDid: string) {
    const records = await listArtifactsForVault(vaultDid)
    setArtifacts(records)
  }

  useEffect(() => {
    refreshVaults()
  }, [])

  async function handleCreate() {
    await createAndPersistVault(label, passphrase)
    setLabel('')
    setPassphrase('')
    await refreshVaults()
  }

  async function handleUnlock() {
    if (!selectedVault) return

    await unlock(selectedVault, unlockPassphrase)
    setUnlockPassphrase('')
    await refreshArtifacts(selectedVault.vaultDid)
  }

  async function handleEncrypt(file: File) {
    if (!unlockedVault) return

    try {
      setEncryptStatus('Encrypting...')
      setEncryptedArtifact(null)

      const result = await encryptArtifactForVault(unlockedVault, file)

      setEncryptedArtifact({
        filename: result.filename,
        originalSize: result.originalSize,
        encryptedSize: result.encryptedSize,
      })

      await refreshArtifacts(unlockedVault.vaultDid)
      setEncryptStatus('Encrypted successfully')
    } catch (err: any) {
      setEncryptStatus(err.message || 'Encryption failed')
    }
  }

  function handleLock() {
    lock()
    setArtifacts([])
    setEncryptStatus(null)
    setEncryptedArtifact(null)
    setSelectedVault(null)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-center">Racha Vault</h1>

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
            <div className="mt-4 space-y-4">
              <div className="p-3 bg-green-900 rounded">
                Vault unlocked: {unlockedVault.label}
                <button
                  onClick={handleLock}
                  className="ml-4 text-sm underline"
                >
                  Lock
                </button>
              </div>

              <div className="p-4 border border-gray-800 rounded space-y-3">
                <h3 className="text-base">Encrypt Artifact</h3>

                <input
                  type="file"
                  className="w-full text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    await handleEncrypt(file)
                    e.target.value = ''
                  }}
                />

                {encryptStatus && (
                  <p className="text-sm text-gray-400">{encryptStatus}</p>
                )}

                {encryptedArtifact && (
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>File: {encryptedArtifact.filename}</div>
                    <div>Original size: {encryptedArtifact.originalSize} bytes</div>
                    <div>Encrypted size: {encryptedArtifact.encryptedSize} bytes</div>
                  </div>
                )}
              </div>

              <div className="p-4 border border-gray-800 rounded space-y-3">
                <h3 className="text-base">Artifacts</h3>

                {artifacts.length === 0 ? (
                  <p className="text-sm text-gray-500">No artifacts yet.</p>
                ) : (
                  <ul className="text-sm space-y-2">
                    {artifacts.map((artifact) => (
                      <li
                        key={artifact.id}
                        className="p-3 bg-gray-900 border border-gray-700 rounded"
                      >
                        <div>{artifact.filename}</div>
                        <div className="text-gray-400">
                          Original size: {artifact.originalSize} bytes
                        </div>
                        <div className="text-gray-400">
                          Encrypted size: {artifact.encryptedSize} bytes
                        </div>
                        {artifact.cid && (
                          <div className="text-gray-400 break-all">
                            CID: {artifact.cid}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}