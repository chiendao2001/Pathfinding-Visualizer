import './button.css'

const Visualize = props => {
    return (
        <button type="button" 
                class= {`btn ${props.isDisabled || props.algorithm.length === 0 ? 'red' : 'btn-primary'}`}         
                disabled = {props.isDisabled || props.algorithm.length === 0} 
                onClick = {() => {
                        props.removeVisitedNodes(props.visitedNodes)
                        props.visualize()}}>
                {props.algorithm.length === 0 ? "Pick an algorithm" : `Visualize ${props.algorithm}!`}
        </button>
    )
}

export default Visualize 