export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { connectionType, sketchId, targetCharacterId, sourceCharacterId } = await readBody(event)
    let characterConnection = await useDrizzle().query.characterConnection.findFirst({
        where: eq(tables.characterConnection.id, id),
    })
    if (connectionType || sketchId || targetCharacterId || sourceCharacterId) {
        await useDrizzle().update(tables.characterConnection).set(
            {
                connectionType: connectionType ?? characterConnection.connectionType,
                sketchId: parseInt(sketchId) ?? characterConnection.sketchId,
                targetCharacterId: parseInt(targetCharacterId) ?? characterConnection.targetCharacterId,
                sourceCharacterId: parseInt(sourceCharacterId) ?? characterConnection.sourceCharacterId,
            }
        ).where(eq(tables.characterConnection.id, id))
    }

    return characterConnection
})