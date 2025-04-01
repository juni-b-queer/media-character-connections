<script setup lang="ts">
import { ref, onMounted } from 'vue';

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  seasonId: z.number(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  seasonId: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)

  const resp = await $fetch('/api/episodes')
}

const data = ref([]);

onMounted(() => {
});
</script>

<template>

  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Season" name="season">
      <UInput v-model="state.seasonId" />
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>