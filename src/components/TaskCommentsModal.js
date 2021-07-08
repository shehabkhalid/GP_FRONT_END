import React, { useContext, useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import TasksContext from '../TasksContext/TasksContext'
import Styled from 'styled-components'
import '../CommentsStyle.css'

const CardHeaderContainer = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const TaskCommentsModal = ({ taskId }) => {

    const tasksContext = useContext(TasksContext);
    
    const [ comments, setComments ] = useState(tasksContext.state.tasks[taskId].comments);
    const newCommentTextBox = useRef();

    const addComment = (e) => {
        e.preventDefault();
        const newComment = newCommentTextBox.current.value.trim();
        
        if(!newComment){
            return;
        }
        
        setComments([...comments, newComment]);
    }
    return (
        <Container fluid>
            <Form onSubmit={addComment}>    
                <Form.Group controlId="formBasicComment">
                    <Form.Label className="comment-text">New Comment</Form.Label>
                    <Form.Control ref={newCommentTextBox} type="text" size="lg" placeholder="Enter new comment" required />
                </Form.Group>
                <Button variant="success" type="submit">
                    Add Comment
                </Button>
            </Form>
            <br/>
            {
                comments.map(val => <Card  className="comment-card">
                    <Card.Body className="comment-card-body">
                        <Card.Title>
                            <CardHeaderContainer>
                                <img alt="profile pic" width="50px" height="50px" src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" />
                                <strong className="comment-user-name">Abdullah Mohamed</strong>
                            </CardHeaderContainer>
                        </Card.Title>
                        <Card.Text>
                            <p className="comment-text">{val}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>)
            }
        </Container>
    )
}


export default TaskCommentsModal;