export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const sketch = await useDrizzle().query.sketch.findFirst({
        where: eq(tables.sketch.id, id),
        with: {
            episode: true,
            characterToSketch:{
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

        return {
            id: sketch.id,
            name: sketch.name,
            episode: sketch.episode,
            episodeId: sketch.episodeId,
            characters: sketch.characterToSketch.map(c => c.character),
            sketchNumberInEpisode: sketch.sketchNumberInEpisode,
            runtime: sketch.runtime,
        }

})