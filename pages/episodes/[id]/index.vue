<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import {sketchesColumns, writersColumns} from "~/components/columns.vue"; // Import Vue Router
import * as z from 'zod'

const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const episodeId = route.params.id;

const addSketchOpen = ref(false)
const addWriterOpen = ref(false)
const newWriter = ref(true)


const sketchesTableRef = ref(null);
const writersTableRef = ref(null);




const sketchSchema = z.object({
  episodeId: z.number(),
  runtime: z.number(),
  sketchNumberInEpisode: z.number()
})

type SketchSchema = z.output<typeof sketchSchema>

const sketchState = reactive<Partial<SketchSchema>>({
  episodeId: episodeId,
  runtime: undefined,
  sketchNumberInEpisode: undefined,
  name: undefined,

})

async function onSketchSubmit(event) {
  const resp = await $fetch('/api/sketches',
      {
        method: 'POST',
        body: {
          episodeId: sketchState.episodeId,
          sketchNumberInEpisode: sketchState.sketchNumberInEpisode,
          runtime: sketchState.runtime,
          name: sketchState.name
        }
      })

  addSketchOpen.value = false
  sketchState.runtime = undefined
  sketchState.sketchNumberInEpisode = undefined
  sketchState.name = undefined

  if (sketchesTableRef.value) {
    await sketchesTableRef.value.fetchData();
  }

}


const newWriterSchema = z.object({
  name: z.string(),
  episodeId: z.number()
})

type NewWriterSchema = z.output<typeof newWriterSchema>

const newWriterState = reactive<Partial<NewWriterSchema>>({
  name: undefined,
  episodeId: episodeId

})

async function onNewWriterSubmit(event) {
  const writerResp = await $fetch('/api/writers',
      {
        method: 'POST',
        body: {
          name: newWriterState.name
        }
      })

  const resp = await $fetch(`/api/writers/${writerResp[0].id}/add-to-episode`,
      {
        method: 'POST',
        body: {
          episodeId: newWriterState.episodeId
        }
      })

  addWriterOpen.value = false
  newWriterState.name = undefined
  if (writersTableRef.value) {
    await writersTableRef.value.fetchData();
  }
}
</script>

<template>

  <div>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> Sketches </h1>

      <UModal title="Add Sketch" v-model:open="addSketchOpen">
        <UButton>
          <UIcon name="i-lucide-badge-plus" size="1.5rem" class="cursor-pointer"/>
        </UButton>
        <template #body>
          <UForm :schema="sketchSchema" :state="sketchState" class="space-y-4">
            <UFormField label="Sketch name" name="name">
              <UInput v-model="sketchState.name"/>
            </UFormField>
            <UFormField label="Runtime (seconds)" name="runtime">
              <UInput v-model="sketchState.runtime" type="number"/>
            </UFormField>

            <UFormField label="Order in episode" name="order">
              <UInput v-model="sketchState.sketchNumberInEpisode" type="number"/>
            </UFormField>

            <UButton @click="onSketchSubmit">
              Add
            </UButton>
          </UForm>
        </template>
      </UModal>
    </div>
    <DisplayTable
        rowPath="/sketches"
        :columns="sketchesColumns"
        :dataPath="`/api/episodes/${episodeId}/sketches`"
        ref="sketchesTableRef"
    />
    <!-- Updated UTable usage -->
        <div class="table-header flex items-center justify-between" >
          <h1 class="text-xl font-bold"> Writers </h1>
          <UModal title="Add Writer" v-model:open="addWriterOpen">
            <UButton>
              <UIcon name="i-lucide-badge-plus" size="1.5rem" class="cursor-pointer"/>
            </UButton>
            <template #body>
              <UForm v-if="newWriter" :schema="newWriterSchema" :state="newWriterState" class="space-y-4">
                <UFormField label="Name" name="name">
                  <UInput v-model="newWriterState.name"/>
                </UFormField>

                <UButton @click="onNewWriterSubmit">
                  Create and Add
                </UButton>
              </UForm>
            </template>
          </UModal>
        </div>
        <DisplayTable
            rowPath="/writers"
            :columns="writersColumns"
            :dataPath="`/api/episodes/${episodeId}/writers`"
            ref="writersTableRef"
        />
  </div>
</template>