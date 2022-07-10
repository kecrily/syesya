<script setup lang="ts">
import { ethers } from 'ethers'
import { useStore } from '~/stores/wallet'
import { Network } from '~/composables/crossbell'

const store = useStore()
const { address, hasCharacter, isMainnet } = storeToRefs(store)
const router = useRouter()

function goWhere() {
  if (address.value) {
    if (hasCharacter.value) router.push('/write')
    else router.push('/character/create')
  }
}

await goWhere()

async function connect() {
  await contract.connect()
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  if (!address.value)
    address.value = await signer.getAddress()
  if (!isMainnet.value)
    await Network.switchToCrossbellMainnet(provider).then(() => { isMainnet.value = true })
  if (!hasCharacter.value) {
    await contract.existsCharacterForAddress(address.value).then(async(bool) => {
      await(hasCharacter.value = bool.data)
      await goWhere()
    })
  }
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
  layout: pain
</route>
