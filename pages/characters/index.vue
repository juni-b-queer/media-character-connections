<script setup lang="ts">
import {characterColumns} from "~/components/columns.vue";
import * as z from "zod";
import {ref} from "vue";
import {characterSchema} from "~/components/schema";

const columns = characterColumns;

const charactersTableRef = ref(null)
async function onCharacterUpdatedAdded(data) {
  console.log("Entity added successfully:", data);
  if (charactersTableRef.value) {
    await charactersTableRef.value.fetchData();
  }
}
</script>

<template>
  <div>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> Characters </h1>
      <AddEntityModal
          title="Add Character"
          post-url="/api/characters"
          :schema="characterSchema"
          :default-state="{ name: '', avatarUrl: '', actorId: 0 }"
          :additional-fields-api="{ actorId: '/api/actors' }"
          @submitted="onCharacterUpdatedAdded"
      />


    </div>
    <DisplayTable
        header="Characters"
        :columns="columns"
        data-path="/api/characters"
        ref="charactersTableRef"
    />
    TODO
    - Show all character relationships
  </div>
</template>