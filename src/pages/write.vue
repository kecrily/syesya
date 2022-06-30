<script setup lang="ts">
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import { contract, indexer, ProfileEntity } from '~/composables/crossbell'
import { useStore } from '~/stores/wallet'

const store = useStore()
const { address } = storeToRefs(store)
const router = useRouter()

const plugins = [gfm()]
let content = $ref('')
const handleChange = (v: string) => { content = v }

const title = $ref('')
const tags: string[] = $ref()
const locked = $ref(false)

let listProfiles: ProfileEntity[] = $ref()
const selectProfile = $ref('')
await indexer.getProfiles(address.value).then((res) => { listProfiles = res.list })

let transactionHash = $ref('')
let noteId = $ref('')
async function publish() {
  await contract.postNote(selectProfile, { title, content, tags }, { locked })
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

          <a-select v-model="selectProfile" placeholder="Select profile" style="width: 16rem">
            <a-option v-for="i of listProfiles" :key="i.profileId" :value="i.profileId">
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

<route lang="yaml">
meta:
  layout: home
</route>
