export default eventHandler(async () => {
    const characterConnections = await useDrizzle().query.characterConnection.findMany({
        with: {
            target: true,
            source: true,
            sketch: true,
        }
    })

    return characterConnections
})