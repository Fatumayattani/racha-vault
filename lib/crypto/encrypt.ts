
export type EncryptedPayload = {
  iv: Uint8Array
  ciphertext: ArrayBuffer
}

export async function encryptBytesAesGcm(
  plaintext: ArrayBuffer,
  key: CryptoKey
): Promise<EncryptedPayload> {
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    plaintext
  )

  return { iv, ciphertext }
}

export async function decryptBytesAesGcm(
  payload: EncryptedPayload,
  key: CryptoKey
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: payload.iv },
    key,
    payload.ciphertext
  )
}