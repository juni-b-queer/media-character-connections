import {tables, useDrizzle} from "~/server/utils/drizzle";

export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { sketchId } = await readBody(event)

    const characterToSketch = await useDrizzle().insert(tables.characterToSketch).values({
        characterId: id,
        sketchId: sketchId,
    }).returning()

    return characterToSketch
})