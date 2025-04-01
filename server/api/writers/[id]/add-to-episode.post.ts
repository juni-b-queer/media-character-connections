import {tables, useDrizzle} from "~/server/utils/drizzle";

export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { episodeId } = await readBody(event)

    const writerToEpisode = await useDrizzle().insert(tables.writerToEpisode).values({
        episodeId: episodeId,
        writerId: id,
    }).returning()

    return writerToEpisode
})