<script>
import { defineComponent } from "vue";
import cytoscape from "cytoscape";
import dagre from 'cytoscape-dagre';
import {basicStyles} from "~/components/diagramStandards.js";

export default defineComponent({
  name: "StandardDiagram",
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
    updateGraph() {
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
        // this.cy.add(elements)
        return;
      }

      cytoscape.use( dagre );

      this.cy = cytoscape({
        container: this.$refs.cy,
        elements: elements,
        style: basicStyles,
        layout: { name: "dagre"},
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
    <div id="cy" ref="cy" style="width: 100%; height: 600px; border-radius: 8px;" class="bg-gray-800"></div>

    <!-- Toggle Menu Button -->


    <!-- Popup Menu -->
    <UCard
        v-if="showMenu"
        class="absolute top-0 right-0 shadow-md p-4 rounded w-64 z-10"
        variant="light"
    >
      <h3 class="text-lg font-bold mb-2 color-white">Options</h3>
      <div v-for="checkbox in checkboxes" :key="checkbox.key" class="mb-2 z-10">
        <UCheckbox
            :default-value="checkbox.default"
            v-model="checkbox.value"
            :label="checkbox.label"
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
    </UButton>
  </div>

</template>