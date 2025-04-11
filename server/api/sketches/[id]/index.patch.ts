export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { episodeId, runtime, sketchNumberInEpisode, name, location } = await readBody(event)
    let sketch = await useDrizzle().query.sketch.findFirst({
        where: eq(tables.sketch.id, id),
    })
    if (episodeId || runtime || sketchNumberInEpisode || name || location) {
        await useDrizzle().update(tables.sketch).set(
            {
                episodeId: parseInt(episodeId) ?? sketch.episodeId,
                runtime: runtime !== undefined ? parseInt(runtime) : sketch.runtime,
                sketchNumberInEpisode: sketchNumberInEpisode !== undefined ? parseInt(sketchNumberInEpisode) : sketch.sketchNumberInEpisode,
                name: name ?? sketch.name,
                location: location ?? sketch.location,
            }
        ).where(eq(tables.sketch.id, id))
    }

    return sketch
})