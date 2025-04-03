<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import {onMounted} from "vue";
import {actor} from "../../../server/database/schema";
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
    Actor {{actor.name}}
    TODO
    - Edit actor
    - Show all characters
  </div>
</template>