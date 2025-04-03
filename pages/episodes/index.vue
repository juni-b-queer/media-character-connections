<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router

const columns = [
  {
    accessorKey: 'episodeNumber',
    header: 'Episode Number',
  },
  {
    accessorKey: 'episodeNumberInSeason',
    header: 'Order In Season',
  },
  {
    accessorKey: 'sketches',
    header: '# of Sketches',
    cell: (row) => row.getValue('sketches').length.toString(),
  },
  {
    accessorKey: 'title',
    header: 'Title',
  }
]

onMounted(() => {
  // fetchSeasons(); // Fetch data once the component is mounted
});

</script>

<template>
<div>


  <div class="table-header flex items-center justify-between">
    <h1 class="text-xl font-bold"> Episodes </h1>
  </div>
    <!-- Updated UTable usage -->
    <DisplayTable
        header="Episodes"
        rowPath="/episodes"
        :columns="columns"
        dataPath="/api/episodes"
    />

    TODO
    - Update Columns
    - Show episodes with sketches and characters

</div>
</template>