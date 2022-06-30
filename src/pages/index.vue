<script setup lang="ts">
import { useStore } from '~/stores/wallet'
import { ethers } from 'ethers'
import { contract, provider, Network } from '~/composables/crossbell'

const store = useStore()
const { address, hasProfile, isMainnet } = storeToRefs(store)
const router = useRouter()

if (hasProfile.value) router.push('/write')

async function connect() {
  await contract.connect()
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  if (!address.value)
    address.value = await signer.getAddress()
  if (!hasProfile.value) {
    await contract.existsProfileForAddress(address.value).then(async(bool) => {
      await(hasProfile.value = bool.data)
      if (!hasProfile.value) router.push('/profile')
    })
  }
  if (!isMainnet.value)
    await Network.switchToCrossbellMainnet(provider).then(() => { isMainnet.value = true })
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
