import {React, useContext, useState} from 'react'
import Styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Card, Modal, Button } from 'react-bootstrap'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import DisplayTaskModal from './DisplayTaskModal'
import TasksContext from '../TasksContext/TasksContext'
import TaskCommentsModal from './TaskCommentsModal'
import '../ModalStyle.css'
import '../TaskStyle.css'


const colors = ['purple', 'orangered', 'darkcyan','darkblue', 'darkgreen', 'darkred', 'darkorange', 'darkolivegreen', 'saddlebrown'];

const Container = Styled.div`
    border: 1px solid lightgray;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? '#EEEEEE' : 'rgba(230,230,230, 1)')};
    border-radius: 2px;
    min-height: 50px;
    padding: 5px 5px 5px 10px;
    box-shadow: 3px 2.5px 2.5px rgba(100, 100, 100, 0.5);
`
const OptionsBtn = Styled(AiOutlineEllipsis)`
    width: 40px;
    height: 40px;
    cursor: pointer;
`
const CommentsBtn = Styled(BiCommentDetail)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: #696969;
    margin-left: 10px;
`
const DetailsButton = Styled.button`
    display: inline-block;
    border: none;
    outline: none;
    background-color: inherit;
    padding: 0;
`

const DeadlineContainer = Styled.div`
    display: inline-block;
    background-color: ${props => props.backColor ? 'limegreen' : '#ec9488'};
    margin-bottom: 10px;
    font-weight: bold;
    padding: 5px;
`
const TaskMemberContainer = Styled.div`
    border-radius: 50%;
    background-color: ${props => colors[props.coloridx]};
    color: white;
    margin-bottom: 5px;
    margin-left: 5px;
    color: white;
    text-align: center;
    min-height: 40px;
    min-width: 40px;
    line-height: 40px;
    white-space: nowrap;
`
const CardTitleContainer = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
`
const UsersContainer = Styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
`
const usernames = ['Abdullah Baher', 'Salah Mostafa', 'Shehab Khalid', 'Ahmed Salama', 'Mohamed Hatem', 'Ali Adel'];

const Task = ({ task, index }) => {
    const tasksContext = useContext(TasksContext);

    const [ showModal, setShowModal ] = useState(false)
    
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    
    const [ showCommentsModal, setShowCommentsModal ] = useState(false);

    const handleCommentsShow = () => setShowCommentsModal(true);
    const handleCommentsClose = () => setShowCommentsModal(false);

    const deleteTaskClick = (taskId) => {
        tasksContext.deleteTask(taskId);
        handleClose();
    }

    const saveTaskChangesClick = () => {
        const taskTitle = document.getElementById('task-title').value.trim();
        const tasktitleError = document.getElementById('task-title-error');
        
        if(!taskTitle){
            tasktitleError.innerText = 'Please provide a Title';
        } else {
            tasktitleError.innerText = '';
        }

        const taskDescription = document.getElementById('task-description').value.trim();
        const taskdescriptionerror = document.getElementById('task-description-error');

        if(!taskDescription){
            taskdescriptionerror.innerHTML = 'Please provide a Description'
        } else {
            taskdescriptionerror.innerText = '';
        }

        const deadline = document.getElementById('deadline').value.trim();
        const deadlineError = document.getElementById('deadline-error');
        const date = new Date(deadline);
        date.setHours(0, 0, 0, 0);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        if(!deadline){
            deadlineError.innerText = 'Please provide a Deadline';
        } 
    
        else if(date.getTime() < todayDate.getTime()){
            deadlineError.innerText = 'Task deadline can not be before today';
        }

        else {
            deadlineError.innerText = '';
        }

        const checkboxes = document.getElementsByClassName('form-check-input');
        const membersError = document.getElementById('task-members-error');
        let users = [];

        for(let i = 0; i < checkboxes.length; ++i){
            const val = checkboxes[i];
            if(val.checked){
                users.push(usernames[i]);
            }
        }

        if(users.length === 0){
            membersError.innerText = 'Please add members to this task'
        } else {
            membersError.innerText = '';
        }
        
        if(!taskTitle || !taskDescription || !deadline || users.length === 0 || date.getTime() < todayDate.getTime()){
         //   handleClose();
            return;
        }
        
        const modifiedTask = {
            id: task.id,
            title: taskTitle,
            description: taskDescription,
            deadline: date,
            users: users,
            status: task.status,
            comments: tasksContext.state.tasks[task.id].comments
        }

        tasksContext.modifyTask(modifiedTask);
        handleClose();
    }
    
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => {
                return <Container
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                >
                <Card className="task-card">
                    <Card.Body className="task-card-body">
                        <Card.Title className="task-card-title">
                            <CardTitleContainer>
                                
                                { task.title }
                                <DetailsButton onClick={() => handleShow()}>
                                    <OptionsBtn />
                                </DetailsButton>

                                <Modal show={showModal} onHide={handleClose} scrollable centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title><strong>{task.title}</strong></Modal.Title>
                                    </Modal.Header>
                                    
                                    <Modal.Body>
                                        <DisplayTaskModal task={task} />    
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteTaskClick(task.id)}>
                                            Delete Task
                                        </Button>
                                        <Button variant="primary" onClick={saveTaskChangesClick}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                            </CardTitleContainer>
                        </Card.Title>

                        <Card.Text className="task-card-body-text">
                            <p>{ task.description }</p>
                        </Card.Text>
                        
                        <DeadlineContainer backColor={task.status === 'Done'}>
                        {task.deadline.getDate().toString() + ' ' + task.deadline.toLocaleString('en-US',{month: 'short'})}
                        </DeadlineContainer>
                        
                        <DetailsButton onClick={() => handleCommentsShow()}>
                            <CommentsBtn />
                        </DetailsButton>

                        <Modal show={showCommentsModal} onHide={handleCommentsClose} scrollable centered>
                            
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <strong>{ task.title + ' Comments' }</strong>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <TaskCommentsModal taskId={task.id} />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCommentsClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                            
                        </Modal>

                        <UsersContainer>
                        {
                            task.users.map((val, idx) => {
                                return <TaskMemberContainer coloridx={idx % 10}>
                                { (val[0] + val[1]).toUpperCase() }
                            </TaskMemberContainer>
                            })
                        }
                        </UsersContainer>
                        
                    </Card.Body>
                </Card>        
             </Container>
            }}
        </Draggable>
    )
}

export default Task;
