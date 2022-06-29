<script setup lang="ts">
import { contract } from '~/composables/crossbell'
import { useStore } from '~/stores/wallet'

const store = useStore()
const { hasProfile, address } = storeToRefs(store)

const form = reactive({
  address: address.value,
  handle: '',
})

async function createProfile() {
  return await contract.createProfile(form.address, form.handle)
}

</script>

<template>
  <template v-if="!hasProfile">
    <div class="font-bold text-xl mb-10">
      You need to create a profile before writing.
    </div>

    <a-form :model="form" auto-label-width @submit="createProfile">
      <a-form-item field="address" label="Address" required hide-asterisk disabled>
        <a-input v-model="form.address" placeholder="your wallet address" />
      </a-form-item>
      <a-form-item field="handle" label="Handle" required hide-asterisk>
        <a-input v-model="form.handle" placeholder="profile handle" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </template>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
