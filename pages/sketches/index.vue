<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router
import {sketchesColumns} from "~/components/columns.vue";
const columns = sketchesColumns;
// const columns = [
//   {
//     accessorKey: 'episodeId',
//     header: 'Episode Number',
//   },
//   {
//     accessorKey: 'episodeNumberInSeason',
//     header: 'Order In Season',
//   },
//   {
//     accessorKey: 'sketches',
//     header: '# of Sketches',
//     cell: (row) => row.getValue('sketches').length.toString(),
//   },
//   {
//     accessorKey: 'title',
//     header: 'Title',
//   }
// ]

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
  </div>
</template>