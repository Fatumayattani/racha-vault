import { create } from '@storacha/client'

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

export async function uploadEncryptedBlob(blob: Blob): Promise<string> {
  const client = await getClient()

  const cid = await client.upload(blob)

  return cid.toString()
}