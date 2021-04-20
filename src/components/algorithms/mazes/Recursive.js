 export const recursiveDivide = (graph, startRow, endRow, startCol, endCol) => {
    const height = endRow - startRow + 1
    const width = endCol - startCol + 1
    if ((width < 2 || height < 2) || (width === 2 && height === 2)) return 
    //Draw a vertical wall if the height is less than the width
    if (width > height) verticalDivide(graph, startRow, endRow, startCol, endCol)
    //Draw a horizontal wall if the height is less than the width
    else if (width < height) horizontalDivide(graph, startRow, endRow, startCol, endCol)
    //Choose randomly a horizontal or vertical wall to build if height equals width
    else {
        const randomDivision = Math.round(Math.random())
        randomDivision ? horizontalDivide(graph, startRow, endRow, startCol, endCol) 
                       : verticalDivide(graph, startRow, endRow, startCol, endCol) 
    }
}

const horizontalDivide = (graph, startRow, endRow, startCol, endCol) => {
    const height = endRow - startRow + 1
    const width = endCol - startCol + 1

    let wallIndex = Math.floor(Math.random() * (height - 2)) + startRow + 1
    if (height > 7) wallIndex = Math.floor(Math.random() * (height-6)) + startRow + 3
    // else if (height === 6) wallIndex = Math.floor(Math.random() * 3) + startRow + 1
    // else if (height === 5) 

    let isThrough = false
    if ((endCol < graph[0].length - 1 && !graph[wallIndex][endCol + 1].isWall)
        || graph[wallIndex][endCol].isStart || graph[wallIndex][endCol].isFinish) isThrough = true
    else graph[wallIndex][endCol].isWall = true    

    if ((startCol > 0 && !graph[wallIndex][startCol - 1].isWall)
        || graph[wallIndex][startCol].isStart || graph[wallIndex][startCol].isFinish) isThrough = true
    else graph[wallIndex][startCol].isWall = true

    for (let i = startCol + 1; i < endCol; i++) {
        if (graph[wallIndex][i].isStart || graph[wallIndex][i].isFinish) {
            isThrough = true
        } else graph[wallIndex][i].isWall = true
    }
    if (!isThrough) {
        const gateIndex = Math.floor(Math.random() * width) + startCol
        graph[wallIndex][gateIndex].isWall = false
    }
    //Draw a gate to get through the wall    
    recursiveDivide(graph, startRow, wallIndex - 1, startCol, endCol)
    recursiveDivide(graph, wallIndex + 1, endRow, startCol, endCol)   
}

const verticalDivide = (graph, startRow, endRow, startCol, endCol) => {
    const height = endRow - startRow + 1
    const width = endCol - startCol + 1

    let wallIndex = Math.floor(Math.random() * (width - 2)) + startCol + 1
    if (width > 7) wallIndex = Math.floor(Math.random() * (width-6)) + startCol + 3

    let isThrough = false
    if ((startRow > 0 && !graph[startRow - 1][wallIndex].isWall)
        || graph[startRow][wallIndex].isStart || graph[startRow][wallIndex].isFinish) isThrough = true
    else graph[startRow][wallIndex].isWall = true
    if ((endRow < graph.length - 1 && !graph[endRow + 1][wallIndex].isWall)
        || graph[endRow][wallIndex].isStart || graph[endRow][wallIndex].isFinish) isThrough = true
    else graph[endRow][wallIndex].isWall = true


    for (let i = startRow + 1; i < endRow; i++) {
        if (graph[i][wallIndex].isStart || graph[i][wallIndex].isFinish) isThrough = true
        else graph[i][wallIndex].isWall = true
    }
    if (!isThrough) {
        const gateIndex = Math.floor(Math.random() * height) + startRow
        graph[gateIndex][wallIndex].isWall = false
    }

    //Draw a gate to get through the wall
    recursiveDivide(graph, startRow, endRow, startCol, wallIndex - 1)
    recursiveDivide(graph,startRow, endRow, wallIndex + 1, endCol)
}



