<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router
import {sketchesColumns} from "../../components/columns.vue";
import {sketchSchema} from "~/components/schema";
const columns = sketchesColumns;


const sketchesTableRef = ref(null)
async function onSketchAdded(data) {
  console.log("Entity added successfully:", data);
  if (sketchesTableRef.value) {
    await sketchesTableRef.value.fetchData();
  }
}


</script>

<template>

  <div>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-3xl font-bold"> Sketches </h1>
      <AddEntityModal
          title="Add Sketch"
          post-url="/api/sketches"
          :schema="sketchSchema"
          :default-state="{ name: '', runtime: 0, sketchNumberInEpisode: 0, episodeId: 0, location: '' }"
          :additional-fields-api="{ episodeId: '/api/episodes' }"
          @submitted="onSketchAdded"
      />


    </div>
    <!-- Updated UTable usage -->
    <DisplayTable
        header="Sketches"
        rowPath="/sketches"
        :columns="columns"
        dataPath="/api/sketches"
        :can-add="true"
        ref="sketchesTableRef"
    />
    TODO
    - Show nodes with sketches and characters
  </div>
</template>