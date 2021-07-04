import React from 'react'
import Styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import Container from 'react-bootstrap/Container';
import { Button, Card, Col, Dropdown, Form, Image, Jumbotron, ListGroup, Nav, Navbar, NavDropdown, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';

const CloseButton = Styled(MdClose)`
    width: 30px;
    height: 30px;
    cursor: pointer;
`
const CloseBtnContainer = Styled.div`
    display: flex;
    flex-direction: row-reverse;
`
const NewTaskTitleContainer = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin-bottom: 10px;
`
const TextField = Styled.input`
    width: 55%;
    height: 35px;
    border: none;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    color: grey;
    font-size: x-large;
`

const SaveBtnContainer = Styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 5px;
    margin-bottom: 10px;
    flex-grow: 1;
    
`
const SaveTaskBtn = Styled.button`
    border: none;
    border-radius: 10px;
    height: 40px;
    width:  30%;
    background-color: #007bff;
    font-size: x-large;
    color: white;
    text-align: center;
`
const ModalContainer = Styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
`
const CreateTaskModal = ({ toogleModal, addNewTask, columnId, data }) => {
    const saveTask = () => {
        const tasktitle = document.getElementById('task-title').value
        const taskdescription = document.getElementById('task-description').value
        if(!tasktitle || !taskdescription){
            toogleModal()
            return
        }
        const task = {
            'title': tasktitle,
            'description': taskdescription
        }
        addNewTask(columnId, task)
        toogleModal()
    }
    return (
        <ModalContainer>
            <CloseBtnContainer>
                <CloseButton onClick={toogleModal} />
            </CloseBtnContainer>
            <NewTaskTitleContainer>
                <h1>New Task Title:</h1>
                <TextField placeholder='Enter Task Title' id='task-title' value={data ? data.title : undefined}></TextField>
            </NewTaskTitleContainer>
            <NewTaskTitleContainer>
                <h1>New Task Description:</h1>
                <TextField placeholder='Enter Task Description' id='task-description' value={data ? data.description : undefined}></TextField>
            </NewTaskTitleContainer>
            
            {
                data ?
                null :
                <SaveBtnContainer>
                    <SaveTaskBtn onClick={saveTask}>Save</SaveTaskBtn>
                </SaveBtnContainer>
            }
            
        </ModalContainer>
    )
}

export default CreateTaskModal;