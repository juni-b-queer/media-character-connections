export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)

    const episode = await useDrizzle().query.episode.findFirst({
        where: eq(tables.episode.id, id),
        with:{
            sketches: {
                with: {
                    episode: true
                }
            }
        }
    })

    return episode.sketches
})