<script lang="ts">
import {defineComponent} from 'vue'
import {characterFormConfig, characterSchema, sketchFormConfig, sketchSchema} from "~/components/schema";
import EntityForm from "~/components/forms/EntityForm.vue";
import {characterColumns} from "~/components/columns.vue";
import {
  mapActorNodesAndEdges,
  mapCharacterConnectionEdges,
  mapCharacterNodesAndEdges,
  mapEpisodeNodesAndEdges,
  mapSeasonsNodes,
  mapSketchNodesAndEdges, mapWriterNodesAndEdges
} from "~/components/networkDiagrams/nodeAndEdgeMappingFunctions";
import CustomDiagram from "~/components/networkDiagrams/CustomDiagram.vue";
import NotesTable from "~/components/Tables/NotesTable.vue";

export default defineComponent({
  name: "visualized",
  components: {NotesTable, CustomDiagram, EntityForm},
  data(){
    return {
      sketchId: this.$route.params.id,
      sketch: null,
      characters: [],
      isEditing: false,
      nodes: [],
      edges: [],
      filters: {
        showConnections: true,
        showActors: true,
      },
      checkboxes: [
        {
          key: 'showConnections', default: true, label: "Show Character Connections", value: true
        },
        {
          key: 'showActors', default: true, label: "Show Actors", value: true
        }
      ]
    }
  },
  methods:{
    editorMounted(data){
      this.sketch = data.entity;
      this.mapAll()
      this.isEditing = false;
    },
    async getCharacters(){
      this.characters = await $fetch(`/api/sketches/${this.sketchId}/characters`)
    },
    async onCharacterAdded(data){
      const resp = await $fetch(`/api/characters/${data.response.id}/add-to-sketch`,
          {
            method: 'POST',
            body: {
              sketchId: this.sketch.id
            }
          })

      await this.getCharacters()
    },
    pushUnique(newNodes, newEdges){
      this.nodes = this.nodes.concat(newNodes)
      this.edges = this.edges.concat(newEdges)
    },
    onCheckboxUpdate(key) {
      this.filters[key] = !this.filters[key];
      this.mapAll()
    },
    mapAll(){
      this.nodes = []
      this.edges = []
      const newSketchElements = mapSketchNodesAndEdges([this.sketch]);
      this.pushUnique(newSketchElements.nodes, newSketchElements.edges)
      const newCharacterElements = mapCharacterNodesAndEdges(this.characters, this.sketch);
      this.pushUnique(newCharacterElements.nodes, newCharacterElements.edges)
      if(this.filters.showConnections){
        const newConnectionElements = mapCharacterConnectionEdges(this.characters.map(c => [...c.toConnection]).flat());
        this.pushUnique(newConnectionElements.nodes, newConnectionElements.edges)
      }
      if(this.filters.showActors){
        const newActorElements = mapActorNodesAndEdges(this.characters.map(c => [c.actor]).flat().filter(a => a !== null), this.characters)
        this.pushUnique(newActorElements.nodes, newActorElements.edges)
      }
    },
  },
  computed: {
    sketchFormConfig() {
      return sketchFormConfig
    },
    sketchSchema() {
      return sketchSchema
    },
    characterFormConfig() {
      return characterFormConfig
    },
    characterSchema() {
      return characterSchema
    },
    characterColumns() {
      return characterColumns
    }
  },
  async mounted(){
    await this.getCharacters()
  }
})
</script>

<template>
  <div>
  <div class="table-header flex items-center justify-between">
    <h1 class="text-xl font-bold"> {{sketch?.name}} </h1>

    <UButton v-if="!isEditing" @click="isEditing = true">Edit Sketch</UButton>
  </div>
  <EntityForm v-show="isEditing" title="Edit Sketch" :entity-id="parseInt(sketchId)" :validation-schema="sketchSchema" api-url="/api/sketches" :form-config="sketchFormConfig" @submitted="editorMounted" @mounted="editorMounted"/>

    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl"> Characters </h1>

      <AddEntityModal
          title="Add Character"
          post-url="/api/characters"
          :schema="characterSchema"
          :default-state="{ name: '', avatarUrl: '', actorId: 0, creditedName: '' }"
          :additional-fields-api="{ actorId: '/api/actors' }"
          @submitted="onCharacterAdded"
      />

    </div>
    <UCard>

    <DisplayTable
        :columns="characterColumns"
        rowPath="/characters"
        :row-data="characters"
        ref="charactersTableRef"
    />
    </UCard>
    <NotesTable :notable-id="parseInt(sketchId)" :notable-type="'sketch'" />
    <CustomDiagram :nodes="nodes" :edges="edges" @updateCheckbox="onCheckboxUpdate" :checkboxes="checkboxes"/>

  </div>
</template>

<style scoped>

</style>