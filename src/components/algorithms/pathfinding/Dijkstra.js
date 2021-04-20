//Dijkstra algorithm (find shortest path between a starting node and the finishing node in the graph)
export const dijkstra = (graph, startNode, endNode) => {
    // console.log(graph)
    // console.log(startNode)
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(graph)
    const visitedNodesInOrder = []
    while (unvisitedNodes.length > 0) {
        sortNodes(unvisitedNodes)
        //Get the node with smallest distance to the starting node
        const minNode = unvisitedNodes.shift()
        //Return if there is the smallest distance if infinity (a.k.a no path to the finish node)
        if (minNode.distance === Number.MAX_VALUE) {
            for (const node of unvisitedNodes) {
                if (node.previous == null) break
                node.distance = Number.MAX_VALUE
                node.previous = false
            }
            return visitedNodesInOrder 
        }
        minNode.visited = true
        visitedNodesInOrder.push(minNode)
        //Update the distance of all nodes adjacent to the current node in the unvisitedNodes
        if (minNode === endNode) { 
            for (const node of unvisitedNodes) {
                if (node.previous == null) break
                node.distance = Number.MAX_VALUE
                node.previous = false
            }
            return visitedNodesInOrder
        }
        updateAdjacentNodes(minNode, graph)    
    }
    console.log(visitedNodesInOrder)
    return visitedNodesInOrder
}

//Update the distance of adjacent nodes when a node is visited
const updateAdjacentNodes = (node, graph) => {
    const adjacentNodes = getAdjacentNodes(node, graph)
    for (const adjacentNode of adjacentNodes) {
        adjacentNode.distance = node.distance + 1
        adjacentNode.previous = node
    }
}

//Get all the adjacent nodes of a node that have not been visited yet 
const getAdjacentNodes = (node, graph) => {
    const X = node.row
    const Y = node.col
    const results = []
    if (X > 0 && node.distance < graph[X-1][Y].distance && !graph[X-1][Y].isWall) results.push(graph[X-1][Y]) 
    if (X < graph.length - 1 && node.distance < graph[X+1][Y].distance && !graph[X+1][Y].isWall) results.push(graph[X+1][Y])
    if (Y > 0 && node.distance < graph[X][Y-1].distance && !graph[X][Y-1].isWall) results.push(graph[X][Y-1])
    if (Y < graph[0].length - 1 && node.distance < graph[X][Y+1].distance && !graph[X][Y+1].isWall) results.push(graph[X][Y+1])
    return results.filter(node => !node.visited)
}

//Get all nodes in the grid 
const getAllNodes = grid => {
    const nodes = []
    for (const row of grid) {
        for (const node of row) nodes.push(node)
    }
    return nodes
}

//Arrange all the nodes in increasing order of distance
const sortNodes = nodes => nodes.sort((a,b) => a.distance - b.distance)

//Get shortest path (use only after calling a pathfinding algorithm)
export const getShortestPath = (startNode, endNode) => {
    if (endNode.previous === null || endNode.visited === false || endNode.distance === Number.MAX_VALUE) {
        return null 
    }
    const path = []
    let current = endNode
    while (true) {
        path.unshift(current)
        if (current === startNode) break
        current = current.previous
    } 
    return path
}


