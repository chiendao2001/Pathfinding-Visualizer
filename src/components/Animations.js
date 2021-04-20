import right from './node/triangletwo-right.svg'
import left from './node/triangletwo-left.svg'
import up from './node/triangletwo-up.svg'
import down from './node/triangletwo-down.svg'

//Animate the nodes visited in the process of finding the shortest path
export const animateNodes = (nodes, path, nodeSpeed, pathSpeed) => {
    for (let i = 0; i <= nodes.length; i++) {
        if (i === nodes.length) {
            setTimeout(() => {
                path != null && animatePath(path, pathSpeed)
            }, nodeSpeed * i)
        }
        else setTimeout(() => {
            drawVisitedNodes(nodes[i])
        }, nodeSpeed * i);
    }
}

//Animate the shortest path
const animatePath = (path, pathSpeed) => {
    const pathLength = path.length
    const startNode = document.getElementById(`${path[0].row}-${path[0].col}`)
    startNode.classList.add('path')
    if (path[1].row > path[0].row) startNode.childNodes[0].src = down
    else if (path[1].row < path[0].row) startNode.childNodes[0].src = up
    else if (path[1].col > path[0].col) startNode.childNodes[0].src = right
    else if (path[1].row < path[0].row) startNode.childNodes[0].src = left
  
    for (let i = 1; i < pathLength - 1; i++) {
        setTimeout(() => {
            drawPath(path[i])
        }, pathSpeed * i);
    }
    const endNode = path[pathLength - 1]
    const endNodeOnGrid = document.getElementById(`${endNode.row}-${endNode.col}`)
    setTimeout(() => {
        endNodeOnGrid.classList.add('path')
        endNodeOnGrid.childNodes[0].src = chooseArrow(endNode.previous, endNode)
        const nearEndNode = endNode.previous
        const nearEndNodeOnGrid = document.getElementById(`${nearEndNode.row}-${nearEndNode.col}`)
        nearEndNodeOnGrid.removeChild(nearEndNodeOnGrid.childNodes[0])
    }, pathSpeed * (pathLength - 1));
}

//Choose the direction of the arrow (left, right, up, or down) 
export const chooseArrow = (previousNode, node) => {
    const current = document.getElementById(`${node.row}-${node.col}`)
    if (node.row > previousNode.row) return down
    if (node.row < previousNode.row) return up
    if (node.col > previousNode.col) return right
    return left
}

export const drawVisitedNodes = node => {
    document.getElementById(`${node.row}-${node.col}`).classList.add('visited')
}

//Draw a node in the path 
export const drawPath = node => {
    document.getElementById(`${node.row}-${node.col}`).classList.add('path')
    const elem = document.createElement("img");
    elem.className = 'arrow'
    elem.src = chooseArrow(node.previous, node)
    document.getElementById(`${node.row}-${node.col}`).appendChild(elem)
    if (!node.previous.isStart) {
        const previousNode = document.getElementById(`${node.previous.row}-${node.previous.col}`)
        previousNode.removeChild(previousNode.childNodes[0])
    }    
}

//Draw the border of the maze
const drawBorder = (grid, mazeSpeed) => {
    const HEIGHT = grid.length
    const WIDTH = grid[0].length
    for (let i = 0; i < HEIGHT; i++) {
        setTimeout(() => {
            document.getElementById(`${i}-${WIDTH - 1}`).classList.add('wall')

        }, mazeSpeed * (WIDTH + i))       
        setTimeout(() => {
            document.getElementById(`${HEIGHT- 1 - i}-0`).classList.add('wall')
        }, mazeSpeed * (2 * WIDTH + HEIGHT + i))
    }

    for (let i = 0; i < WIDTH; i++) {
        grid[HEIGHT - 1][i].isWall = true
        setTimeout(() => {
            document.getElementById(`0-${i}`).classList.add('wall')
        }, mazeSpeed * i)  
        setTimeout(() => {
            document.getElementById(`${HEIGHT-1}-${WIDTH - 1 - i}`).classList.add('wall')
        }, mazeSpeed * (HEIGHT + WIDTH + i))        
    }
}

//Draw maze
export const drawMaze = (grid, mazeSpeed) => {
    const HEIGHT = grid.length
    const WIDTH = grid[0].length
    drawBorder(grid, mazeSpeed)
    setTimeout(() => {
        for (let i = 1; i < grid.length - 1; i ++) {
            for (let j = 1; j < grid[i].length - 1; j++) {
                 if (grid[i][j].isWall) {
                     setTimeout(() => {
                         document.getElementById(`${i}-${j}`).classList.add('wall')
                     }, mazeSpeed * (j * grid.length + i))
                 }
            }
        }
    }, (WIDTH + HEIGHT) * mazeSpeed * 2)
}