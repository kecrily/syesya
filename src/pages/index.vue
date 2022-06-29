<script setup lang="ts">
import { useStore } from '~/stores/wallet'
import { ethers } from 'ethers'
import { contract, provider, Network } from '~/composables/crossbell'

const store = useStore()
const { address, isConnect, hasProfile, isMainnet } = storeToRefs(store)
const router = useRouter()

if (!isConnect.value) await contract.connect().then(() => { isConnect.value = true })
if (!isMainnet.value)
  await Network.switchToCrossbellMainnet(provider).then(() => { isMainnet.value = true })
if (hasProfile.value) router.push('/write')
if (!hasProfile.value) router.push('/profile')

async function connect() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  address.value = await signer.getAddress()
  await contract.existsProfileForAddress(address.value).then((bool) => {
    hasProfile.value = bool.data
  })
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
