<script setup lang="ts">
import { BigNumber } from 'ethers'
import type { CharacterEntity } from '~/composables/crossbell'

const props = defineProps<{ id: number|string }>()
let data: CharacterEntity|null = $ref()
await indexer.getCharacter(BigNumber.from(props.id)).then((res) => {
  data = res
})
</script>

<template>
  <h1 class="text-2xl">
    {{ data?.metadata?.content.name }}
  </h1>
  <div class="opacity-80">
    {{ data?.metadata?.content.description || data?.metadata?.content.bio }}
  </div>

  <div class="flex flex-row space-x-2 mt-2">
    <a-tag>
      @{{ data?.handle }}
    </a-tag>

    <a-tag v-for="a in data?.metadata?.content.attributes" :key="a.trait_type">
      {{ a.trait_type }}: {{ a.value }}
    </a-tag>
  </div>
</template>
