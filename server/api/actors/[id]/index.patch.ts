export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { name, avatarUrl } = await readBody(event)
    let actor = await useDrizzle().query.actor.findFirst({
        where: eq(tables.actor.id, id),
    })
    if (name || avatarUrl) {
        await useDrizzle().update(tables.actor).set(
            {
                name: name ?? actor.name,
                avatarUrl: avatarUrl ?? actor.avatarUrl,
            }
        ).where(eq(tables.actor.id, id))
    }

    return actor
})