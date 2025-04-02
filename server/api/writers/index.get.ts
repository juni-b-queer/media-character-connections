export default eventHandler(async () => {
    const writers = await useDrizzle().query.writer.findMany({
        with: {
            writerToEpisode: {
                with:{
                    episode: true
                }
            }
        }
    })

    return writers
})