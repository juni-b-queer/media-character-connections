<script lang="ts">
import {defineComponent} from 'vue'
import {seasonsColumns} from "~/components/columns.vue";
import {
  mapEpisodeNodesAndEdges,
  mapSeasonsNodes,
  mapWriterNodesAndEdges
} from "~/components/networkDiagrams/nodeAndEdgeMappingFunctions";

export default defineComponent({
  name: "temp",
  computed: {
    seasonsColumns() {
      return seasonsColumns
    }
  },
  data() {
    return {
      ready: false,
      nodes: [],
      edges: [],
      seasons: [],
      episodes: [],
      writers: [],
      filters: {
        showWriters: true,
      },
      checkboxes: [
        {
          key: 'showWriters', default: true, label: "Show Episode Writers", value: true
        },
      ]
    };
  },

  methods: {
    async fetchAll() {
      const data = await $fetch('/api/nodes')
      this.seasons = data.seasons
      this.episodes = data.episodes
      this.writers = data.writers

    },

    mapAll(){
      this.nodes = []
      this.edges = []
      const newSeasonElements = mapSeasonsNodes(this.seasons);
      this.pushUnique(newSeasonElements.nodes, newSeasonElements.edges)
      const newEpisodeElements = mapEpisodeNodesAndEdges(this.episodes);
      this.pushUnique(newEpisodeElements.nodes, newEpisodeElements.edges)

      if(this.filters.showWriters){
        const newWriterElements = mapWriterNodesAndEdges(this.writers);
        this.pushUnique(newWriterElements.nodes, newWriterElements.edges)

      }

    },
    pushUnique(newNodes, newEdges){
      this.nodes = this.nodes.concat(newNodes)
      this.edges = this.edges.concat(newEdges)
    },
    onCheckboxUpdate(key) {
      this.filters[key] = !this.filters[key];
      const checkbox = this.checkboxes.find(cb => cb.key === key);
      if (checkbox) {
        this.checkbox = this.filters[key];
      }
      this.mapAll()
    }
  },
  async beforeMount() {
    await this.fetchAll()
    // await this.getSeasons()
    this.mapAll()
    // this.ready = true
  }
})
</script>

<template>

  <div>
    <h1 class="text-3xl font-bold pb-3"> Seasons </h1>

    <!-- Updated UTable usage -->
    <DisplayTable
        header="Seasons"
        :columns="seasonsColumns"
        rowPath="/seasons"
        dataPath="/api/seasons"
    />

    <StandardDiagram :nodes="nodes" :edges="edges" @updateCheckbox="onCheckboxUpdate" :checkboxes="checkboxes"/>

  </div>
</template>

<style scoped>

</style>