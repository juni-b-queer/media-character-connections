import {tables, useDrizzle} from "~/server/utils/drizzle";
import {integer} from "drizzle-orm/pg-core";
import {episode} from "~/server/database/schema";

export default eventHandler(async (event) => {
    const { name, avatarUrl } = await readBody(event)

    const existing = await useDrizzle().query.actor.findFirst({
        where: eq(tables.actor.name, name)
    })
    console.log(existing)
    if (existing) return existing

    const actor = await useDrizzle().insert(tables.actor).values({
        name,
        avatarUrl,
    }).returning()

    return actor[0]
})
