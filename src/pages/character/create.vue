<script setup lang="ts">
import { useStore } from '~/stores/wallet'

const store = useStore()
const { hasCharacter, address } = storeToRefs(store)
</script>

<template>
  <template v-if="!hasCharacter">
    <div class="mb-10">
      <div class="font-bold text-xl">
        You need to create a character before writing.
      </div>
    </div>
  </template>

  <LessBalance :address="address" />

  <CharacterCreate />
</template>
