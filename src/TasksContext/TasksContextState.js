import {React, useState} from 'react'
import TasksContext from './TasksContext'
import initialData from '../initial-data'

const TasksContextState = props => {
    const [ state, setState ] = useState(initialData);

    const saveTasks = (tasks) => setState(tasks);
    
    const addNewTask = (columnId, task) => {
        const numOfTasks = Object.keys(state.tasks).length + 1;
        const column = state.columns[columnId];
        const columnTaskIds = Array.from(column.taskIds)
        const taskId = 'task-' + numOfTasks
        columnTaskIds.splice(column.taskIds.length, 1, taskId)
        const newColumn = {
            ...column,
            taskIds: columnTaskIds
        }
        const newData = {
            ...state,
            tasks: {
                ...state.tasks,
                [taskId]: {id: taskId, title: task.title, description: task.description, deadline: task.deadline, users: task.users, status: task.status, comments: []}
            },

            columns: {
                ...state.columns,
                [newColumn.id]: newColumn
            }

        }
        
        saveTasks(newData);
    
    }

    const deleteTask = (taskId) => {
        
        for(const column in state.columns){
            state.columns[column].taskIds = state.columns[column].taskIds.filter(val => val !== taskId);
        }
        
        delete state.tasks[taskId];
        const newData = { ...state }
        
        saveTasks(newData);
    }

    const modifyTask = (task) => {
        
        const newData = {
            ...state,
            tasks:{
                ...state.tasks,
                [task.id]: task
            }
        }

        saveTasks(newData);
    }

    return (
        <TasksContext.Provider value={{state, saveTasks, addNewTask, deleteTask, modifyTask}}>
            {props.children}
        </TasksContext.Provider>
    )
}

export default TasksContextState;