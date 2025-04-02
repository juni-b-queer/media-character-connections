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
                            actor: true
                        }
                    }
                }
            },
        }
    })

    return sketch.characterToSketch.map(c => {
        return {
            id: c.character.id,
            name: c.character.name,
            actor: c.character.actor.name
        }
    })
})