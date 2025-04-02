export default eventHandler(async () => {
    const seasons = await useDrizzle().query.season.findMany({
        with: {
            episodes: true
        }
    })

    return seasons
})