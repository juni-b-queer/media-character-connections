export function filterBrokenEdges(nodes, edges){
    const nodeIds = new Set(nodes.map(node => node.data.id));

    const filteredEdges = edges.filter(edge => {
            return nodeIds.has(edge.data.source) && nodeIds.has(edge.data.target)
        }
    );

    return filteredEdges
}

// export function positionNodes(nodes, edges) {
//     // Create a lookup by node id for easy access
//     const nodeById = new Map();
//     nodes.forEach(node => {
//         nodeById.set(node.data.id, node);
//     });
//
//     let episodeX = 50;
//     let episodeY = 50;
//
//     nodes.forEach(node => {
//         if (node.data.type === 'episode-node') {
//
//             node.position = { x: episodeX, y: episodeY };
//             episodeY += 800;
//         }
//     });
//     console.log('out')
//
//     const episodeSketchMap = new Map();
//     edges.forEach(edge => {
//         if (edge.data.type === 'episode-sketch-edge') {
//             const epId = edge.data.source;
//             if (!episodeSketchMap.has(epId)) {
//                 episodeSketchMap.set(epId, []);
//             }
//             episodeSketchMap.get(epId).push(edge);
//         }
//     });
//
//     episodeSketchMap.forEach((sketchEdges, episodeId) => {
//         const episodeNode = nodeById.get(episodeId);
//         if (episodeNode) {
//             // Sort sketch edges by their order (if provided)
//             sketchEdges.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
//
//             // Position sketches in a row under the episode
//             // Gap settings for sketches
//             const sketchBaseY = episodeNode.position.y + 200;
//             let sketchX = episodeNode.position.x - 600;
//             const gapX = 300;
//
//             sketchEdges.forEach(edge => {
//                 const sketchNode = nodeById.get(edge.data.target);
//                 if (sketchNode) {
//                     // Set position for the sketch node
//                     sketchNode.position = { x: sketchX, y: sketchBaseY };
//                     sketchX += gapX;
//
//                     // For each sketch, find connected character nodes via character-sketch edges
//                     const characterEdges = edges.filter(e =>
//                         e.data.type === 'character-sketch-edge' && e.data.source === sketchNode.data.id
//                     );
//
//                     // Define layout parameters for character nodes: two columns layout
//                     const charStartY = sketchNode.position.y + 100;
//                     const charGapX = 200;
//                     const charGapY = 100;
//
//                     characterEdges.forEach((charEdge, index) => {
//                         const characterNode = nodeById.get(charEdge.data.target);
//                         if (characterNode) {
//                             // Determine column (0 or 1) and row based on index
//                             const col = index % 2;
//                             const row = Math.floor(index / 2);
//
//                             // Set character position relative to the sketch node
//                             characterNode.position = {
//                                 x: sketchNode.position.x + col * charGapX,
//                                 y: charStartY + row * charGapY
//                             };
//                         }
//                     });
//                 }
//             });
//         }
//     });
//
//     // For any node that hasn't been positioned (e.g. duplicates or nodes not connected)
//     nodes.forEach(node => {
//         if (!node.position) {
//             node.position = { x: 0, y: 0 };
//         }
//     });
//
//
//
//     return nodes;
// }

export function positionNodes(nodes, edges) {
    // Create a lookup by node id for easy access
    const nodeById = new Map();
    nodes.forEach(node => {
        nodeById.set(node.data.id, node);
    });

    //
    // 1. Position season nodes (top row)
    //
    let seasonX = 50;
    let seasonY = 50;
    nodes.forEach(node => {
        if (node.data.type === 'season-node') {
            node.position = { x: seasonX, y: seasonY };
            seasonY += 1000;
        }
    });

    //
    // 2. Build mapping for season-episode edges and position episode nodes
    //
    const seasonEpisodeMap = new Map();
    edges.forEach(edge => {
        if (edge.data.type === 'season-episode-edge') {
            const seasonId = edge.data.source;
            if (!seasonEpisodeMap.has(seasonId)) {
                seasonEpisodeMap.set(seasonId, []);
            }
            seasonEpisodeMap.get(seasonId).push(edge);
        }
    });

    // For each season, position its episodes
    seasonEpisodeMap.forEach((episodeEdges, seasonId) => {
        const seasonNode = nodeById.get(seasonId);
        if (seasonNode) {
            // Optionally sort episodes if an order is provided
            episodeEdges.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));

            // Set starting position for episodes relative to season.
            // For example, episodes will be positioned in a row below the season.
            const episodeBaseY = seasonNode.position.y + 150;
            let episodeX = seasonNode.position.x - 2500;
            const gapX = 2000;

            episodeEdges.forEach(edge => {
                const episodeNode = nodeById.get(edge.data.target);
                if (episodeNode) {
                    episodeNode.position = {
                        x: episodeX,
                        y: episodeBaseY
                    };
                    episodeX += gapX;
                }
            });
        }
    });

    //
    // 3. Position any remaining episodes that were not attached to a season.
    //    They will be arranged in a default row.
    //
    let defaultEpisodeX = 50;
    const defaultEpisodeY = 250;
    nodes.forEach(node => {
        if (node.data.type === 'episode-node' && !node.position) {
            node.position = {
                x: defaultEpisodeX,
                y: defaultEpisodeY
            };
            defaultEpisodeX += 200;
        }
    });

    //
    // 4. Position sketch nodes under their associated episodes (via episode-sketch-edge)
    //
    const episodeSketchMap = new Map();
    edges.forEach(edge => {
        if (edge.data.type === 'episode-sketch-edge') {
            const epId = edge.data.source;
            if (!episodeSketchMap.has(epId)) {
                episodeSketchMap.set(epId, []);
            }
            episodeSketchMap.get(epId).push(edge);
        }
    });

    episodeSketchMap.forEach((sketchEdges, episodeId) => {
        const episodeNode = nodeById.get(episodeId);
        if (episodeNode) {
            // Sort sketch edges by their order
            sketchEdges.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));

            // Position sketches in a row below the episode node.
            const sketchBaseY = episodeNode.position.y + 200;
            let sketchX = episodeNode.position.x - 800;
            const gapX = 400;

            sketchEdges.forEach(edge => {
                const sketchNode = nodeById.get(edge.data.target);
                if (sketchNode) {
                    sketchNode.position = { x: sketchX, y: sketchBaseY };
                    sketchX += gapX;

                    //
                    // 5. Position connected character nodes under the sketch in two columns.
                    //
                    const characterEdges = edges.filter(e =>
                        e.data.type === 'character-sketch-edge' && e.data.source === sketchNode.data.id
                    );
                    const charStartY = sketchNode.position.y + 100;
                    const charGapX = 200;
                    const charGapY = 100;
                    characterEdges.forEach((charEdge, index) => {
                        const characterNode = nodeById.get(charEdge.data.target);
                        if (characterNode) {
                            const col = index % 2;
                            const row = Math.floor(index / 2);
                            characterNode.position = {
                                x: sketchNode.position.x -100 + col * charGapX,
                                y: charStartY + row * charGapY
                            };
                        }
                    });
                }
            });
        }
    });

    //
    // 6. For any node that hasn't been positioned, assign a default position.
    //
    nodes.forEach(node => {
        if (!node.position) {
            node.position = { x: 0, y: 0 };
        }
    });

    return nodes;
}

export function filterById(nodes) {
    const seenIds = new Set();
    return nodes.filter(item => {
        if (seenIds.has(item.data.id)) {
            return false;
        }
        seenIds.add(item.data.id);
        return true;
    })
}