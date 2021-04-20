export const Prim = (graph, startNode, endNode) => {
    let randomRow
    let randomCol
    
    do {
        randomRow = Math.floor(Math.random() * graph.length)
        randomCol = Math.floor(Math.random() * graph[0].length)
        
    } while (!(randomRow % 2) || !(randomCol % 2))

    const frontier = [graph[randomRow][randomCol]]

    for (let row = 1; row < graph.length; row += 2) {
        for (let col = 1; col < graph[0].length; col += 2) {
            graph[row][col].isConnected = false
            graph[row][col].isWall = false
            graph[row][col].isFront = false
            if (col < graph[0].length - 1)  {
                graph[row][col + 1].isWall = true
                // graph[row][col + 1].isFront
            }
            if (row < graph.length - 1) graph[row + 1].forEach(node => node.isWall = true)
        }
    } 

    while (frontier.length !== 0) {
        const removedIndex = Math.floor(Math.random() * frontier.length)
        const neighbor = frontier[removedIndex]
        frontier.splice(removedIndex, 1)
        const neighbors = getNeighbors(graph, neighbor)
        //Add nodes that are not already connected or adjacent to connected nodes to frontier 

        const nodesToFrontier = neighbors.filter(node => !node.isConnected && !node.isFront)
        while (nodesToFrontier.length) {
            const nodeIndex = Math.floor(Math.random() * nodesToFrontier.length)
            const node = nodesToFrontier[nodeIndex]
            node.isFront = true
            nodesToFrontier.splice(nodeIndex, 1)
            frontier.push(node)
        }
        neighbor.isConnected = true
        neighbor.isFront = false

        const nodesToConnect = neighbors.filter(node => node.isConnected)
        if (nodesToConnect.length !== 0) {
            const randomNeighbor = nodesToConnect[Math.floor(Math.random() * nodesToConnect.length)]
            let nodeToConnect
            if (randomNeighbor.row === neighbor.row) {
                nodeToConnect = graph[neighbor.row][(neighbor.col + randomNeighbor.col) / 2]
            } else {
                nodeToConnect = graph[(neighbor.row + randomNeighbor.row) / 2][neighbor.col]            
            }
            nodeToConnect.isConnected = true
            nodeToConnect.isWall = false
        }
        startNode.isWall = false
        endNode.isWall = false
    }
}

const getNeighbors = (graph, node) => {
    const row = node.row
    const col = node.col 
    const neighbors = []
    if (row - 2 >= 0) neighbors.push(graph[row - 2][col])
    if (row + 2 < graph.length) {
        neighbors.push(graph[row + 2][col]) 
    }
    if (col - 2 >= 0) neighbors.push(graph[row][col - 2])
    if (col + 2 < graph[0].length) neighbors.push(graph[row][col + 2])
    return neighbors
}


