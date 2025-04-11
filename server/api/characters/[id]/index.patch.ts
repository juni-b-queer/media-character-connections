export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { name, actorId, avatarUrl, creditedName } = await readBody(event)
    let character = await useDrizzle().query.character.findFirst({
        where: eq(tables.character.id, id),
    })
    if (actorId || name || avatarUrl){
        await useDrizzle().update(tables.character).set(
            {
                actorId: parseInt(actorId) ?? character.actorId,
                name: name ?? character.name,
                avatarUrl: avatarUrl ?? character.avatarUrl,
                creditedName: creditedName ?? character.creditedName,
            }
        ).where(eq(tables.character.id, id))
    }

    return character
})