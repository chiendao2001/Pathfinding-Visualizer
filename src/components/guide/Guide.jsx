import { useState } from "react"
import './guide.css'

const Guide = props => {
    const [step, setStep] = useState(0)

    const headers = [
                        'Welcome to Pathfinding Visualizer!', 
                        'Introduction', 
                        'Pick an algorithm', 
                        'Graph Theory 101' ,
                        "Ready to visualize!", 
                        'Move your nodes',
                        'Add more obstacles!',
                        'Clean up your space',
                        'This feafure will aMAZE you!', 'The end.'
    ]

    const leads = [
        'This short guide will show you all the cool features',
        'Pathfinding algorithms are used to find the shortest path from one vertex to another in a graph.',
        'Click the "algorithms" button to expand the options.',
        "Let's meet our famous pathfinding algorithms",
        'Click the "visualize" button to run the algorithm.',
        'Click the start/end node and move your mouse to a new position.',
        'A plain grid is just too boring! Click and drag all over the grid to add or remove more walls',
        'Click the "clear wall" or "clear grid" button to restart',
        'Click the "maze" button to select a maze for the grid.',
        'Time to explore some algorithms! Have fun with the magic of graph theory.' 
    ]

    const guides =  [
                        "Don't worry if you have no idea what pathfinding is! You can think of this visualization tool as a fun simulation game.",
                        "But it is too confusing with all the dots going on! Don't run away because we could learn it the fun way.",
                        'There are four algorithms in total. Each of them is unique and you can see that demonstrated clearly in the visualization process',
                        {
                            'A Star': 'Maybe the most popular pathfinding algorithm. Use heuristics to find the path within a short amount of time',
                            'Dijkstra': 'A classic algorithm that guarantees the shortest path.',
                            'Breadth First Search': 'Explore the adjacent nodes first. Guarantee the shortest path.',
                            'Depth First Search': 'Dive in as deep as possible. Not guarantee the shortest path'
                        },
                        'Blue indicates that the node has been visited in the pathfinding process. Yellow indicates the actual path from the start to the end point',
                        'If you place it on a wall, that wall will be removed. If you already run an algorithm, moving the nodes around will show the new path.',
                        'Walls are impenetrable. If your node meets a wall in the pathfinding process, it will have to find a new (and longer) path',
                        '"Clear wall" will remove all the existing walls on the grid. "Clear Grid" will delete everything, including the visited nodes and path.',
                        'There are two types of mazes for you (Prim is also an important algorithm in graph theory). The process of creating a maze will start immediately.',
                        'This project is (indirectly) the outcome of my Foundations of Computations class. A huge thanks to Professor Scott Thede with his Graph Theory lectures! Check out my github for the source code.'
                    ]  
    
    const generateHeaders = step => <h1 className = 'headers'>{headers[step]}</h1>

    const generateLead = step => <p className = 'leads'>{leads[step]}</p>

    const generateGuide = step => {
        if (typeof guides[step] === 'string') return <p className = 'guides'>{guides[step]}</p>
        return Object.entries(guides[step]).map(guide =>
        <div className = 'guides'>
            <b>{guide[0]}:</b> {guide[1]}
        </div>)
    }

    return (
        <div className = 'guide'>
            <p className = 'index'>{`${step + 1}/${headers.length}`}</p>
            {generateHeaders(step)}
            {generateLead(step)}
            {generateGuide(step)}
            <button type= "button" 
                    className= "btn btn-primary skip"
                    onClick = {() => props.finishGuide()}>
                Skip
            </button>
            {step < headers.length - 1  ?   <button type = 'button' 
                                                   className="btn btn-primary next"
                                                   onClick = {() => setStep(prev => prev + 1)}>
                                                Next
                                            </button>
                                        :   <button type= "button" 
                                                    className= "btn btn-primary next"
                                                    onClick = {() => props.finishGuide()}>
                                                Finish
                                            </button>} 
            {step > 0 && <button type = 'button'
                                 onClick = {() => setStep(prev => prev - 1)}
                                 className="btn btn-primary previous">Previous</button>}
        </div>
    )
}

export default Guide