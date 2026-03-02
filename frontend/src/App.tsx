import { useState } from 'react'
import { createAndPersistVault } from './services/vaultService'

export default function App() {
  const [label, setLabel] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleCreate = async () => {
    try {
      setStatus('Creating vault...')
      await createAndPersistVault(label, passphrase)
      setStatus('Vault created successfully')
      setLabel('')
      setPassphrase('')
    } catch (err: any) {
      setStatus(err.message || 'Error creating vault')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Create Vault
        </h1>

        <input
          type="text"
          placeholder="Vault label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Passphrase"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <button
          onClick={handleCreate}
          className="w-full py-2 bg-white text-black rounded"
        >
          Create Vault
        </button>

        {status && (
          <p className="text-sm text-center text-gray-400">
            {status}
          </p>
        )}
      </div>
    </div>
  )
}