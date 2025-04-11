<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {seasonsColumns} from "~/components/columns.vue"; // Import Vue Router

// State for seasons

const router = useRouter(); // Initialize Vue Router


onMounted(() => {
  // fetchSeasons(); // Fetch data once the component is mounted
});
</script>

<template>

    <div>
      <!-- Updated UTable usage -->
      <DisplayTable
          header="Seasons"
          :columns="seasonsColumns"
          rowPath="/seasons"
          dataPath="/api/seasons"
      />
    </div>
</template>