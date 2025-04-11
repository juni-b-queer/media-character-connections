<script>
import { defineComponent } from "vue";
import cytoscape from "cytoscape";
import dagre from 'cytoscape-dagre';
import {basicStyles} from "~/components/diagramStandards.js";
import {filterBrokenEdges, positionNodes} from "~/components/networkDiagrams/nodePositioning.js";

export default defineComponent({
  name: "CustomDiagram",
  props: {
    nodes: {
      type: Array,
      required: true,
    },
    edges: {
      type: Array,
      required: true,
    },
    checkboxes: {
      type: Array,
      default: () => [],
    },
    saveData:{
      type: Boolean,
      default: false,
    }

  },
  emits: ['updateCheckbox'],

  data() {
    return {
      cy: null,
      showMenu: false,
    };
  },
  methods: {
    saveView(){
      if(this.saveData){
        const jsonData = this.cy.json()
        $fetch('/api/views', {
          method: 'POST',
          body: {viewData: jsonData},
        })
      }


      const scale = this.cy.zoom() < 0.5 ? 4 : this.cy.zoom() < 1 ? 3 : 2;
      const pngData = this.cy.png({
        full: false,
        quality: 1,
        bg: '#d8ceb5',
        scale: scale
      })
      const link = document.createElement('a');
      link.href = pngData;
      link.download = 'diagram.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    updateGraph() {
      // const filteredEdges = filterBrokenEdges(this.nodes, this.edges)
      //
      // const positionedNodes = positionNodes(this.nodes, filteredEdges)
      const elements = [
        ...this.nodes,
        ...this.edges
      ]
      if (this.cy?.elements()?.length > 0) {
        const onGraphElements = this.cy.elements()
        if(onGraphElements.length > 0){
          onGraphElements.forEach(onGraphElement => {
            const index = elements.findIndex(el => el.data.id === onGraphElement.id())
            if(index > -1){
              elements.splice(index,1)
              onGraphElement.style('display', 'element')
            }else{
              // onGraphElement.remove()
              onGraphElement.style('display', 'none')
            }
          })
        }
        this.cy.add(elements)
        return;
      }

      cytoscape.use( dagre );

      const posFunc = (node) => {

        return node.data.level, node.data.level
      }

      this.cy = cytoscape({
        container: this.$refs.cy,
        elements: elements,
        style: basicStyles,
        layout: { name: "preset", nodeDimensionsIncludeLabels: true,  sort: (a, b) => a.data("rank") - b.data("rank"), nodeSep: 100},
      });
      // this.cy.fit(undefined, 100);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    onCheckboxChange(key, value) {
      this.$emit('updateCheckbox',  key, value);
    },

  },
  watch: {
    nodes: {
      handler: "updateGraph",
      deep: true,
    },
    edges: {
      handler: "updateGraph",
      deep: true,
    },
  },
  mounted() {
    this.updateGraph();
  },
});
</script>

<template>
  <div class="relative">
    <!-- Diagram Container -->
    <div id="cy" ref="cy" style="width: 100%; height: 800px; border-radius: 8px;" class="diagram-container"></div>

    <!-- Toggle Menu Button -->


    <!-- Popup Menu -->
    <UCard
        v-if="showMenu"
        class="absolute top-0 right-0 shadow-md p-4 rounded w-64 z-10 filter-container"
        variant="light"
    >
      <h3 class="text-lg font-bold mb-2">Options</h3>
      <div v-for="checkbox in checkboxes" :key="checkbox.key" class="mb-2 z-10">
        <UCheckbox
            :default-value="checkbox.default"
            v-model="checkbox.value"
            :label="checkbox.label"
            :ui="{label: 'color-black'}"
            @change="onCheckboxChange(checkbox.key, $event)"
        />
      </div>
    </UCard>

    <UButton
        class="absolute top-2 right-2 bg-gray-500 z-11"
        variant="primary"
        icon="mdi-menu"
        @click="toggleMenu"
    >
      <UButton class="absolute top-0 right-10 z-11" icon="mdi-content-save" @click="saveView"/>
    </UButton>
  </div>

</template>

<style scoped>
.diagram-container {
  background-color: #d8ceb5;
}
.filter-container{
  background-color: gray;
}
</style>