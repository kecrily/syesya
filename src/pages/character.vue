<script setup lang="ts">
import { contract } from '~/composables/crossbell'
import { useStore } from '~/stores/wallet'

const store = useStore()
const { hasCharacter, address } = storeToRefs(store)

const form = reactive({
  address: address.value,
  handle: '',
  avatar: '',
})

let data:number = $ref()
let balance = $ref('')

await contract.getBalance(address.value).then(result => {
  balance = result.data
})

async function createCharacter() {
  await contract.connect()
  await contract.createCharacter(form.address, form.handle, form.avatar).then((result) => {
    data = result.data
    hasCharacter.value = true
  })
}
</script>

<template>
  <template v-if="!hasCharacter">
    <div class="mb-10">
      <div class="font-bold text-xl">
        You need to create a character before writing.
      </div>

      <template v-if="Number(balance) < 0.002">
        <div class="mt-2">
          <div class="block">
            You only have <b>{{ balance }} $CSB</b>, which may not be enough to complete the character creation.
          </div>
          <a-link href="https://faucet.crossbell.io/">
            Get some from Crossbell Faucet.
          </a-link>
        </div>
      </template>
    </div>

    <a-form v-if="!data" :model="form" auto-label-width @submit="createCharacter">
      <a-form-item field="address" label="Address" required hide-asterisk disabled>
        <a-input v-model="form.address" placeholder="your wallet address" />
      </a-form-item>

      <a-form-item
        field="handle" label="Handle" required hide-asterisk
        :rules="[
          { minLength: 3, message: 'Handle must be at least 3 characters' },
          { maxLength: 31, message: 'Handle must be at most 31 characters' },
        ]"
      >
        <a-input v-model="form.handle" placeholder="your character handle" />
      </a-form-item>

      <a-form-item
        field="avatar" label="Avatar" required hide-asterisk
        :rules="[
          { type: 'url', message: 'Avatar need to be a valid URL' },
        ]"
      >
        <a-input v-model="form.avatar" placeholder="your avatar link" />
      </a-form-item>

      <a-form-item>
        <a-button html-type="submit" type="primary">
          Submit
        </a-button>
      </a-form-item>
    </a-form>

    <a-card v-if="form.handle || form.avatar" hoverable>
      <div class="flex flex-row items-center">
        <a-avatar v-if="form.avatar">
          <img alt="avatar" :src="form.avatar">
        </a-avatar>
        <div v-if="form.handle" class="ml-2 text-xl">
          @{{ form.handle }}
        </div>
      </div>
    </a-card>
  </template>

  <template v-if="data">
    <a-button href="/write" type="primary" class="mt-4">
      Go to write
    </a-button>
  </template>
</template>
