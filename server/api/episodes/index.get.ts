export default eventHandler(async () => {
    const episodes = await useDrizzle().query.episode.findMany({
        with: {
            sketches: true,
            season: true
        }
    })

    return episodes
})