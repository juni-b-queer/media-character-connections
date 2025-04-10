import {tables, useDrizzle} from "~/server/utils/drizzle";
import {integer} from "drizzle-orm/pg-core";
import {episode} from "~/server/database/schema";

export default eventHandler(async (event) => {
    const { episodeId, sketchNumberInEpisode, runtime, name, location } = await readBody(event)

    const sketch = await useDrizzle().insert(tables.sketch).values({
        episodeId,
        sketchNumberInEpisode,
        runtime,
        name,
        location
    })

    return sketch
})
