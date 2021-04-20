export const aStar = (graph, startNode, endNode) => {
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(graph)
    const visitedNodesInOrder = []
    for (const row of graph) {
        for (const node of row) {
            calculateEstimatedDistance(node, endNode)
            calculateTotalDistance(node)
        }
    }
    while (unvisitedNodes.length > 0) {
        sortNodes(unvisitedNodes)
        //Get the node with smallest distance to the starting node
        const minNode = unvisitedNodes.shift()
        //Return if there is the smallest distance if infinity (a.k.a no path to the finish node)
        if (minNode.totalDistance === Number.MAX_VALUE) {
            for (const node of unvisitedNodes) {
                if (node.previous == null) break
                node.distance = Number.MAX_VALUE
                node.previous = false
            }
            return visitedNodesInOrder 
        }
        //Update the distance of all nodes adjacent to the current node in the unvisitedNodes
        //Put the visited node to the finished array
        minNode.visited = true
        visitedNodesInOrder.push(minNode)
        if (minNode === endNode) {
            for (const node of unvisitedNodes) {
                if (node.previous == null) break
                node.distance = Number.MAX_VALUE
                node.previous = false
                node.totalDistance = Number.MAX_VALUE
            }
            return visitedNodesInOrder 
        }
        updateAdjacentNodes(minNode, graph)     
    }
    return visitedNodesInOrder
}

//Calculated the estimated distance from one node to the end node 
const calculateEstimatedDistance = (node, endNode) => 
    node.estimatedDistance = Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col)

//Calculated the total distance from one node to the end node (total distance = distance to start + distance to finish)
const calculateTotalDistance = node => node.totalDistance = node.distance + node.estimatedDistance

// const sortNodes = nodes => nodes.sort((a,b) => a.totalDistance - b.totalDistance)
const sortNodes = nodes => nodes.sort((a,b) =>
    a.totalDistance - b.totalDistance === 0 ? a.estimatedDistance - b.estimatedDistance
                                            : a.totalDistance - b.totalDistance )

const updateAdjacentNodes = (node, graph) => {
    const adjacentNodes = getAdjacentNodes(node, graph)
    for (const adjacentNode of adjacentNodes) {
        adjacentNode.distance = node.distance + 1
        calculateTotalDistance(adjacentNode)
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

const getAllNodes = grid => {
    const nodes = []
    for (const row of grid) {
        for (const node of row) nodes.push(node)
    }
    return nodes
}


