export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const character = await useDrizzle().query.character.findFirst({
        where: eq(tables.character.id, id),
        with: {
            characterToSketch: true,
            actor: true,
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
    })

    return character
})