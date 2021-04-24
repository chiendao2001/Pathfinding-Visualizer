import { useEffect, useState} from 'react'
import Node from './node/Node'
import {getShortestPath, dijkstra} from './algorithms/pathfinding/Dijkstra.js'
import {aStar} from './algorithms/pathfinding/A*'
import {breadthFirstSearch} from './algorithms/pathfinding/Bfs'
import {depthFirstSearch} from './algorithms/pathfinding/Dfs'
import {recursiveDivide} from './algorithms/mazes/Recursive'
import {Prim} from './algorithms/mazes/Prim'
import Nav from './nav/Nav'
import {animateNodes, drawVisitedNodes, chooseArrow, drawMaze} from './Animations'
import Guide from './guide/Guide'
import './styles.css'
import circle from './node/circle.svg'

const Visualizer = () => {  
    const [grid, setGrid] = useState([[]])  
        
    const [isPressed, setIsPressed] = useState(false)

    const [previousWall, setPreviousWall] = useState(null)

    const [startButton, setStartButton] = useState(false)
    const [finishButton, setFinishButton] = useState(false)

    const [isPathFound, setIsPathFound] = useState(false)

    const [algorithm, setAlgorithm] = useState('')

    //The status to disable all activities on the grid (draw maze, draw or remove walls, 
    //move node, visualize the path...) if the visualization is running or the maze is being drawn
    const [isDisabled, setIsDisabled] = useState(true)

    const [startRow, setStartRow] = useState(3)
    const [startCol, setStartCol] = useState(1)
    const [finishRow, setFinishRow] = useState(3)
    const [finishCol, setFinishCol] =  useState(7)

    const [visitedNodes, setVisitedNodes] = useState([])

    const [isGuideFinished, setIsGuideFinished] = useState(false)

    let WIDTH = Math.floor(document.documentElement.clientWidth/25)

    if (!(WIDTH % 2)) WIDTH += 1

    let HEIGHT = Math.floor(document.documentElement.clientHeight/40)
    
    if (!(HEIGHT % 2)) HEIGHT += 1

    const mazeSpeed = 5
    const pathSpeed = 50
    const nodeSpeed = 10

    console.log(document.documentElement.clientWidth/25)

    useEffect(() => setGrid(createGrid()),[])
    // grid != null && console.log(grid)
    const handleMouseDown = (row, col) => {
        let newGrid = grid

        //Check if the start or the finish node is pressed
        const isStartNode = row === startRow && col === startCol
        const isEndNode = row === finishRow && col === finishCol
        

        //Draw or remove wall if the node is neither start node nor finish node
        if (!(isStartNode || isEndNode || isDisabled)) {         
            const classes = document.getElementById(`${row}-${col}`).classList
            classes.contains('wall') ? classes.remove('wall') : classes.add('wall')
            newGrid[row][col].isWall = !newGrid[row][col].isWall
        }
        setIsPressed(!(isStartNode || isEndNode || isDisabled))
        //Move the start node
        let newIsDisabled = false
        setStartButton(prev => {
            if (prev) {
                const classes = document.getElementById(`${row}-${col}`).classList
                classes.remove('wall')
                newGrid[row][col].isWall = false
                return !prev
            }
            newIsDisabled = true
            return (isStartNode && !isDisabled) 
        })

        //Move the finish node
        setFinishButton(prev => {
            if (prev) {
                const classes = document.getElementById(`${row}-${col}`).classList
                classes.remove('wall')
                newGrid[row][col].isWall = false
                return !prev
            }
            newIsDisabled = true
            return (isEndNode && !isDisabled)
        })
        // newGrid[startRow][startCol].isArrow = true
        setGrid(newGrid)
        setIsDisabled(newIsDisabled)
        setPreviousWall(null)
    }

    const handleMouseEnter = (row, col) => { 
        //Check is the node is start or finish 
        let newGrid = grid
        const isStartNode = row === startRow && col === startCol
        const isEndNode = row === finishRow && col === finishCol

        //Add or remove wall if the node is neither start nor finish
        if (isPressed && !(isStartNode || isEndNode)) {
            const classes = document.getElementById(`${row}-${col}`).classList
            classes.contains('wall') ? classes.remove('wall') : classes.add('wall')
            newGrid[row][col].isWall = !newGrid[row][col].isWall
        } 

        //Update start node
        const newStartRow = startButton && !isEndNode ? row : startRow
        const newStartCol = startButton && !isEndNode  ? col : startCol
        setStartCol(newStartCol)
        setStartRow(newStartRow)
        if (newGrid[0].length > 0 && !newGrid[row][col].isStart) {
            newGrid[startRow][startCol].isStart = !(startButton && !isEndNode)
            newGrid[row][col].isStart = startButton && !isEndNode    
        }
        
        //Update finish node
        const newFinishRow = finishButton && !isStartNode ? row : finishRow
        const newFinishCol = finishButton && !isStartNode ? col : finishCol 
        setFinishCol(newFinishCol)
        setFinishRow(newFinishRow)
        if (newGrid[0].length > 0 && !newGrid[row][col].isFinish) {
            newGrid[finishRow][finishCol].isFinish = !(finishButton && !isStartNode)
            newGrid[row][col].isFinish = finishButton && !isStartNode
        }
        
        //Find a new path if the start or finish node is moved to a new place
        let newVisitedNodes = visitedNodes
        if (startButton || finishButton) {
            let newPreviousWall = null
            if (previousWall != null) {
                previousWall.isWall = true
                document.getElementById(`${previousWall.row}-${previousWall.col}`).classList.add('wall')
            }
            if (newGrid[row][col].isWall) {
                newPreviousWall = newGrid[row][col]
                document.getElementById(`${row}-${col}`).classList.remove('wall')
                newGrid[row][col].isWall = false
            } 
            setPreviousWall(newPreviousWall)
            if (isPathFound) {
                //Remove the current visited nodes and path
                newVisitedNodes = removeVisitedNodes(newVisitedNodes)        
                //Find new visited nodes and path
                let newStartNode
                let newEndNode
                newGrid[finishRow][finishCol].isArrow = false
                newStartNode = startButton ? newGrid[row][col] : newGrid[startRow][startCol] 
                newEndNode = startButton ? newGrid[finishRow][finishCol] : newGrid[row][col]
                newVisitedNodes =  runPathfindingAlgorithm(newGrid, newStartNode, newEndNode)
                newVisitedNodes.forEach(node => drawVisitedNodes(node))
                const newPath = getShortestPath(newStartNode, newEndNode)
                if (newPath !== null) {
                    newPath.forEach(node => {
                        document.getElementById(`${node.row}-${node.col}`).classList.add('path')
                    })
                    // props.direction
                    if (newPath[1].row > newPath[0].row) newPath[0].direction = 'down'
                    else if (newPath[1].row < newPath[0].row) newPath[0].direction = 'up'
                    else if (newPath[1].col > newPath[0].col) newPath[0].direction = 'right'
                    else if (newPath[1].col < newPath[0].col) newPath[0].direction = 'left'

                    const endNode = newPath[newPath.length - 1]
                    const nearEndNode = endNode.previous
                    endNode.isArrow = true
                    if (endNode.row > nearEndNode.row) endNode.direction = 'down'
                    else if (endNode.row < nearEndNode.row) endNode.direction = 'up'
                    else if (endNode.col > nearEndNode.col) endNode.direction = 'right'
                    else if (endNode.col < nearEndNode.col) endNode.direction = 'left'
                }
            }
        } 
        setVisitedNodes(newVisitedNodes)
        setGrid(newGrid)
    }

    //Remove all the current visited nodes
    const removeVisitedNodes = visitedNodes => {
        visitedNodes.forEach(
            node => {
                const classes = document.getElementById(`${node.row}-${node.col}`).classList
                classes.remove('visited')
                classes.remove('path')
            })   
        visitedNodes.forEach(node => {
            node.visited  = false
            node.distance = Number.MAX_VALUE
            node.previous = null
            })
        return []
    }

    const handleMouseUp = () => {
        setIsPressed(false)     
    }

    //Run the algorithm that the user chooses
    const runPathfindingAlgorithm = (grid, startNode, endNode) => {
        if (algorithm === 'A*') return aStar(grid, startNode, endNode)
        if (algorithm === 'Dijkstra') return dijkstra(grid, startNode, endNode)
        if (algorithm === 'Breadth First Search') return breadthFirstSearch(grid, startNode, endNode)
        else if(algorithm === "Depth First Search") return depthFirstSearch(grid, startNode, endNode)
        return null
    } 

    const createRow = row => Array(WIDTH).fill().map((item, col) => createNode(col, row))

    const createNode = (col, row) => ({
                                        col: col, 
                                        row: row, 
                                        isStart: col === startCol && row === startRow,
                                        isFinish: col === finishCol && row === finishRow,
                                        isWall: false,
                                        visited: false,
                                        direction: 'right',
                                        isArrow: false,
                                        distance: Number.MAX_VALUE,
                                        totalDistance: Number.MAX_VALUE
                                      })

    const createGrid = () => Array(HEIGHT).fill().map((item, index) => createRow(index))

    //Remove all walls
    const removeWalls = () => {
        const newGrid = grid
        newGrid.forEach(row => row.forEach(node => node.isWall = false))
        setGrid(newGrid)
        const nodes = document.getElementsByClassName('node')
        for (const node of nodes) {
            node.classList.remove('wall')
        }
    }    

    //Remove all the visited nodes and the shortest path found (equivalent to reset)
    const reset = () => {
        const nodes = document.getElementsByClassName('node')
        for (const node of nodes) {
            node.classList.remove('wall')
            node.classList.remove('path')
            node.classList.remove('visited')
        }
        setGrid(grid => grid.map(row => row.map(node => 
            ({...node, isWall: false, 
                visited: false,
                distance: Number.MAX_VALUE,
                totalDistance: Number.MAX_VALUE
            }))))

        const endNode = grid[finishRow][finishCol]
        endNode.isArrow = false
        document.getElementById(`${endNode.row}-${endNode.col}`).childNodes[0].src = circle

        setIsPathFound(false)
    }

    //Set all the nodes on the border to walls 
    const setBorderToWall = grid => {
        //Move the start or finish node if it is on the border
        let [newStartRow, newStartCol] = moveNodeFromBorder(startRow, startCol)
        let [newFinishRow, newFinishCol] = moveNodeFromBorder(finishRow, finishCol)

        //Move the finish node if the start and finish node are at the same position 
        if(newStartCol === newFinishCol && newStartRow === newFinishRow) {
            if (newStartCol < WIDTH - 2) newFinishCol += 1
            else newFinishCol -= 1
        }

        grid[startRow][startCol].isStart = false
        grid[newStartRow][newStartCol].isStart = true
        grid[finishRow][finishCol].isFinish = false
        grid[newFinishRow][newFinishCol].isFinish = true

        setStartRow(newStartRow)
        setStartCol(newStartCol)
        setFinishCol(newFinishCol)
        setFinishRow(newFinishRow)

        //Set the wall to true for all border nodes
        for (let i = 0; i < HEIGHT; i++) {
            grid[i][WIDTH - 1].isWall = true
            grid[i][0].isWall = true
        }

        for (let i = 0; i < WIDTH; i++) {
            grid[0][i].isWall = true
            grid[HEIGHT - 1][i].isWall = true
        }
    }

    //Set new row and col for the start or finish node to the adjacent position if it is on the border
    const moveNodeFromBorder = (row, col) => {
        const newCol = col === 0 ? 1 : (col === WIDTH - 1 ? WIDTH - 2 : col)
        const newRow = row === 0 ? 1 : (row === HEIGHT - 1 ? HEIGHT - 2 : row)
        return [newRow, newCol]
    }

    const findNewMaze = type => {
        reset()
        setIsDisabled(true)
        const newGrid = grid.map(row => row.map(node => 
            ({...node, isWall: false, visited: false, distance: Number.MAX_VALUE})))
        setBorderToWall(newGrid)
        if (type === 'recursive') recursiveDivide(newGrid, 1, HEIGHT - 2, 1, WIDTH - 2)
        else Prim(newGrid, newGrid[startRow][startCol], newGrid[finishRow][finishCol])
        setGrid(newGrid)
        drawMaze(newGrid, mazeSpeed)
        setTimeout(() => {
            setIsDisabled(false)
        }, mazeSpeed * ((WIDTH + HEIGHT) * 2 + (newGrid.length * newGrid[0].length)))
    }

    const visualize = () => {
        grid[finishRow][finishCol].isArrow = false
        setIsDisabled(true)
        const nodes = runPathfindingAlgorithm(grid, grid[startRow][startCol], grid[finishRow][finishCol])
        setVisitedNodes(nodes)
        let path
        if (nodes != null && nodes.length !== 0) {
            path = getShortestPath(grid[startRow][startCol], grid[finishRow][finishCol])
            animateNodes(nodes, path, nodeSpeed, pathSpeed)
        }
        setTimeout(() => {
            setIsDisabled(false)
            setIsPathFound(true)
        }, nodeSpeed * nodes.length + ( path != null ? pathSpeed * path.length : 0));
    }

    const setAlgorithmName = newName => {
        setAlgorithm(newName)
    }

    const finishGuide = () => {
        setIsGuideFinished(true)
        setIsDisabled(false)
    }

    return (
        <>     
            <Nav isDisabled = {isDisabled} findNewMaze = {type => findNewMaze(type)}
                 setAlgorithm = {newName => setAlgorithmName(newName)}
                 algorithm = {algorithm}
                 visitedNodes = {visitedNodes}
                 removeVisitedNodes = {removeVisitedNodes}
                 visualize = {visualize}
                 removeWalls = {removeWalls}
                 reset = {reset}>
            </Nav>
            {!isGuideFinished && <Guide finishGuide = {finishGuide}/>}
            <div id = 'grid'>
            {grid.map((row, index) =>
                <div className = 'row' key = {index}>
                    {row.map((node, index) =>
                    <Node   key = {index}
                            col = {node.col}
                            row = {node.row}
                            isStart = {node.isStart}
                            isFinish = {node.isFinish}
                            isWall = {node.isWall}
                            visited = {node.visited}
                            distance = {node.distance}
                            totalDistance = {node.totalDistance}
                            direction = {node.direction}
                            isArrow = {node.isArrow}
                            onMouseDown = {handleMouseDown}
                            onMouseUp = {handleMouseUp}
                            onMouseEnter = {handleMouseEnter}/>
                            )
                    }
                </div>)}        
            </div>
        </>
    )
}

export default Visualizer