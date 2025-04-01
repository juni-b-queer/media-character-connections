<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router

// State for seasons
const seasons = ref([]);
const loading = ref(true);
const error = ref(null);

const router = useRouter(); // Initialize Vue Router

// Navigate when a row is clicked
const goToSeason = (row) => {
  console.log(row.getValue('id'))
  router.push(`/seasons/${row.getValue('id')}`); // Navigate to the appropriate season page
};

// Fetch seasons from the API
// const fetchSeasons = async () => {
//   try {
//     const response = await $fetch('/api/seasons');
//
//     console.log(response)
//     seasons.value = response; // Assign the fetched data
//   } catch (err) {
//     error.value = err.message || 'Failed to load seasons';
//   } finally {
//     loading.value = false;
//   }
// };

const columns = [
  {
    accessorKey: 'id',
    header: 'Season #',
  },
  {
    accessorKey: 'releaseYear',
    header: 'Release Year',
  }
]

onMounted(() => {
  // fetchSeasons(); // Fetch data once the component is mounted
});
</script>

<template>

    <div>
      <!-- Updated UTable usage -->
      <DisplayTable
          header="Seasons"
          :columns="columns"
          rowPath="/seasons"
          dataPath="/api/seasons"
      />
    </div>
</template>