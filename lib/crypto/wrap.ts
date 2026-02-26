// lib/crypto/wrap.ts

export async function generateVaultMasterKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )
}

export async function wrapVaultMasterKey(
  masterKey: CryptoKey,
  kek: CryptoKey
): Promise<ArrayBuffer> {
  return crypto.subtle.wrapKey(
    'raw',
    masterKey,
    kek,
    { name: 'AES-KW' }
  )
}

export async function unwrapVaultMasterKey(
  wrappedKey: ArrayBuffer,
  kek: CryptoKey
): Promise<CryptoKey> {
  return crypto.subtle.unwrapKey(
    'raw',
    wrappedKey,
    kek,
    { name: 'AES-KW' },
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}