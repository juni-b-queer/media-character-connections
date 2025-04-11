<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import {onMounted} from "vue";
import {actor} from "../../../server/database/schema";
import NotesTable from "~/components/Tables/NotesTable.vue";
const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const actorId = route.params.id;

const actor = ref(null);
onMounted(async () =>{
  actor.value = await $fetch(`/api/actors/${actorId}`);
})
</script>

<template>

  <div>
    <h1 class="text-3xl font-bold pb-3"> Actor {{actor?.name}}</h1>



    <NotesTable :notable-id="parseInt(actorId)" :notable-type="'actor'" />
    TODO
    - Edit actor
    - Show all characters
  </div>
</template>