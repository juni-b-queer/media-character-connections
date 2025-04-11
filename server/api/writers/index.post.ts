import {tables, useDrizzle} from "~/server/utils/drizzle";

export default eventHandler(async (event) => {
    const { name, avatarUrl } = await readBody(event)

    const existing = await useDrizzle().query.writer.findFirst({
        where: eq(tables.writer.name, name)
    })
    if (existing) return existing

    const writer = await useDrizzle().insert(tables.writer).values({
        name,
        avatarUrl,
    }).returning()

    console.log(writer[0])

    return writer[0]
})
