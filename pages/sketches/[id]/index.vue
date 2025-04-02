<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import {characterColumns} from "~/components/columns.vue"; // Import Vue Router
import * as z from 'zod'

const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const sketchId = route.params.id;

const addCharacterOpen = ref(false)


const charactersTableRef = ref(null);

const sketch = ref(null)

const getSketch= async () => {
  sketch.value = await $fetch(`/api/sketches/${sketchId}`)
}



const characterSchema = z.object({
  name: z.string(),
  actorId: z.number()
})

type CharacterSchema = z.output<typeof characterSchema>

const characterState = reactive<Partial<SketchSchema>>({
  name: undefined,
  actorId: undefined,
  sketchId: sketchId

})

async function onCharacterSubmit(event) {
  const charResp = await $fetch('/api/characters',
      {
        method: 'POST',
        body: {
          name: characterState.name,
          actorId: characterState.actorId
        }
      })

  const resp = await $fetch(`/api/characters/${charResp.id}/add-to-sketch`,
      {
        method: 'POST',
        body: {
          sketchId: characterState.sketchId
        }
      })

  addCharacterOpen.value = false
  characterState.name = undefined
  characterState.actorId = undefined

  if (charactersTableRef.value) {
    await charactersTableRef.value.fetchData();
  }

}

const { data: actors, status } = await useFetch('/api/actors', {
  key: 'id',
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(actor => ({
      label: actor.name,
      value: parseInt(actor.id)
    }))
  },
  lazy: true
})

onMounted(async () => {
  await getSketch()
})
</script>

<template>

  <div>
    <h1 class="text-2xl" v-if="sketch">  {{sketch.name}}</h1>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> Characters </h1>

      <UModal title="Add Character" v-model:open="addCharacterOpen">
        <UButton>
          <UIcon name="i-lucide-badge-plus" size="1.5rem" class="cursor-pointer"/>
        </UButton>
        <template #body>
          <UForm :schema="characterSchema" :state="characterState" class="space-y-4">
            <UFormField label="Name" name="name">
              <UInput v-model="characterState.name"/>
            </UFormField>

            <UFormField label="Actor" name="actor">
              <USelect
                  :items="actors"
                  :loading="status === 'pending'"
                  icon="i-lucide-user"
                  placeholder="Select Actor"
                  class="w-48"
                  value-key="value"
                  v-model="characterState.actorId"
              >
              </USelect>
<!--              <UInput v-model="characterState.actorId" type="number"/>-->
            </UFormField>



            <UButton @click="onCharacterSubmit">
              Add
            </UButton>
          </UForm>
        </template>
      </UModal>
    </div>
    <DisplayTable
        :columns="characterColumns"
        rowPath="/characters"
        :data-path="`/api/sketches/${sketchId}/characters`"
        ref="charactersTableRef"
    />
    TODO
    - Use AddEntityModal
    - Edit sketch
  </div>
</template>