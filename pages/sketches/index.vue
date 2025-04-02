<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router
import {sketchesColumns} from "~/components/columns.vue";
const columns = sketchesColumns;


onMounted(() => {
  // fetchSeasons(); // Fetch data once the component is mounted
});
</script>

<template>

  <div>
    <!-- Updated UTable usage -->
    <DisplayTable
        header="Sketches"
        rowPath="/sketches"
        :columns="columns"
        dataPath="/api/sketches"
        :can-add="true"
    />
    TODO
    - Show nodes with sketches and characters
  </div>
</template>