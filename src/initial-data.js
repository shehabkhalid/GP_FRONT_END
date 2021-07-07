const intialData = {
    tasks: {
        'task-1': {id: 'task-1', title: 'GP frontend', description: 'description 1', deadline: new Date(2025,4,24),
        users: ['Abdullah Baher', 'Mohamed Hatem'],
        status: 'Tasks', comments: ['From DataBase']},

        'task-2': {id: 'task-2', title: 'GP backend', description: 'description 2', deadline: new Date(2025,0,20),
        users: ['Salah Mostafa'],
        status: 'Tasks', comments: []},

        'task-3': {id: 'task-3', title: 'ACM frontend', description: 'description 3', deadline: new Date(2025,10,30),
        users: ['Shehab Khalid', 'Ahmed Salama'],
        status: 'Tasks', comments: []},

        'task-4': {id: 'task-4', title: 'ACM backend', description: 'description 4', deadline: new Date(2025,9,1),
        users: ['Ali Adel'],
        status: 'In progress', comments: []},

        'task-5': {id: 'task-5', title: 'Study', description: 'description 5', deadline: new Date(2025,4,24),
        users: ['Salah Mostafa', 'Ali Adel'],
        status: 'In progress', comments: []},

        'task-6': {id: 'task-6', title: 'Refactor Code', description: 'description 6', deadline: new Date(2025,4,24),
        users:['Abdullah Baher', 'Salah Mostafa', 'Mohamed Hatem', 'Shehab Khalid', 'Ahmed Salama', 'Ali Adel'],
        status: 'Done', comments: []},
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Tasks',
            taskIds: ['task-1', 'task-2', 'task-3']
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: ['task-4','task-5']
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: ['task-6']
        }
    },

    columnOrder: ['column-1', 'column-2', 'column-3'],
}

export default intialData;