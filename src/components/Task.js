import React from 'react'
import Styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = Styled.div`
    border: 1px solid lightgrey;
    border-radius: 25px;
    margin-bottom: 8px;
    padding: 5px 5px 5px 10px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
    min-height: 50px;
`
const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => {
                return <Container
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                >
                    
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    
                
                </Container>
            }}
        </Draggable>
    )
}

export default Task;