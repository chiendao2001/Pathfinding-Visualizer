const Pathfinding = props => {
    return (
        <div class="btn-group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Algorithms
            </button>
            <ul class="dropdown-menu">
                <li class="dropdown-item" onClick = {() => props.setAlgorithm('A*')}>
                    A* Algorithm
                </li>
                <li class="dropdown-item" onClick = {() => props.setAlgorithm('Dijkstra')}>
                    Dijkstra's algorithm
                </li>
                <li class="dropdown-item" onClick = {() => props.setAlgorithm('Breadth First Search')}>
                    Breadth First Search
                </li>
                <li class = "dropdown-item" onClick = {() => props.setAlgorithm('Depth First Search')}>
                    Depth First Search
                </li>
            </ul>
        </div> 
    )
}

export default Pathfinding