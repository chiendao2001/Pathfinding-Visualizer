import './button.css'

const Clear = props => {
    return (
        <button class = 'button' type="button" 
            class= {`btn ${props.isDisabled ? 'red' : 'btn-primary'}`}         
            disabled = {props.isDisabled}
            onClick = {() => props.removeWalls()}>Clear Wall
        </button>
    )
}

export default Clear