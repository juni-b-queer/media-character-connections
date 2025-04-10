import {tables, useDrizzle} from "~/server/utils/drizzle";
import {integer} from "drizzle-orm/pg-core";
import {episode} from "~/server/database/schema";

export default eventHandler(async (event) => {
    const { name, avatarUrl, actorId } = await readBody(event)

    const character = await useDrizzle().insert(tables.character).values({
        name: name,
        avatarUrl: avatarUrl,
        actorId: actorId === 0 ? null : actorId,
    }).returning()

    return character[0]
})
