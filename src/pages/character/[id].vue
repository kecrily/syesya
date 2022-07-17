<script setup lang="ts">
import { BigNumber } from 'ethers'
import type { CharacterEntity, NoteEntity, csbUri } from '~/composables/crossbell'
import { resolveIpfsLink, utils } from '~/composables/crossbell'

const props = defineProps<{ id: number|string }>()
let character: CharacterEntity|null = $ref()
let notes: NoteEntity[] = $ref()
let social: csbUri[] = $ref()

character = await indexer.getCharacter(BigNumber.from(props.id))

if (typeof character?.metadata?.content?.connected_accounts?.[0] === 'string') {
  social = character?.metadata?.content?.connected_accounts
    ?.map(a => utils.parseCsbUri(a))
}

notes = (await indexer.getNotes({ characterId: props.id })).list
</script>

<template>
  <div class="flex flex-row items-center space-x-2">
    <a-avatar>
      <img :src="resolveIpfsLink(character?.metadata?.content?.avatars?.[0])">
    </a-avatar>

    <h1 class="text-2xl">
      {{ character?.metadata?.content?.name }}
    </h1>
  </div>
  <div class="opacity-80 prose">
    {{ character?.metadata?.content?.bio }}
  </div>

  <div class="flex flex-row space-x-2 mt-2">
    <a-tag>
      <div class="ri:user-4-line mr-1" />
      @{{ character?.handle }}
    </a-tag>
    <a
      v-for="w in character?.metadata?.content?.websites"
      :key="w" :href="w" target="_blank" class="no-underline"
    >
      <a-tag>
        <div class="ri:link mr-1" />{{ w.replace(/https?:\/\//, '') }}
      </a-tag>
    </a>
    <a-tag v-for="s in social" :key="s?.host + s?.identity">
      <div :class="`ri:${s?.platform}-line`" class="mr-1" />{{ s?.identity }}
    </a-tag>
  </div>

  <div class="mt-4 space-y-6 opacity-90 text-base">
    <article v-for="n in notes" :key="n.linkKey">
      {{ n.metadata?.content?.content }}
      <a :href="n.toUri?.toString()" class="text-sm no-underline">
        ↩
      </a>

      <a-carousel v-if="n.metadata?.content?.attachments?.length" class="mt-2 h-60 w-150">
        <a-carousel-item
          v-for="a in n.metadata?.content.attachments" :key="a.name"
          class="rounded"
        >
          <a-image :src="resolveIpfsLink(a.address)" width="100%" />
        </a-carousel-item>
      </a-carousel>
    </article>
  </div>
</template>

<route lang="yaml">
meta:
  layout: pain
</route>
