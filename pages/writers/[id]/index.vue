<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const writerId = route.params.id;

</script>

<template>

  <div>
    Writer {{writerId}}
    TODO
    - Show all episodes
  </div>
</template>