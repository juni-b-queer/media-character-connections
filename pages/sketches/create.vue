<script setup lang="ts">
import { ref, onMounted } from 'vue';

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  episodeId: z.number(),
  order: z.number(),
  runtime: z.number()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  episodeId: undefined,
  order: undefined,
  runtime: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)

  const resp = await $fetch('/api/sketches',
      {
        method: 'POST',
        body: {
          episodeId: state.episodeId,
          sketchNumberInEpisode: state.order,
          runtime: state.runtime
        }
      })
}

const data = ref([]);

onMounted(() => {
});
</script>

<template>

  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Episode" name="episode">
      <UInput v-model="state.episodeId" type="number"/>
    </UFormField>

    <UFormField label="Order In Episode" name="order">
      <UInput v-model="state.order" type="number" />
    </UFormField>

    <UFormField label="Run time (seconds)" name="runtime">
      <UInput v-model="state.runtime" type="number" />
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>