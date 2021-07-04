import React, { useState } from 'react'
import initialData from '../initial-data'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import Styled from 'styled-components'

const Container = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const TrelloPage = () => {
    const [ tasksData, setTasksData ] = useState(initialData)
    const onDragEnd = result => {
        const { destination, source , draggableId } = result
        
        if(!destination){
            return
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }
        const start = tasksData.columns[source.droppableId]
        const finish = tasksData.columns[destination.droppableId]

        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newData = {
                ...tasksData,
                columns: {
                    ...tasksData.columns,
                    [newColumn.id]: newColumn
                }
            }

            setTasksData(newData)
            return
        }

        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }
        const newData = {
            ...tasksData,
            columns: {
                ...tasksData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        setTasksData(newData)
    }

    const addNewTask = (columnId, task) => {
        const numOfTasks = Object.keys(tasksData.tasks).length + 1;
        const column = tasksData.columns[columnId];
        const columnTaskIds = Array.from(column.taskIds)
        const taskId = 'task-' + numOfTasks
        columnTaskIds.splice(column.taskIds.length, 1, taskId)
        const newColumn = {
            ...column,
            taskIds: columnTaskIds
        }
        const newData = {
            ...tasksData,
            tasks: {
                ...tasksData.tasks,
                [taskId]: {id: taskId, title: task.title, description: task.description}
            },

            columns: {
                ...tasksData.columns,
                [newColumn.id]: newColumn
            }

        }
    
        setTasksData(newData)
    }
const InnerList = React.memo(({ column, taskMap, index }) => {
    const tasks = column.taskIds.map(taskId => taskMap[taskId])
    return <Column column={column} addNewTask={addNewTask} tasks={tasks} index={index} />
})
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                {tasksData.columnOrder.map(columnId => {
                    const column = tasksData.columns[columnId]
                    

                    return <InnerList
                    key={column.id}
                    column={column} 
                    taskMap={tasksData.tasks} 
                    />
                })}
            </Container>
        </DragDropContext>
    )
    
}

export default TrelloPage;