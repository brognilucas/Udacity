const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('the action are ' , action )
        const returnValue = next(action)
        console.log('the new state are ' , store.getState())
    console.groupEnd()

    return returnValue
}

export default logger