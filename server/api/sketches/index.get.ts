export default eventHandler(async () => {
    const sketches = await useDrizzle().query.sketch.findMany({
        with: {
            episode: true,
            characterToSketch: true,
        }
    })

    return sketches
})