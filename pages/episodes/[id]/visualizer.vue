<script lang="ts">
import {defineComponent} from 'vue'
import {sketchSchema, writerSchema} from "~/components/schema";
import NotesTable from "~/components/Tables/NotesTable.vue";
import {sketchesColumns, writerColumns} from "~/components/columns.vue";
import CustomDiagram from "~/components/networkDiagrams/CustomDiagram.vue";
import {
  mapActorNodesAndEdges,
  mapCharacterConnectionEdges,
  mapCharacterNodesAndEdges, mapEpisodeNodesAndEdges,
  mapSketchNodesAndEdges
} from "~/components/networkDiagrams/nodeAndEdgeMappingFunctions";
import {filterBrokenEdges, positionNodes} from "~/components/networkDiagrams/nodePositioning";

export default defineComponent({
  name: "visualizer",
  components: {CustomDiagram, NotesTable},
  data() {
    return {
      episodeId: this.$route.params.id,
      episode: null,
      sketches: [],
      writers: [],
      characters: [],
      actors: [],
      connections: [],
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
  methods: {
    async getEpisode() {
      this.episode = await $fetch(`/api/episodes/${this.episodeId}`)
      this.sketches = this.episode.sketches
      this.writers = this.episode.writers

      this.sketches.forEach(sketch => {
        sketch.characters.forEach(character => {
          this.characters = this.characters.concat([character])
        })
      })
    },
    pushUnique(newNodes, newEdges) {
      this.nodes = this.nodes.concat(newNodes)
      this.edges = this.edges.concat(newEdges)
    },
    onCheckboxUpdate(key) {
      this.filters[key] = !this.filters[key];
      this.mapAll()
    },
    mapAll() {
      this.nodes = []
      this.edges = []
      const newEpisodeElements = mapEpisodeNodesAndEdges([this.episode]);
      this.pushUnique(newEpisodeElements.nodes, newEpisodeElements.edges)
      const newSketchElements = mapSketchNodesAndEdges(this.sketches);
      this.pushUnique(newSketchElements.nodes, newSketchElements.edges)
      const newCharacterElements = mapCharacterNodesAndEdges(this.characters);
      this.pushUnique(newCharacterElements.nodes, newCharacterElements.edges)
      // if (this.filters.showConnections) {
      //   const newConnectionElements = mapCharacterConnectionEdges(this.characters.map(c => [...c.toConnection]).flat());
      //   this.pushUnique(newConnectionElements.nodes, newConnectionElements.edges)
      // }
      // if (this.filters.showActors) {
      //   const newActorElements = mapActorNodesAndEdges(this.characters.map(c => [c.actor]).flat().filter(a => a !== null), this.characters)
      //   this.pushUnique(newActorElements.nodes, newActorElements.edges)
      // }
      this.nodes = this.filterUniqueById(this.nodes)

      // this.edges = filterBrokenEdges(this.nodes, this.edges)
      // this.nodes = positionNodes(this.nodes, this.edges)

    },
    filterUniqueById(nodes): [] {
  const seenIds = new Set();
  return nodes.filter(item => {
    if (seenIds.has(item.data.id)) {
      return false;
    }
    seenIds.add(item.data.id);
    return true;
  })
}


},
  computed: {
    writerSchema() {
      return writerSchema
    },
    writerColumns() {
      return writerColumns
    },
    sketchSchema() {
      return sketchSchema
    },
    sketchesColumns() {
      return sketchesColumns
    }
  },
  async mounted() {
    await this.getEpisode()
    this.mapAll()
    // await this.getSketches()
    // await this.getWriters()
  }
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold pb-3"> Episode {{ episodeId }}</h1>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl font-bold"> Sketches </h1>
      <AddEntityModal
          title="Add Sketch"
          post-url="/api/sketches"
          :schema="sketchSchema"
          :default-state="{ episodeId: parseInt(episodeId), name: '', runtime: 0, sketchNumberInEpisode: 0, location: '' }"
          @submitted="getEpisode"
      />


    </div>
    <DisplayTable
        row-path="/sketches"
        :columns="sketchesColumns"
        :row-data="sketches"
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
          @submitted="getEpisode"
      />


    </div>
    <DisplayTable
        rowPath="/writers"
        :columns="writerColumns"
        :row-data="writers"
        ref="writersTableRef"
    />

    <NotesTable :notable-id="parseInt(episodeId)" :notable-type="'episode'"/>
        <CustomDiagram :nodes="nodes" :edges="edges" @updateCheckbox="onCheckboxUpdate" :checkboxes="checkboxes"/>

  </div>
</template>

<style scoped>

</style>