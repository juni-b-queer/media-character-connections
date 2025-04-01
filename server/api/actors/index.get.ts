export default eventHandler(async () => {
    const actors = await useDrizzle().query.actor.findMany({
        with: {
            characters: true
        }
    })

    return actors
})