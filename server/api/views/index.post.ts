export default eventHandler(async (event) => {
    const {viewData } = await readBody(event)
    const view = await useDrizzle().insert(tables.visualizerView).values(
        {
            viewData: viewData,
            timestamp: new Date().toISOString(),
        }
    ).returning()
    return
})