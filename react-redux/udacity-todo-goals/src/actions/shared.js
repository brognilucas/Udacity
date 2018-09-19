import API from 'goals-todos-api'
export const RECEIVE_DATA = 'RECEIVE_DATA'

const receiveData = (goals, todos) => {
    return { 
        type: 'RECEIVE_DATA', 
        goals, todos
    }
}

export const handleReceiveInitialData =  () => { 
    return async (dispatch) => { 
        
        const goals = await API.fetchGoals()
        const todos = await API.fetchTodos()

        dispatch(receiveData(goals, todos))

    }
}