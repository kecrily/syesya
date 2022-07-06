<script setup lang="ts">
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import { CharacterEntity, contract, indexer } from '~/composables/crossbell'
import { useStore } from '~/stores/wallet'

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
await indexer.getCharacters(address.value).then((res) => { listCharacters = res.list })

let transactionHash = $ref('')
let noteId: number = $ref()
async function publish() {
  await contract.connect()

  await contract.postNote(selectCharacter, { title, content, tags }, { locked })
    .then((res) => {
      transactionHash = res.transactionHash
      noteId = res.data.noteId
    })
}
</script>

<template>
  <div class="flex">
    <div class="w-5/6 mx-auto">
      <a-space size="medium" direction="vertical" fill>
        <a-input v-model="title" placeholder="Title (optional)" />

        <Editor
          :value="content" :plugins="plugins"
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
      </a-space>

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
    </div>
  </div>
</template>

<style>
@import 'bytemd/dist/index.css';

div {
  display: block;
}
</style>
