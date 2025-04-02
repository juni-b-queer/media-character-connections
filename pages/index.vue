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
      writers: [],
      cytoElements: [],
      available: {
        seasons: [],
        episodes: [],
        writers: []
      },
      filters: {
        seasons: [],
        episodes: [],
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
      const {data} = await useFetch('/api/seasons')
      console.log(data)
      this.seasons = data.value
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
      const {data} = await useFetch('/api/episodes')
      console.log(data)
      this.episodes = data.value
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
    async getWriters() {
      const {data} = await useFetch('/api/writers')
      console.log(data)
      this.writers = data.value

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
    },
    mapAll() {
      this.mapSeasons()
      this.mapEpisodes()
      this.mapWriters()
    }

  },
  async beforeMount() {
    await this.fetchAll()
    this.mapAll()
    console.log(this.cytoElements)
    this.ready = true
  }
};
</script>

<style>
</style>
