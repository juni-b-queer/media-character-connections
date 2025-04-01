export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)

    const season = await useDrizzle().query.season.findFirst({
        where: eq(tables.season.id, id),
        with:{
            episodes: {
                with: {
                    sketches: true
                }
            }
        }
    })

    return season
})