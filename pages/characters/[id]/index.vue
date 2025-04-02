<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const characterId = route.params.id;

</script>

<template>

  <div>
    Character {{characterId}}
    TODO
    - Edit Character
    - Show actor
    - Show Sketches
  </div>
</template>