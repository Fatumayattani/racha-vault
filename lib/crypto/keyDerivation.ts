export type KdfParams = {
  salt: Uint8Array
  iterations: number
  hash: 'SHA-256'
}

const encoder = new TextEncoder()

export function generateKdfParams(iterations = 250_000): KdfParams {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  return { salt, iterations, hash: 'SHA-256' }
}

export async function deriveKekFromPassphrase(
  passphrase: string,
  params: KdfParams
): Promise<CryptoKey> {
  if (!passphrase || passphrase.length < 8) {
    throw new Error('Passphrase must be at least 8 characters')
  }

  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: params.salt,
      iterations: params.iterations,
      hash: params.hash,
    },
    baseKey,
    { name: 'AES-KW', length: 256 },
    false,
    ['wrapKey', 'unwrapKey']
  )
}