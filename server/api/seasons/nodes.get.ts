export default eventHandler(async () => {
    const seasons = await useDrizzle().query.season.findMany({
        with: {
            // episodes: true,
            episodes: {
                with:{
                    writerToEpisode: {
                        with: {
                            writer: {
                                with:{
                                    writerToEpisode: true
                                }
                            }
                        }
                    },
                    sketches: true
                }
            }
        }
    })

    const sketches = await useDrizzle().query.sketch.findMany({
        with: {
            characterToSketch: {
                with: {
                    character: {
                        with: {
                            actor: true,
                                toConnection: true,
                                fromConnection: true,
                        }
                    }
                }
            }
        }
    })

    return seasons.map(season => {
        return {
            id: season.id,
            // episodes: season.episodes,
            episodes: season.episodes.map(episode => {
                return {
                    seasonId: season.id,
                    id: episode.id,
                    title: episode.title,
                    writers: episode.writerToEpisode.map(writerToEpisode => {
                        return {
                            ...writerToEpisode.writer
                        }
                    }),
                    sketches: sketches.filter(s => s.episodeId === episode.id).map(sketch => {
                        return {
                            id: sketch.id,
                            sketchNumberInEpisode: sketch.sketchNumberInEpisode,
                            runtime: sketch.runtime,
                            name: sketch.name,
                            episodeId: episode.id,
                            characters: sketch.characterToSketch.map(characterToSketch => {
                                return {
                                    sketchId: sketch.id,
                                    id: characterToSketch.character.id,
                                    name: characterToSketch.character.name,
                                    actor: characterToSketch.character.actor,
                                    toConnection: characterToSketch.character.toConnection,
                                    fromConnection: characterToSketch.character.fromConnection,
                                }
                            }),
                        }
                    }),
                }
            }),
        }
    })

})