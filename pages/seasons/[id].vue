<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NotesTable from "~/components/Tables/NotesTable.vue";

// Initialize route to get the season ID from the URL
const route = useRoute();

// Get the `id` parameter from the route
const seasonId = route.params.id;
console.log(seasonId)

// State for the season
const season = ref(null);
const loading = ref(true);
const error = ref(null);

// Fetch the season data from the API
const fetchSeason = async () => {
  try {
    const response = await $fetch(`/api/seasons/${seasonId}/episodes`); // Use the route param `id` to fetch the season
    console.log(response)
    season.value = response; // Assign the fetched data
  } catch (err) {
    error.value = err.message || 'Failed to load season';
  } finally {
    loading.value = false;
  }
};

const columns = [
  {
    accessorKey: 'episodeNumberInSeason',
    header: 'Episode #',
    cell: (row) => row.getValue('episodeNumberInSeason'),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (row) => row.getValue('title'),
  },
  {
    accessorKey: 'sketches',
    header: '# Sketchs',
    cell: (row) => row.getValue('sketches').length.toString(),
  },
]

onMounted(() => {
  fetchSeason(); // Fetch the season data when the component is mounted
});
</script>

<template>
  <div>

    <h1 class="text-3xl font-bold pb-3"> Season {{seasonId}}</h1>


    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> Episodes In Season {{ seasonId }}</h1>
    </div>
      <DisplayTable
          :header="`Episodes In Season ${seasonId}`"
          :columns="columns"
          rowPath="/episodes"
          :dataPath="`/api/seasons/${seasonId}/episodes`"
      />

    <NotesTable :notable-id="parseInt(seasonId)" :notable-type="'season'" />
    TODO
    - Show season specific graph
  </div>
</template>