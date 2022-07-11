<script setup lang="ts">
import { useStore } from '~/stores/wallet'

const store = useStore()
const { hasCharacter, address } = storeToRefs(store)
</script>

<template>
  <div class="w-1/2 mx-auto">
    <template v-if="!hasCharacter">
      <div class="font-bold text-xl mb-10">
        You need to create a character before writing.
      </div>
    </template>

    <LessBalance :address="address" class="my-4" />

    <CharacterCreate />
  </div>
</template>
