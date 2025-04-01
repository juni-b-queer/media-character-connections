export default eventHandler(async () => {
    const characters = await useDrizzle().query.character.findMany({
        with: {
            characterToSketch: true,
            actor: true
        }
    })

    return characters
})