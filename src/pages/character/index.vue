<script setup lang="ts">
import type { CharacterEntity } from '~/composables/crossbell'
import { resolveIpfsLink } from '~/composables/crossbell'
import { useStore } from '~/stores/wallet'

const store = useStore()
const { address } = storeToRefs(store)

let characters: CharacterEntity[] = $ref()

characters = (await indexer.getCharacters(address.value)).list
</script>

<template>
  <a-card v-for="c in characters" :key="c.handle" hoverable class="mb-4 w-1/3">
    <div class="flex flex-row items-center">
      <a-avatar v-if="c.metadata?.content?.avatars?.[0]">
        <img alt="avatar" :src="resolveIpfsLink(c.metadata?.content?.avatars?.[0])">
      </a-avatar>
      <div class="ml-2 text-xl">
        @{{ c.handle }}
      </div>
      <a-link class="ml-6" :href="`/character/${c.characterId}`">
        View
      </a-link>
      <a-link>
        Edit
      </a-link>
    </div>
  </a-card>

  <a-button
    type="primary"
    href="/character/create"
  >
    Create New Character
  </a-button>
</template>
