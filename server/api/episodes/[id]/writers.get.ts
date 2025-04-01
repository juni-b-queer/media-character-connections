import {writerToEpisode} from "~/server/database/schema";

export default eventHandler(async (event) => {
    const {id} = getRouterParams(event)

    const episode = await useDrizzle().query.episode.findFirst({
        where: eq(tables.episode.id, id),
        with: {
            writerToEpisode: {
                with:{
                    writer: true
                }
            }
        }
    })

    const writers = []
    for (const writer of episode.writerToEpisode) {
        writers.push(writer.writer)
    }

    return writers
})