import React, { useState } from 'react'
import Styled from 'styled-components'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import CreateTaskModal from './CreateTaskModal'
import Modal from 'react-modal'

const Container = Styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 25px;
    width: 350px;
    display: flex;
    flex-direction: column;
    background-color: rgb(238, 238, 238);
`
const Title = Styled.h3`
    padding: 8px;
`
const TaskList = Styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 350px;
    border-radius: 0 0 25px 25px;
`
const Btn = Styled.button`
    background-color: rgb(10, 187,145);
    border: none;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    margin-top: 5%;
    align-content: center;
    color: white;
    font-size: xx-large;

    &: active {
        transform: translateY(2px);
    }
`
const customStyles = {
    content: {
        width: '65%',
        height: '85%',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        borderRadius: '25px',
        backgroundColor: 'rgb(238, 238, 238)'

    },
    overlay: {
        backgroundColor: 'rgb(34, 40, 49)'
    }
};

const InnerList = React.memo(({ tasks }) => {
    return tasks.map((task, index) => {
        return <Task key={task.id} task={task} index={index} />
    })
})

Modal.setAppElement('#root')

const Column = ({ column, tasks, addNewTask }) => {
    const [ showModal, setShowModal ] = useState(false)
    console.log('ya baba');
    const toogleModal = () => {
        setShowModal(prev => !prev)
    }
    
    return (
        <div style={{margin: '0 auto', borderRadius: '25px',}}>
            <Container>
                <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between',padding: '15px',flexBasis:'auto'}}>
                    <Title>{column.title}</Title>
                    <Btn onClick={toogleModal}>+</Btn>
                    <Modal isOpen={showModal} onRequestClose={toogleModal} style={customStyles} >
                        <CreateTaskModal toogleModal={toogleModal} addNewTask={addNewTask} columnId={column.id} />
                    </Modal>
                </div>
                <Droppable droppableId={column.id}>
                    {(provided, snapshot) => {
                        return <TaskList
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        >   
                            <InnerList tasks={tasks} />
                            {/*<InnerList tasks={tasks} />*/}
                            {provided.placeholder}
                        </TaskList>    
                    }}
                </Droppable>
            </Container>
        </div>
    )
}

export default Column;