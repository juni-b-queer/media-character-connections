<script lang="ts">
import {defineComponent} from 'vue'
import {noteColumns, noteSchema} from "~/components/schema";

export default defineComponent({
  name: "NotesTable",
  computed: {
    noteSchema() {
      return noteSchema
    },
    noteColumns() {
      return noteColumns
    }
  },
  props: {
    notableType: String,
    notableId: Number,
  },
  data(){
    return {
      notes: [],

    }
  },
  methods:{
    async getNotes(){
      this.notes = await $fetch(`/api/notes/${this.notableType}/${this.notableId}`)
      // console.log(resp)
    },
    async onNoteAdded(data, other) {
      await this.getNotes()
    }
  },
  async mounted(){
    await this.getNotes()
  },
})
</script>

<template>
<div>
  <div class="table-header flex items-center justify-between">
    <h1 class="text-xl"> Notes </h1>

    <AddEntityModal
        title="Add Note"
        post-url="/api/notes"
        :schema="noteSchema"
        :default-state="{ notableType: notableType, notableId: notableId, note: '' }"
        @submitted="onNoteAdded"
    />

  </div>
  <DisplayTable
      :columns="noteColumns"
      :row-data="notes"
      ref="notesTableRef"
  />
</div>
</template>

<style scoped>

</style>