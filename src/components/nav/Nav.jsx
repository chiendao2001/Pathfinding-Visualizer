import Maze from './button/Mazes'
import Pathfinding from './button/Pathfinding'
import Visualize from './button/Visualize'
import Clear from './button/Clear'
import Reset from './button/Reset'

const Nav = props => {
    return (
        <nav class= "navbar navbar-dark bg-primary">
            <div class="container-fluid navbar-brand">
                Pathfinding Visualizer
            </div>
            <Maze disabled = {props.isDisabled} findNewMaze = {props.findNewMaze}/>
            <Pathfinding setAlgorithm = {props.setAlgorithm}/>
            <Visualize  removeVisitedNodes = {props.removeVisitedNodes}
                        isDisabled = {props.isDisabled}
                        algorithm = {props.algorithm}
                        visualize = {props.visualize}
                        visitedNodes = {props.visitedNodes}/>
            <Clear isDisabled = {props.isDisabled} removeWalls = {props.removeWalls}/>
            <Reset  isDisabled = {props.isDisabled}
                    reset = {props.reset} />
        </nav>
    )
}

export default Nav