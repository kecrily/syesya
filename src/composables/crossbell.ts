import { Contract, Indexer } from 'crossbell.js'

const provider = window.ethereum
const contract = new Contract(provider)
const indexer = new Indexer()

export { provider, contract, indexer }
export * from 'crossbell.js'
