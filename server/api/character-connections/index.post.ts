import {tables, useDrizzle} from "~/server/utils/drizzle";
import {integer} from "drizzle-orm/pg-core";
import {episode} from "~/server/database/schema";

export default eventHandler(async (event) => {
    const { targetId, sourceId, connectionType, sketchId } = await readBody(event)

    const characterConnection = await useDrizzle().insert(tables.characterConnection).values({
        targetId, sourceId, connectionType, sketchId
    }).returning()

    return characterConnection[0]
})
