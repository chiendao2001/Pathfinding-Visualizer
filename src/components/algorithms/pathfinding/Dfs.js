export const depthFirstSearch = (graph, startNode, endNode) => {
    startNode.distance = 0
    startNode.visited = true
    let visitedNodesInOrder = [startNode]
    const adjacentNodes = getAdjacentNodes(startNode, graph)
    if (adjacentNodes.length === 0 || startNode === endNode) return visitedNodesInOrder
    for (const node of adjacentNodes) {
        visitedNodesInOrder = [...visitedNodesInOrder, ...depthFirstSearch(graph, node, endNode)] 
        node.previous = startNode
        node.distance = startNode.distance + 1
        const len = visitedNodesInOrder.length
        if (visitedNodesInOrder[len-1] === endNode) break
    }
    return visitedNodesInOrder
} 


const getAdjacentNodes =(node, graph) => {
    const X = node.row
    const Y = node.col
    const results = []
    if (X > 0 && !graph[X-1][Y].visited && !graph[X-1][Y].isWall) results.push(graph[X-1][Y]) 
    if (Y < graph[0].length - 1 && !graph[X][Y+1].visited && !graph[X][Y+1].isWall) results.push(graph[X][Y+1])
    if (X < graph.length - 1 && !graph[X+1][Y].visited && !graph[X+1][Y].isWall) results.push(graph[X+1][Y])
    if (Y > 0 && !graph[X][Y-1].visited && !graph[X][Y-1].isWall) results.push(graph[X][Y-1])
    return results.filter(node => !node.visited)
}

