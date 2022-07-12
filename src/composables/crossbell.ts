import { Contract, Indexer } from 'crossbell.js'

const provider = window.ethereum
const contract = new Contract(provider)
const indexer = new Indexer()

export function resolveIpfsLink(link: string | undefined) {
  if (!link) return undefined
  return `https://gateway.ipfs.io/${link.replace('://', '/')}`
}

export { provider, contract, indexer }
export * from 'crossbell.js'
