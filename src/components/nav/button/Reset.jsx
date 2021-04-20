import './button.css'

const Reset = props => {
    return (
        <button type= "button" 
                class= {`btn 'button' ${props.isDisabled ? 'red' : 'btn-primary'}`}         
                disabled = {props.isDisabled}
                onClick = {() => {
                    props.reset()}}>
                Clear Grid
        </button>
    )
}

export default Reset