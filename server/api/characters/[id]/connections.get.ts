import {tables, useDrizzle} from "~/server/utils/drizzle";

export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)

    const connections = await useDrizzle().query.characterConnection.findMany({
        where: or(
            eq(tables.characterConnection.sourceCharacterId, id),
            eq(tables.characterConnection.targetCharacterId, id)
        ),
        with: {
            sketch: true,
            target: true,
            source: true,
        }
    })

    return connections
})