export interface Relationship {
    key: string;
    type?: string;
    labelKey: string;
}

export function mapSketchNode(sketch, relationships: Relationship[]){
    const nodes = []
    const edges = []
    nodes.push({
        data: {
            rank: 3,
            id: `sketch${sketch.id}`,
            label: sketch.name,
            type: 'sketch-node',
        }
    })
    relationships.forEach(relationship => {
        relationship['type'] =relationship?.type ?? relationship.key
        nodes.push({
            data: {
                rank: 2,
                id: `${relationship.type}${sketch[relationship.key].id}`,
                label: sketch[relationship.key][relationship.labelKey],
                type: `${relationship.type}-node`,
            }
        })
        edges.push({
            data: {
                rank: 2,
                id: `${relationship.type}${sketch[relationship.key].id}-sketch${sketch.id}`,
                target: `sketch${sketch.id}`,
                source: `${relationship.type}${sketch[relationship.key].id}`,
                type: `${relationship.type}-sketch-edge`,
            }
        })
    })
    return {nodes, edges}
}