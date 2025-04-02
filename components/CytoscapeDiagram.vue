<script>
import { defineComponent } from "vue";
import cytoscape from "cytoscape";
import dagre from 'cytoscape-dagre';

export default defineComponent({
  name: "CytoscapeGraph",
  props: {
    elements: {
      type: Array,
      required: true, // Full dataset
    },
    filters: {
      type: Object,
      required: true, // Object containing filter states
    },
  },
  data() {
    return {
      cy: null, // Reference to the Cytoscape instance
    };
  },
  methods: {
    updateGraph() {
      if (this.cy) {
        this.cy.destroy(); // Destroy the previous instance
      }
      // Apply filters to elements
      const filteredElements = this.filterElements(this.elements, this.filters); // Filtered elements
      cytoscape.use( dagre );

      this.cy = cytoscape({
        container: this.$refs.cy,
        elements: filteredElements,
        style: [
          {
            selector: 'node[type="season"]',
            style: {
              "background-color": "#ff4500",
              shape: "hexagon",
              label: "data(label)",
              "text-halign": "center",
              "text-valign": "center",
              "color": "#fff",
              "text-outline-width": 2,
              "text-outline-color": "black",
              "font-size": "12px",
              "width": "70px",
            },
          },
          {
            selector: 'node[type="episode"]',
            style: {
              "background-color": "#1e90ff",
              shape: "ellipse",
              label: "data(label)",
            "text-halign": "center",
            "text-valign": "center",
            "color": "#fff",
            "text-outline-width": 2,
            "text-outline-color": "black",
            "font-size": "12px",
            },
          },
          {
            selector: 'node[type="writer"]',
            style: {
              "background-color": "#ff69b4",
              shape: "triangle",
              label: "data(label)",
            "text-halign": "center",
            "text-valign": "center",
            "color": "#fff",
            "text-outline-width": 2,
            "text-outline-color": "black",
            "font-size": "12px",
            },
          },
          {
            selector: 'node[type="sketch"]',
            style: {
              "background-color": "#ef9fc6",
              shape: "pentagon",
              label: "data(label)",
              "text-halign": "center",
              "text-valign": "center",
              "color": "#fff",
              "text-outline-width": 2,
              "text-outline-color": "black",
              "font-size": "12px",
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#ccc",
              "target-arrow-shape": "triangle",
            },
          },
          {
            selector: "edge[type='season-episode']",
            style: {
              width: 3,
              "line-color": "#ff0000",
              "target-arrow-shape": "triangle",
            },
          },
          {
            selector: "edge[type='episode-sketch']",
            style: {
              width: 3,
              "line-color": "#78dedc",
              "target-arrow-shape": "triangle",
            },
          }
          ,
          {
            selector: "edge[type='episode-writer']",
            style: {
              width: 3,
              "line-color": "#fa09a6",
              "target-arrow-shape": "triangle",
            },
          }
        ],
        layout: { name: "dagre"},
      });
    },

    filterElements(elements, filters) {
      let visibleNodes = [];
      let visibleNodeIds = new Set();
      let visibleEdges = [];

      let removedSeasons = new Set();
      let removedEpisodes = new Set();
      let removedSketches = new Set();


      // Step 1: Identify seasons to remove
      elements.forEach(({ data }) => {
        if (data.type === "season" && !filters.seasons.includes(data.id)) {
          removedSeasons.add(data.id);
        }
      });

      // Step 2: Identify episodes linked to removed seasons
      elements.forEach(({ data }) => {
        if (data.type === "episode" && removedSeasons.has(data.seasonId)) {
          removedEpisodes.add(data.id);
        }
      });

      elements.forEach(({ data }) => {
        if (data.type === "sketch" && removedEpisodes.has(data.episodeId)) {
          removedSketches.add(data.id);
        }
      });

      // Step 3: Identify and keep only connected nodes
      elements.forEach(({ data }) => {
        if (data.target) return; // Ignore edges for now

        // Remove episodes belonging to removed seasons
        if (data.type === "episode" && removedEpisodes.has(data.id)) return;

        // Remove nodes that are not in the filter list
        if (data.type === "season" && removedSeasons.has(data.id)) return;
        if (data.type === "sketch" && removedSketches.has(data.id)) return;
        if (data.type === "writer" && !filters.writers.includes(data.id)) return;
        if (data.type === "character" && !filters.characters.includes(data.id)) return;

        visibleNodes.push({ data });
        visibleNodeIds.add(data.id);
      });

      // Step 4: Add edges only if both connected nodes are visible
      elements.forEach(({ data }) => {
        if (
            data.source &&
            data.target &&
            visibleNodeIds.has(data.source) &&
            visibleNodeIds.has(data.target)
        ) {
          visibleEdges.push({ data });
        }
      });

      return [...visibleNodes, ...visibleEdges];
    }
  },
  watch: {
    elements: {
      handler: "updateGraph",
      deep: true,
    },
    filters: {
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
  <div id="cy" ref="cy" style="width: 100%; height: 600px;"></div>
</template>