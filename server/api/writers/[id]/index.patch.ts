export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { name, avatarUrl } = await readBody(event)
    let writer = await useDrizzle().query.writer.findFirst({
        where: eq(tables.writer.id, id),
    })
    if (name || avatarUrl) {
        await useDrizzle().update(tables.writer).set(
            {
                name: name ?? writer.name,
                avatarUrl: avatarUrl ?? writer.avatarUrl,
            }
        ).where(eq(tables.writer.id, id))
    }

    return writer
})