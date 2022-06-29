<script setup lang="ts">
import { useStore } from '~/stores/wallet'
import { Contract, Network } from 'crossbell.js'
import { ethers } from 'ethers'

const store = useStore()
const { address, isConnect, hasProfile, isMainnet } = storeToRefs(store)
const router = useRouter()

const provider = window.ethereum
const contract = new Contract(provider)

if (!isConnect.value) await contract.connect().then(() => { isConnect.value = true })
if (!isMainnet.value)
  await Network.switchToCrossbellMainnet(provider).then(() => { isMainnet.value = true })

async function connect() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  address.value = await signer.getAddress()
}

</script>

<template>
  <h1 class="text-4xl">
    SyeSya
  </h1>
  <div class="text-2xl text-gray-700 font-thin mb-6">
    A markdown editor for Crossbell.
  </div>

  <a-button @click="connect">
    Connect Wallet
  </a-button>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
