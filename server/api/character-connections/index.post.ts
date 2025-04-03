import {tables, useDrizzle} from "~/server/utils/drizzle";
import {integer} from "drizzle-orm/pg-core";
import {episode} from "~/server/database/schema";

export default eventHandler(async (event) => {
    const { targetCharacterId, sourceCharacterId, connectionType, sketchId } = await readBody(event)

    const characterConnection = await useDrizzle().insert(tables.characterConnection).values({
        targetCharacterId, sourceCharacterId, connectionType, sketchId
    }).returning()

    return characterConnection[0]
})
