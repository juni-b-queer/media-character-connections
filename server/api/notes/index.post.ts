import {tables, useDrizzle} from "~/server/utils/drizzle";

export default eventHandler(async (event) => {
    const { notableType, notableId, note } = await readBody(event)

    const newNotes = await useDrizzle().insert(tables.note).values({
        notableType, notableId, note
    }).returning()

    return newNotes[0]
})
