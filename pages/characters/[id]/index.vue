<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import {characterConnectionSchema, characterFormConfig, characterSchema} from "~/components/schema";
import {ref, onMounted} from "vue";
import {characterConnectionColumns} from "../../../components/columns.vue";
import NotesTable from "~/components/Tables/NotesTable.vue";
import EntityForm from "~/components/forms/EntityForm.vue";
const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const characterId = route.params.id;
const character = ref(null);
const isEditing = ref(false);

const characterConnetionTableRef = ref(null)
async function onCharacterConnectionAdded(data) {
  console.log("Entity added successfully:", data);
  if (characterConnetionTableRef.value) {
    await characterConnetionTableRef.value.fetchData();
  }
}

function editorMounted(data){
  character.value = data.entity;
  isEditing.value = false;
}

</script>

<template>

  <div>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> {{character?.name}} ( Played by <ULink :to="`/actors/${character?.actorId}`" >{{character?.actor?.name}}</Ulink> )</h1>

    <UButton v-if="!isEditing" @click="isEditing = true">Edit Character</UButton>
    </div>
    <EntityForm v-show="isEditing" title="Edit Character" :entity-id="parseInt(characterId)" :validation-schema="characterSchema" api-url="/api/characters" :form-config="characterFormConfig" @submitted="editorMounted" @mounted="editorMounted"/>

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

    <NotesTable :notable-id="parseInt(characterId)" :notable-type="'character'" />
    Character {{characterId}}
    TODO
    - Edit Character
    - Show actor
    - Show Sketches
  </div>
</template>