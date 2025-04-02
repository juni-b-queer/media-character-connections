import {tables, useDrizzle} from "~/server/utils/drizzle";

export default eventHandler(async (event) => {
    console.log(getRouterParams(event))
    const { id } = getRouterParams(event)

    const connections = await useDrizzle().query.characterConnections.findMany({
        where: or(
            eq(tables.characterToSketch.characterId, id),
            eq(tables.characterToSketch.sketchId, id)
        ),
        with: {
            sketch: true,
            target: true,
            source: true,
        }
    })

    return connections
})