import React, { useContext, useEffect, useRef } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { CardDeck } from "react-bootstrap";
import TasksContext from "../Contexts/TasksContext/TasksContext";
import SideBar from "../newComponents/SideBar";
import taskAPI from "../API/task";
import UserContext from "../Contexts/UserContext/UserContext";

const TrelloPage = () => {
  const tasksContext = useContext(TasksContext);
  const userContext = useContext(UserContext);

  // const fetchTasks = async () => {
  //   const token = localStorage.getItem("accessToken");
  //   const projectID = userContext.state.project._id;
  //   const response = await taskAPI.getTasks(token, projectID);
  //   if (!response.message) {
  //     console.log(response);
  //     //tasksContext.saveTasks(response);
  //   }
  // };

  // useEffect(() => fetchTasks(), []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = tasksContext.state.columns[source.droppableId];
    const finish = tasksContext.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...tasksContext.state,
        columns: {
          ...tasksContext.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      tasksContext.saveTasks(newData);

      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newData = {
      ...tasksContext.state,
      tasks: {
        ...tasksContext.state.tasks,
        [draggableId]: {
          ...tasksContext.state.tasks[draggableId],
          status: tasksContext.state.columns[destination.droppableId].title,
        },
      },
      columns: {
        ...tasksContext.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    tasksContext.saveTasks(newData);
  };

  const InnerList = React.memo(({ column, taskMap, index }) => {
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return (
      <Column key={column.id} column={column} tasks={tasks} index={index} />
    );
  });
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CardDeck style={{ margin: "0px" }}>
        <SideBar />
        {tasksContext.state.columnOrder.map((columnId) => {
          const column = tasksContext.state.columns[columnId];

          return (
            <InnerList
              key={column.id}
              column={column}
              taskMap={tasksContext.state.tasks}
            />
          );
        })}
      </CardDeck>
    </DragDropContext>
  );
};

export default TrelloPage;
