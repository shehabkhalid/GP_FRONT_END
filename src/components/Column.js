import React, { useContext, useState } from "react";
import Styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import CreateTaskModal from "./CreateTaskModal";
import { Modal, Button } from "react-bootstrap";
import TasksContext from "../TasksContext/TasksContext";
import "../ModalStyle.css";

const Container = Styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 7px;
    width: 330px;
    display: flex;
    flex-direction: column;
    background-color: rgb(238, 238, 238);
`;
const Title = Styled.h3`
    padding: 8px;
`;
const TaskList = Styled.div`
    padding: 8px;
    background-color: ${(props) =>
      props.isDraggingOver ? "#bbbbbb" : "white"};
    flex-grow: 1;
    min-height: 350px;
    border-radius: 0 0 7px 7px;
    margin-right: 1px;
`;
//rgb(10, 187,145) #6c757d #28a745 #17a2b8
const Btn = Styled.button`
    background-color: #28a745;
    border: none;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    margin-top: 5%;
    align-content: center;
    color: white;
    font-size: x-large;
    font-weight: bold;
    

    &: active {
        transform: translateY(2px);
    }
`;
const ColumnHeaderContainer = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    flex-basis: auto;
    align-items: baseline;
`;
const ColumnContainer = Styled.div`
    margin: 0 auto;
    border-radius: 25px;
`;

const InnerList = React.memo(({ tasks }) => {
  return tasks.map((task, index) => {
    return <Task key={task.id} task={task} index={index} />;
  });
});

const usernames = [
  "Abdullah Baher",
  "Salah Mostafa",
  "Shehab Khalid",
  "Ahmed Salama",
  "Mohamed Hatem",
  "Ali Adel",
];

const Column = ({ column, tasks }) => {
  const tasksContext = useContext(TasksContext);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const saveTask = () => {
    const tasktitle = document.getElementById("task-title").value.trim();
    const tasktitleError = document.getElementById("task-title-error");

    if (!tasktitle) {
      tasktitleError.innerText = "Please provide a Title";
    } else {
      tasktitleError.innerText = "";
    }

    const taskdescription = document
      .getElementById("task-description")
      .value.trim();
    const taskdescriptionerror = document.getElementById(
      "task-description-error"
    );

    if (!taskdescription) {
      taskdescriptionerror.innerHTML = "Please provide a Description";
    } else {
      taskdescriptionerror.innerText = "";
    }

    const deadline = document.getElementById("deadline").value.trim();
    const selectedDate = new Date(deadline);
    const deadlineError = document.getElementById("deadline-error");
    selectedDate.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (!deadline) {
      deadlineError.innerText = "Please provide a Deadline";
    } else if (selectedDate.getTime() < todayDate.getTime()) {
      deadlineError.innerText = "Task deadline can not be before today";
    } else {
      deadlineError.innerText = "";
    }

    const checkboxes = document.getElementsByClassName("form-check-input");
    const membersError = document.getElementById("task-members-error");
    let users = [];

    for (let i = 0; i < checkboxes.length; ++i) {
      const val = checkboxes[i];
      if (val.checked) {
        users.push(usernames[i]);
      }
    }

    if (users.length === 0) {
      membersError.innerText = "Please add members to this task";
    } else {
      membersError.innerText = "";
    }
    if (
      !tasktitle ||
      !taskdescription ||
      users.length === 0 ||
      !deadline ||
      selectedDate.getTime() < todayDate.getTime()
    ) {
      // handleClose();
      return;
    }
    const task = {
      title: tasktitle,
      description: taskdescription,
      deadline: selectedDate,
      users: users,
      status: column.title,
    };

    tasksContext.addNewTask(column.id, task);
    handleClose();
  };

  return (
    <ColumnContainer>
      <Container>
        <ColumnHeaderContainer>
          <Title>{column.title}</Title>
          <Btn onClick={handleShow}>+</Btn>

          <Modal
            show={showModal}
            onHide={handleClose}
            size="xl"
            scrollable
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <strong>New Task</strong>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <CreateTaskModal />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>

              <Button variant="primary" onClick={saveTask}>
                Save Task
              </Button>
            </Modal.Footer>
          </Modal>
        </ColumnHeaderContainer>

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => {
            return (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            );
          }}
        </Droppable>
      </Container>
    </ColumnContainer>
  );
};

export default Column;
