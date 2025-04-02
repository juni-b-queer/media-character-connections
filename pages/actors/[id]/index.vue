<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const actorId = route.params.id;

</script>

<template>

  <div>
    Actor {{actorId}}
    TODO
    - Edit actor
    - Show all characters
  </div>
</template>