
export function mapSeasonsNodes(seasons){
    const nodes = []
    const edges = []
    seasons.forEach(season => {
        nodes.push({
            data: {
                rank: 1,
                id: `season${season.id}`,
                label: `Season ${season.id}`,
                type: 'season-node',
            }
        })
    })
    return {nodes, edges}
}

export function mapEpisodeNodesAndEdges(episodes){
    const nodes = []
    const edges = []
    episodes.forEach(episode => {
        nodes.push({
            data: {
                rank: 2,
                id: `episode${episode.id}`,
                label: `${episode.title}`,
                type: 'episode-node',
            }
        })
        edges.push({
            data: {
                rank: 2,
                id: `season${episode.seasonId}-episode${episode.id}`,
                target: `episode${episode.id}`,
                source: `season${episode.seasonId}`,
                type: `season-episode-edge`,
            }
        })
    })
    return {nodes, edges}
}

export function mapWriterNodesAndEdges(writers){
    const nodes = []
    const edges = []
    writers.forEach(writer => {
        nodes.push({
            data: {
                rank: 4,
                id: `writer${writer.id}`,
                label: `${writer.name}`,
                type: 'writer-node',
            }
        })
        writer.writerToEpisode.forEach(episode => {
            edges.push({
                data: {
                    rank: 4,
                    id: `writer${writer.id}-episode${episode.episodeId}`,
                    target: `episode${episode.episodeId}`,
                    source: `writer${writer.id}`,
                    type: `writer-episode-edge`,
                }
            })
        })

    })
    return {nodes, edges}
}

export function mapSketchNodesAndEdges(sketches){
    const nodes = []
    const edges = []
    sketches.forEach(sketch => {
        if(sketch.episode){
            nodes.push({
                data: {
                    rank: 2,
                    id: `episode${sketch.episode.id}`,
                    label: `${sketch.episode.title}`,
                    type: 'episode-node',
                }
            })
        }

        nodes.push({
            data: {
                rank: 3,
                id: `sketch${sketch.id}`,
                label: `${sketch.name}`,
                type: 'sketch-node',
            }
        })
        edges.push({
            data: {
                rank: 3,
                id: `episode${sketch.episodeId}-sketch${sketch.id}`,
                target: `sketch${sketch.id}`,
                source: `episode${sketch.episodeId}`,
                type: `episode-sketch-edge`,
                order: sketch.sketchNumberInEpisode
            }
        })
    })

    return {nodes, edges}
}



export function mapCharacterNodesAndEdges(characters, currentSketch = null){
    const nodes = []
    const edges = []
    characters.forEach(character => {
        nodes.push({
            data: {
                rank: 4,
                id: `character${character.id}`,
                label: `${character.name}`,
                type: 'character-node',
            }
        })
        character.characterToSketch.forEach(sketch => {
            if(currentSketch !== null && currentSketch.id === sketch.sketchId){
                edges.push({
                    data: {
                        rank: 4,
                        id: `character${character.id}-sketch${sketch.sketchId}`,
                        target: `character${character.id}`,
                        source: `sketch${sketch.sketchId}`,
                        type: `character-sketch-edge`,
                    }
                })
            }
            if(currentSketch === null){
                edges.push({
                    data: {
                        rank: 4,
                        id: `character${character.id}-sketch${sketch.sketchId}`,
                        target: `character${character.id}`,
                        source: `sketch${sketch.sketchId}`,
                        type: `character-sketch-edge`,
                    }
                })
            }

        })

    })
    return {nodes, edges}
}

export function mapActorNodesAndEdges(actors, characters){
    const nodes = []
    const edges = []
    actors.forEach(actor => {
        nodes.push({
            data: {
                rank: 4,
                id: `actor${actor.id}`,
                label: `${actor.name}`,
                type: 'actor-node',
            }
        })

    })

    characters.forEach(character => {
        if(!character.actorId) return;
        edges.push({
            data: {
                rank: 4,
                id: `character${character.id}-actor${character.actorId}`,
                target: `actor${character.actorId}`,
                source: `character${character.id}`,
                type: `character-actor-edge`,
            }
        })
    })
    return {nodes, edges}
}

export function mapCharacterConnectionEdges(characterConnections){
    const nodes = []
    const edges = []
    characterConnections.forEach(characterConnection => {
        edges.push({
            data: {
                rank: 4,
                id: `character${characterConnection.sourceCharacterId}-character${characterConnection.targetCharacterId}`,
                target: `character${characterConnection.targetCharacterId}`,
                source: `character${characterConnection.sourceCharacterId}`,
                type: `character-connection-edge`,
                connectionType: characterConnection.connectionType
            }
        })

    })
    return {nodes, edges}
}

// TODO for characters, get all chars instead of persketch