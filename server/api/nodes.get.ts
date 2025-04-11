export default eventHandler(async () => {
    const seasons = await useDrizzle().query.season.findMany()

    const episodes = await useDrizzle().query.episode.findMany({
        with: {
            season: true,
            writerToEpisode: true
        }
    })

    const sketches = await useDrizzle().query.sketch.findMany({
        with: {
            episode: true,
        }
    })

    const characters = await useDrizzle().query.character.findMany({
        with: {
            characterToSketch: true
        }
    })

    const actors = await useDrizzle().query.actor.findMany()

    const connections = await useDrizzle().query.characterConnection.findMany()

    const writers = await useDrizzle().query.writer.findMany({
        with:{
            writerToEpisode: true,
        }
    })

    return {
        seasons: seasons,
        episodes: episodes,
        sketches: sketches,
        characters: characters,
        actors: actors,
        connections: connections,
        writers: writers
    }

    // return seasons.map(season => {
    //     return {
    //         id: season.id,
    //         // episodes: season.episodes,
    //         episodes: season.episodes.map(episode => {
    //             return {
    //                 seasonId: season.id,
    //                 id: episode.id,
    //                 title: episode.title,
    //                 writers: episode.writerToEpisode.map(writerToEpisode => {
    //                     return {
    //                         ...writerToEpisode.writer
    //                     }
    //                 }),
    //                 sketches: sketches.filter(s => s.episodeId === episode.id).map(sketch => {
    //                     return {
    //                         id: sketch.id,
    //                         sketchNumberInEpisode: sketch.sketchNumberInEpisode,
    //                         runtime: sketch.runtime,
    //                         name: sketch.name,
    //                         episodeId: episode.id,
    //                         characters: sketch.characterToSketch.map(characterToSketch => {
    //                             return {
    //                                 sketchId: sketch.id,
    //                                 id: characterToSketch.character.id,
    //                                 name: characterToSketch.character.name,
    //                                 actor: characterToSketch.character.actor,
    //                                 toConnection: characterToSketch.character.toConnection,
    //                                 fromConnection: characterToSketch.character.fromConnection,
    //                             }
    //                         }),
    //                     }
    //                 }),
    //             }
    //         }),
    //     }
    // })

})