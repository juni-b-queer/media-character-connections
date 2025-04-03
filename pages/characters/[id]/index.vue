<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import {characterConnectionSchema, characterSchema} from "~/components/schema";
import {ref, onMounted} from "vue";
import {characterConnectionColumns} from "~/components/columns.vue";
const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const characterId = route.params.id;
const character = ref(null);

const characterConnetionTableRef = ref(null)
async function onCharacterConnectionAdded(data) {
  console.log("Entity added successfully:", data);
  if (characterConnetionTableRef.value) {
    await characterConnetionTableRef.value.fetchData();
  }
}

onMounted(async () =>{
  character.value = await $fetch(`/api/characters/${characterId}`);
})

</script>

<template>

  <div>
    <h1 class="text-xl font-bold"> {{character?.name}} </h1>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> Connections </h1>
      <AddEntityModal
          title="Add Connection"
          post-url="/api/character-connections"
          :schema="characterConnectionSchema"
          :default-state="{ sourceCharacterId: characterId, connectionType: '' }"
          :additional-fields-api="{ targetCharacterId: '/api/characters', sketchId: '/api/sketches' }"
          @submitted="onCharacterConnectionAdded"
      />


    </div>
    <DisplayTable
        header="Character Connections"
        :columns="characterConnectionColumns"
        :data-path="`/api/characters/${characterId}/connections`"
        ref="characterConnetionTableRef"
    />
    Character {{characterId}}
    TODO
    - Edit Character
    - Show actor
    - Show Sketches
  </div>
</template>