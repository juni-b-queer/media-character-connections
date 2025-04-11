<template>
  <div>
    <h1 class="text-3xl font-bold pb-3"> Visualization</h1>

    <CustomDiagram :nodes="nodes" :edges="edges" @updateCheckbox="onCheckboxUpdate" :checkboxes="checkboxes" :save-data="true"/>
<!--    <UCard>-->
<!--      nodes-->
<!--      {{JSON.stringify(nodes, null, 2)}}-->
<!--    </UCard>-->
<!--    <UCard>-->
<!--      edges-->
<!--      {{JSON.stringify(edges, null, 2)}}-->
<!--    </UCard>-->
<!--    <UCard>-->
<!--      Seasons-->
<!--      {{JSON.stringify(seasons, null, 2)}}-->
<!--    </UCard>-->
<!--    <UCard>-->
<!--      Episodes-->
<!--      {{JSON.stringify(episodes, null, 2)}}-->
<!--    </UCard>-->
<!--    <UCard>-->
<!--      Sketches-->
<!--      {{JSON.stringify(sketches, null, 2)}}-->
<!--    </UCard>-->
<!--    <UCard>-->
<!--      Characters-->
<!--      {{JSON.stringify(characters, null, 2)}}-->
<!--    </UCard>-->
<!--    <UCard>-->
<!--      Actors-->
<!--      {{JSON.stringify(actors, null, 2)}}-->
<!--    </UCard>-->
<!--    <UCard>-->
<!--      Writers-->
<!--      {{JSON.stringify(writers, null, 2)}}-->
<!--    </UCard>-->
  </div>

</template>

<script>


import {mapSketchNode} from "~/components/diagramMapping.js";
import {
  mapActorNodesAndEdges,
  mapCharacterConnectionEdges,
  mapCharacterNodesAndEdges,
  mapEpisodeNodesAndEdges,
  mapSeasonsNodes,
  mapSketchNodesAndEdges, mapWriterNodesAndEdges
} from "~/components/networkDiagrams/nodeAndEdgeMappingFunctions.js";
import {filterBrokenEdges, filterById, positionNodes} from "~/components/networkDiagrams/nodePositioning.js";
import CustomDiagram from "~/components/networkDiagrams/CustomDiagram.vue";

export default {
  components: {CustomDiagram},
  data() {
    return {
      ready: false,
      nodes: [],
      edges: [],
      seasons: [],
      episodes: [],
      writers: [],
      sketches: [],
      characters: [],
      actors: [],
      connections: [],
      filters: {
        showConnections: false,
        showWriters: true,
        showActors: true,
      },
      checkboxes: [
        {
          key: 'showConnections', default: false, label: "Show Character Connections", value: false
        },
        {
          key: 'showWriters', default: true, label: "Show Episode Writers", value: true
        },
        {
          key: 'showActors', default: true, label: "Show Actors", value: true
        }
      ]
    };
  },

  methods: {
    async fetchAll() {
      const data = await $fetch('/api/nodes')
      this.seasons = data.seasons
      this.episodes = data.episodes
      this.sketches = data.sketches
      this.writers = data.writers
      this.sketches = data.sketches
      this.characters = data.characters
      this.actors = data.actors
      this.connections = data.connections

    },

    mapAll(){
      this.nodes = []
      this.edges = []
      const newSeasonElements = mapSeasonsNodes(this.seasons);
      this.pushUnique(newSeasonElements.nodes, newSeasonElements.edges)
      const newEpisodeElements = mapEpisodeNodesAndEdges(this.episodes);
      this.pushUnique(newEpisodeElements.nodes, newEpisodeElements.edges)
      const newSketchElements = mapSketchNodesAndEdges(this.sketches);
      this.pushUnique(newSketchElements.nodes, newSketchElements.edges)
      const newCharacterElements = mapCharacterNodesAndEdges(this.characters);
      this.pushUnique(newCharacterElements.nodes, newCharacterElements.edges)

      // if(this.filters.showWriters){
      //   const newWriterElements = mapWriterNodesAndEdges(this.writers);
      //   this.pushUnique(newWriterElements.nodes, newWriterElements.edges)
      //
      // }
      // if(this.filters.showConnections){
      //   const newConnectionElements = mapCharacterConnectionEdges(this.connections);
      //   this.pushUnique(newConnectionElements.nodes, newConnectionElements.edges)
      // }
      // if(this.filters.showActors){
      //   const newActorElements = mapActorNodesAndEdges(this.actors, this.characters)
      //   this.pushUnique(newActorElements.nodes, newActorElements.edges)
      // }

      this.nodes = filterById(this.nodes)

      this.edges = filterBrokenEdges(this.nodes, this.edges)
      this.nodes = positionNodes(this.nodes, this.edges)

    },
    pushUnique(newNodes, newEdges){
      this.nodes = this.nodes.concat(newNodes)
      this.edges = this.edges.concat(newEdges)
    },
    onCheckboxUpdate(key) {
      this.filters[key] = !this.filters[key];
      this.mapAll()
    }
  },
  async beforeMount() {
    await this.fetchAll()
    // await this.getSeasons()
    this.mapAll()
    // this.ready = true
  }
};
</script>

<style>
</style>
