import { create } from '@storacha/client'

const USE_MOCK = true

let client: any | null = null

async function getClient() {
  if (client) return client

  client = await create()

  const current = await client.currentSpace()

  if (!current) {
    throw new Error(
      'Storacha space not configured. Run: storacha space use <space-did>'
    )
  }

  return client
}

// ✅ realistic CID generator (base32, CIDv1-like)
function generateMockCid(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz234567'
  let result = 'bafy'

  for (let i = 0; i < 56; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }

  return result
}

async function uploadWithMock(blob: Blob): Promise<string> {
  // simulate latency
  await new Promise((resolve) => setTimeout(resolve, 400))

  return generateMockCid()
}

async function uploadWithStoracha(blob: Blob): Promise<string> {
  const client = await getClient()

  const cid = await client.upload(blob)

  return cid.toString()
}

export async function uploadEncryptedBlob(blob: Blob): Promise<string> {
  if (USE_MOCK) {
    return uploadWithMock(blob)
  }

  return uploadWithStoracha(blob)
}