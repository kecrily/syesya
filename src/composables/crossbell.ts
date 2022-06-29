import { Contract } from 'crossbell.js'

const provider = window.ethereum
const contract = new Contract(provider)

export { provider, contract }
export * from 'crossbell.js'
