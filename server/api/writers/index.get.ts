export default eventHandler(async () => {
    const writers = await useDrizzle().query.writer.findMany({
        with: {
            writerToEpisodes: true
        }
    })

    return writers
})