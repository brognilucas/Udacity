import API from 'goals-todos-api'

export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOALS'


const addGoal = (goal) => {
    return {
        type: ADD_GOAL,
        goal
    }
}

const removeGoal = (id) => {
    return {
        type: REMOVE_GOAL,
        id
    }
}

export const handleAddGoal = (name) => {
    return (dispatch) => {
        return API.saveGoal(name)
            .then(goal => {  dispatch(addGoal(goal)) } )
            .catch(error => {
                alert('error, try again')
            })
    }
}

export const handleDeleteGoal = (goal) => {
    return (dispatch) => { 
        dispatch(removeGoal(goal.id))

        API.deleteGoal(goal.id)
        .catch(err => {
            alert('An error ocurred, try again')
            dispatch(addGoal(goal))
        })
    }
}