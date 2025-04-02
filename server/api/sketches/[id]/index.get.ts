export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const sketch = await useDrizzle().query.sketch.findFirst({
        where: eq(tables.sketch.id, id),
        with: {
            episode: true
        }
    })

    return sketch
})