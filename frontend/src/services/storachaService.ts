import * as Client from '@storacha/client'

let storachaClient: Awaited<ReturnType<typeof Client.create>> | null = null

async function getClient() {
  if (storachaClient) return storachaClient

  storachaClient = await Client.create()
  return storachaClient
}

export async function uploadEncryptedBlob(blob: Blob): Promise<string> {
  const client = await getClient()

  const file = new File([blob], 'artifact.enc', {
    type: 'application/octet-stream'
  })

  const cid = await client.uploadFile(file)

  return cid.toString()
}