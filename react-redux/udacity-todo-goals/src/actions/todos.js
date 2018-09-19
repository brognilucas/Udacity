import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'


const addTodo = (todo) => {
    return { 
        type: ADD_TODO , 
        todo
    }
}

const removeTodo = (id) => {
    return { 
        type: REMOVE_TODO, 
        id
    }
}
 
const toggleTodo = (id) => {
    return { 
        type: toggleTodo, 
        id
    }
}

export const handleAddTodo = (name , callback) => {
   return (dispatch) => { 
       return API.saveTodo(name)
       .then(todo => { 
            dispatch(addTodo(todo))

            callback()
       })
       .catch(err => { 
           alert('An error has ocurred')
       })
   }
}

export const handleDeleteTodo = (todo) => { 
    return (dispatch) => {

        dispatch(removeTodo(todo.id))
        return API.deleteTodo(todo.id)
        .catch(err => {
            alert('An error ocurred, try again')
            dispatch(addTodo(todo))
        })
    }
}

export const handleToggle = (id) => { 
    return (dispatch) => { 
        return API.saveTodoToggle(id)
        .catch( () => {
            alert('Error. Try again ')
            dispatch(toggleTodo(id))
        })
    }
}