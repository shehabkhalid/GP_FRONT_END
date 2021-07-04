const intialData = {
    tasks: {
        'task-1': {id: 'task-1', title: 'GP frontend', description: 'description 1'},
        'task-2': {id: 'task-2', title: 'GP backend', description: 'description 2'},
        'task-3': {id: 'task-3', title: 'ACM frontend', description: 'description 3'},
        'task-4': {id: 'task-4', title: 'ACM backend', description: 'description 4'},
        'task-5': {id: 'task-5', title: 'Study', description: 'description 5'},
        'task-6': {id: 'task-6', title: 'Refactor Code', description: 'description 6'},
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Tasks',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        }
    },

    columnOrder: ['column-1', 'column-2', 'column-3'],
}

export default intialData;