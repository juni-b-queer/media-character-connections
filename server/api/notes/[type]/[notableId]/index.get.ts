export default eventHandler(async (event) => {
    const { type, notableId } = getRouterParams(event)
    const notes = await useDrizzle().query.note.findMany({
        where: and(eq(tables.note.notableType, type), eq(tables.note.notableId, notableId))
    })

    return notes
})