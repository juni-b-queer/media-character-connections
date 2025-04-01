export default eventHandler(async () => {
    const seasons = await useDrizzle().select().from(tables.season)

    return seasons
})