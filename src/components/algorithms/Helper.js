export const updateAdjacentNodes = (node, graph) => {
    const adjacentNodes = getAdjacentNodes(node, graph)
    for (const adjacentNode of adjacentNodes) {
        adjacentNode.distance = node.distance + 1
        adjacentNode.previous = node
    }
}

//Get all the adjacent nodes of a node that have not been visited yet 
export const getAdjacentNodes = (node, graph) => {
    const X = node.row
    const Y = node.col
    const results = []
    if (X > 0 && node.distance < graph[X-1][Y].distance && !graph[X-1][Y].isWall) results.push(graph[X-1][Y]) 
    if (X < graph.length - 1 && node.distance < graph[X+1][Y].distance && !graph[X+1][Y].isWall) results.push(graph[X+1][Y])
    if (Y > 0 && node.distance < graph[X][Y-1].distance && !graph[X][Y-1].isWall) results.push(graph[X][Y-1])
    if (Y < graph[0].length - 1 && node.distance < graph[X][Y+1].distance && !graph[X][Y+1].isWall) results.push(graph[X][Y+1])
    return results.filter(node => !node.visited)
}

// export getAdjacentNodes