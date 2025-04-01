import {tables, useDrizzle} from "~/server/utils/drizzle";
import {integer} from "drizzle-orm/pg-core";
import {episode} from "~/server/database/schema";

export default eventHandler(async (event) => {
    const { name } = await readBody(event)

    const writer = await useDrizzle().insert(tables.writer).values({
        name
    }).returning()

    return writer
})
