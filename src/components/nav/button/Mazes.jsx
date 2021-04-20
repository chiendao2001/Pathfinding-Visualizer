import './button.css'

const Maze = props => {
    return (
        <div class="btn-group">
            <button type="button"   
                    disabled = {props.disabled}
                    class= 'btn dropdown-toggle button btn-primary'
                    data-bs-toggle="dropdown" 
                    aria-expanded="false">
                Mazes
            </button>
            <ul class="dropdown-menu">
                <li class="dropdown-item" onClick = {() => props.findNewMaze('Prim')}>Prim</li>
                <li class="dropdown-item" onClick = {() => props.findNewMaze('recursive')}> Recursive Division</li>
            </ul>
        </div> 
    )

}

export default Maze