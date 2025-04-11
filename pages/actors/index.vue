<script setup lang="ts">
import {actorColumns} from "../../components/columns.vue";
import {actorSchema} from "~/components/schema";

const columns = actorColumns;
const actorsTableRef = ref(null)
async function onActorUpdatedAdded(data) {
  console.log("Entity added successfully:", data);
  if (actorsTableRef.value) {
    await actorsTableRef.value.fetchData();
  }
}

</script>

<template>
  <div>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-3xl font-bold"> Actors </h1>
      <AddEntityModal
          title="Add Writer"
          post-url="/api/writers"
          :schema="actorSchema"
          :default-state="{ name: '', avatarUrl: '' }"
          @submitted="onActorUpdatedAdded"
      />

    </div>
    <DisplayTable
        header="Actors"
        row-path="/actors"
        :columns="columns"
        data-path="/api/actors"
        ref="actorsTableRef"
    />
  </div>
</template>