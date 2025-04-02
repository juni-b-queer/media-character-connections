<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import {sketchesColumns, writerColumns} from "~/components/columns.vue"; // Import Vue Router
import {sketchSchema, writerSchema} from "~/components/schema";

const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const episodeId: string = route.params.id;


const sketchesTableRef = ref(null);
const writersTableRef = ref(null);


async function onSketchAdded(data) {

  if (sketchesTableRef.value) {
    await sketchesTableRef.value.fetchData();
  }
}

async function onWriterUpdatedAdded(data) {

  console.log(data.form)
  console.log(data.response)

  await $fetch(`/api/writers/${data.response.id}/add-to-episode`,
      {
        method: 'POST',
        body: {
          episodeId: parseInt(episodeId)
        }
      })

  if (writersTableRef.value) {
    await writersTableRef.value.fetchData();
  }
}
</script>

<template>

  <div>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> Sketches </h1>
      <AddEntityModal
          title="Add Sketch"
          post-url="/api/sketches"
          :schema="sketchSchema"
          :default-state="{ episodeId: parseInt(episodeId), name: '', runtime: 0, sketchNumberInEpisode: 0 }"
          @submitted="onSketchAdded"
      />


    </div>
    <DisplayTable
        row-path="/sketches"
        :columns="sketchesColumns"
        :data-path="`/api/episodes/${episodeId}/sketches`"
        ref="sketchesTableRef"
    />
    <!-- Updated UTable usage -->
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> Writers </h1>
      <AddEntityModal
          title="Add Writer"
          post-url="/api/writers"
          :schema="writerSchema"
          :default-state="{ name: '', avatarUrl: '' }"
          @submitted="onWriterUpdatedAdded"
      />


    </div>
        <DisplayTable
            rowPath="/writers"
            :columns="writerColumns"
            :dataPath="`/api/episodes/${episodeId}/writers`"
            ref="writersTableRef"
        />
    TODO
    - Edit Episode
    - Writer autocomplete in form
  </div>
</template>