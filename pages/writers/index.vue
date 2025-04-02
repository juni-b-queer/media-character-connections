<script setup lang="ts">
import {writerColumns} from "~/components/columns.vue";
import {writerSchema} from "~/components/schema";

const columns = writerColumns;
const writersTableRef = ref(null)
async function onWriterUpdatedAdded(data) {
  console.log("Entity added successfully:", data);
  if (writersTableRef.value) {
    await writersTableRef.value.fetchData();
  }
}
</script>

<template>
  <div>
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
        header="Writers"
        :columns="columns"
        dataPath="/api/writers"
        ref="writersTableRef"
    />
  </div>
</template>