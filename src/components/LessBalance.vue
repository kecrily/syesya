<script setup lang="ts">
const props = defineProps<{ address: string }>()

let balance: string = $ref()

balance = (await contract.getBalance(props.address)).data
</script>

<template v-if="Number(balance) < 0.002">
  <div>
    <p>
      You have less than the recommended $CSB, which may not be enough to complete the character creation.
    </p>
    <a-link href="https://faucet.crossbell.io/">
      Get some from Crossbell Faucet.
    </a-link>
  </div>
</template>
