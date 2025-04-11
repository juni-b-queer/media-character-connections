export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { notableType, notableId, note } = await readBody(event)
    let noteRecord = await useDrizzle().query.note.findFirst({
        where: eq(tables.note.id, id),
    })
    if (notableType || notableId || note) {
        await useDrizzle().update(tables.note).set(
            {
                notableType: notableType ?? noteRecord.notableType,
                notableId: parseInt(notableId) ?? noteRecord.notableId,
                note: note ?? noteRecord.note,
            }
        ).where(eq(tables.note.id, id))
    }

    return noteRecord
})