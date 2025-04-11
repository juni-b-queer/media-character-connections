<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import NotesTable from "~/components/Tables/NotesTable.vue";
const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const writerId = route.params.id;

</script>

<template>

  <div>
    Writer {{writerId}}
    <NotesTable :notable-id="parseInt(writerId)" :notable-type="'writer'" />
    TODO
    - Show all episodes
  </div>
</template>