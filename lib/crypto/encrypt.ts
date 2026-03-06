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

export type EncryptedFileResult = {
  encryptedBlob: Blob
  meta: {
    originalName: string
    originalType: string
    originalSize: number
    ivLength: number
  }
}

export async function encryptFileAesGcm(
  file: File,
  key: CryptoKey
): Promise<EncryptedFileResult> {
  const plaintext = await file.arrayBuffer()
  const { iv, ciphertext } = await encryptBytesAesGcm(plaintext, key)

  const header = new Uint8Array(1 + iv.length)
  header[0] = iv.length
  header.set(iv, 1)

  const encryptedBlob = new Blob([header, ciphertext], {
    type: 'application/octet-stream',
  })

  return {
    encryptedBlob,
    meta: {
      originalName: file.name,
      originalType: file.type || 'application/octet-stream',
      originalSize: file.size,
      ivLength: iv.length,
    },
  }
}

export async function decryptEncryptedBlobAesGcm(
  encryptedBlob: Blob,
  key: CryptoKey
): Promise<ArrayBuffer> {
  const buf = await encryptedBlob.arrayBuffer()
  const view = new Uint8Array(buf)

  if (view.length < 2) {
    throw new Error('Invalid encrypted blob')
  }

  const ivLen = view[0]
  if (ivLen < 8 || ivLen > 32) {
    throw new Error('Invalid IV length')
  }

  const ivEnd = 1 + ivLen
  if (view.length <= ivEnd) {
    throw new Error('Invalid encrypted blob')
  }

  const iv = view.slice(1, ivEnd)
  const ciphertext = buf.slice(ivEnd)

  return decryptBytesAesGcm({ iv, ciphertext }, key)
}