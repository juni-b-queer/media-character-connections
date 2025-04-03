export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)

    const sketch = await useDrizzle().query.sketch.findFirst({
        where: eq(tables.sketch.id, id),
        with: {
            episode: true,
            characterToSketch: {
                with: {
                    character: {
                        with: {
                            actor: true,
                            characterToSketch: true,
                            toConnection: {
                                with: {
                                    sketch: true,
                                    source: {
                                        with: {
                                            actor: true,
                                        }
                                    }
                                }
                            },
                            fromConnection: {
                                with: {
                                    sketch: true,
                                    target: {
                                        with: {
                                            actor: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    })

    return sketch?.characterToSketch.map(c => {
        return {
            id: c.character.id,
            name: c.character.name,
            actor: c.character.actor,
            characterToSketch: c.character.characterToSketch,
            toConnection: c.character.toConnection,
            fromConnection: c.character.fromConnection,
        }
    })
})