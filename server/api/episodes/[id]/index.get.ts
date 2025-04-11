import {writerToEpisode} from "~/server/database/schema";

export default eventHandler(async (event) => {
    const {id} = getRouterParams(event)

    const episode = await useDrizzle().query.episode.findFirst({
        where: eq(tables.episode.id, id),
        with: {
            writerToEpisode: {
                with:{
                    writer: true
                }
            },
            sketches: {
                with: {
                    episode: true,
                    characterToSketch:{
                        with: {
                            character: {
                                with: {
                                    actor: true,
                                    characterToSketch: true,
                                    toConnection: {
                                        with: {
                                            sketch: true,
                                            // source: {
                                            //     with: {
                                            //         actor: true,
                                            //     }
                                            // }
                                        }
                                    },
                                    fromConnection: {
                                        with: {
                                            sketch: true,
                                            // target: {
                                            //     with: {
                                            //         actor: true,
                                            //     }
                                            // }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return {
        ...episode,
        writers: episode.writerToEpisode.map(w => w.writer ),
        sketches: episode.sketches.map(sketch => {
            return {
                id: sketch.id,
                    name: sketch.name,
                episode: sketch.episode,
                episodeId: sketch.episodeId,
                characters: sketch.characterToSketch.map(c => {
                    return {
                        id: c.character.id,
                        name: c.character.name,
                        actor: c.character?.actor,
                        actorId: c.character?.actorId,
                        characterToSketch: c.character.characterToSketch,
                        toConnection: c.character.toConnection,
                        fromConnection: c.character.fromConnection,
                    }
                }),
                sketchNumberInEpisode: sketch.sketchNumberInEpisode,
                runtime: sketch.runtime,
            }
        })
    }
})