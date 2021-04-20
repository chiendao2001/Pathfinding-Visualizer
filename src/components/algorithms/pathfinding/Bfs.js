export const breadthFirstSearch = (graph, startNode, endNode) => {
    startNode.distance = 0
    startNode.visited = true
    let callStack = [startNode]
    const visitedNodesInOrder = []
    while (callStack.length > 0) {
        const current = callStack.shift()
        visitedNodesInOrder.push(current)
        if (current === endNode) {
            callStack.forEach(node => {
                node.visited = false
                node.previous = null
                node.distance = Number.MAX_VALUE
            })
            return visitedNodesInOrder 
        }
        const adjacentNodes = getAdjacentNodes(current, graph)
        adjacentNodes.forEach(node => {
            node.visited = true
            node.previous = current
            node.distance = current.distance + 1
        })
        callStack = [...callStack, ...adjacentNodes]
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

// console.log(breadthFirstSearch(graph, node1, node9))

