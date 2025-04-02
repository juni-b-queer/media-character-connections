<template>
  <div>
    <CytoscapeDiagram v-if="ready" :elements="cytoElements" :filters="filters"/>
  </div>
  <UCard>

      <UCard>
        <h3>Filter by Season</h3>
        <UCheckbox v-for="season in seasons" :default-value="true" :key="season.id"
                   @change="toggleFilter('seasons', season)" :label="`Season ${ season.seasonNumber }`"/>
      </UCard>
      <UCard>
        <h3>Filter by Writer</h3>
        TODO
      </UCard>


  </UCard>
</template>

<script>


export default {
  data() {
    return {
      nodes: [],
      links: [],
      ready: false,
      seasons: [],
      episodes: [],
      sketches: [],
      writers: [],
      cytoElements: [],
      available: {
        seasons: [],
        episodes: [],
        sketches: [],
        writers: []
      },
      filters: {
        seasons: [],
        episodes: [],
        sketches: [],
        writers: []
      }
    };
  },

  methods: {
    pushNode(id, label, type, additionalArgs) {
      this.cytoElements.push({
        data: {
          id: id,
          label: label,
          type: type,
          ...additionalArgs
        }
      })
    },
    pushLink(id, source, target, type) {
      this.cytoElements.push({
        data: {
          id: id,
          source: source,
          target: target,
          type: type,
        }
      })
    },
    async getSeasons() {
      const data = await $fetch('/api/seasons')
      this.seasons = data
    },
    mapSeasons() {
      this.seasons.forEach(season => {
        const nodeId = `season${season.id}`
        this.available.seasons.push(nodeId)
        this.filters.seasons.push(nodeId)
        this.pushNode(nodeId, `Season ${season.seasonNumber}`, "season")
      })
    },
    async getEpisodes() {
      const data = await $fetch('/api/episodes')
      this.episodes = data
    },
    mapEpisodes() {
      this.episodes.forEach(episode => {
        const nodeId = `episode${episode.id}`
        this.available.episodes.push(nodeId)
        this.filters.episodes.push(nodeId)
        this.pushNode(
            nodeId,
            `${episode.episodeNumberInSeason}`,
            "episode",
            {seasonId: `season${episode.seasonId}`}
        )
        this.pushLink(
            `s${episode.seasonId}-e${episode.id}`,
            `season${episode.seasonId}`,
            `episode${episode.id}`,
            "season-episode"
        )
      })
    },
    async getSketches() {
      const data = await $fetch('/api/sketches')
      this.sketches = data
    },
    mapSketches() {
      this.sketches.forEach(sketch => {
        const nodeId = `sketch${sketch.id}`
        this.available.sketches.push(nodeId)
        this.filters.sketches.push(nodeId)
        this.pushNode(
            nodeId,
            `${sketch.name}`,
            "sketch",
            {episodeId: `episode${sketch.episodeId}`}
        )
        this.pushLink(
            `${sketch.episodeId}-sk${sketch.id}`,
            `episode${sketch.episodeId}`,
            `sketch${sketch.id}`,
            "episode-sketch"
        )
      })
    },
    async getWriters() {
      const data = await $fetch('/api/writers')
      this.writers = data

    },
    mapWriters() {
      this.writers.forEach(writer => {
        const nodeId = `writer${writer.id}`
        this.available.writers.push(nodeId)
        this.filters.writers.push(nodeId)
        this.pushNode(
            `writer${writer.id}`,
            `${writer.name}`,
            "writer",
            200
        )
        writer.writerToEpisode.forEach(episode => {
          this.pushLink(
              `w${writer.id}-e${episode.episodeId}`,
              `writer${writer.id}`,
              `episode${episode.episodeId}`,
              "writer-episode"
          )
        })

      })
    },
    toggleFilter(category, obj) {
      console.log(category, obj.id)
      const nodeId = `${category.slice(0, -1)}${obj.id}`
      if (this.filters[category].includes(`${nodeId}`)) {
        this.filters[category] = this.filters[category].filter(i => i !== `${nodeId}`);
      } else {
        this.filters[category].push(`${nodeId}`);
      }
    },
    async fetchAll() {
      await this.getSeasons()
      await this.getEpisodes()
      await this.getWriters()
      await this.getSketches()
    },
    mapAll() {
      this.mapSeasons()
      this.mapEpisodes()
      this.mapWriters()
      this.mapSketches()
    }

  },
  async beforeMount() {
    await this.fetchAll()
    this.mapAll()
    this.ready = true
  }
};
</script>

<style>
</style>
