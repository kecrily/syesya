<script setup lang="ts">
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import { useStore } from '~/stores/wallet'
import type { CharacterEntity } from '~/composables/crossbell'

const store = useStore()
const { address } = storeToRefs(store)

const plugins = [gfm()]
let content = $ref('')
const handleChange = (v: string) => { content = v }

const title = $ref('')
const tags: string[] = $ref()
const locked = $ref(false)

let listCharacters: CharacterEntity[] = $ref()
const selectCharacter = $ref('')
listCharacters = (await indexer.getCharacters(address.value)).list

let transactionHash = $ref('')
let noteId: number = $ref()
async function publish() {
  await contract.connect();

  ({ transactionHash, data: { noteId } }
    = await contract.postNote(selectCharacter, { title, content, tags }, { locked }))
}
</script>

<template>
  <div class="space-y-2">
    <a-input v-model="title" placeholder="Title (optional)" />

    <Editor
      :value="content" :plugins="plugins"
      class="w-full"
      @change="handleChange"
    />

    <div class="flex flex-row space-x-4">
      <a-input-tag v-model="tags" placeholder="Tags (optional)" allow-clear />

      <a-checkbox v-model="locked">
        Locked
      </a-checkbox>

      <a-select v-model="selectCharacter" placeholder="Select character" style="width: 16rem">
        <a-option v-for="i of listCharacters" :key="i.characterId" :value="i.characterId">
          {{ i.handle }}
        </a-option>
      </a-select>

      <a-button type="primary" @click="publish">
        Publish
      </a-button>
    </div>
  </div>

  <div v-if="noteId" class="flex flex-col text-lg mt-6">
    Published successfully.
    <RouterLink :to="`/note/${noteId}`">
      View note {{ noteId }}
    </RouterLink>

    <div>
      Transaction: <a :href="`https://scan.crossbell.io/tx/${transactionHash}`">
        <code>{{ transactionHash }}</code>
      </a>
    </div>
  </div>
</template>

<style>
@import 'bytemd/dist/index.css';

.bytemd {
  z-index: 50;
}
</style>
