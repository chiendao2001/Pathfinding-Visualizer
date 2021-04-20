import './Node.css'
import right from './triangletwo-right.svg'
import left from './triangletwo-left.svg'
import up from './triangletwo-up.svg'
import down from './triangletwo-down.svg'
import finish from './circle.svg'

const Node = props => {
    const setDirection = () => {
        console.log(props)
        if (props.direction === 'right') return right
        if (props.direction === 'left') return left
        if (props.direction === 'down') return down
        return up
    }
    return  <div id = {`${props.row}-${props.col}`} 
                className = 'node'
                onMouseDown = {() => props.onMouseDown(props.row, props.col)}
                onMouseUp = {() => props.onMouseUp()}
                onMouseEnter = {() => props.onMouseEnter(props.row, props.col)}>
                {(props.isArrow || props.isStart) &&  <img class = 'start arrow' src= {setDirection()} alt="img"/>}
                {(props.isFinish && !props.isArrow) &&  <img className = 'finish' src= {finish} alt="img"/>}
            </div>
}

export default Node