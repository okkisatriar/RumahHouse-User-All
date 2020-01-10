const redux = require('redux')
const creatStore = redux.createStore

var initialState = {
    login: false,
    username: ''
}

// Reducer
const rootReducer = (state = initialState, action) => {
    console.log('log action', action)
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: true,
                username: 'Okki'
            }
        case 'CHANGE_USERNAME':
            return {
                ...state,
                login: true,
                username: action.newUsername
            }
        default: return state
    }
}

// Store
const store = creatStore(rootReducer)
console.log('get store', store.getState())

// Subscription
store.subscribe(() => {
    console.log('subscribe', store.getState())
})

// Dispatch atau action
store.dispatch({ type: 'LOGIN' })
store.dispatch({ type: 'CHANGE_USERNAME', newUsername: 'Bambang'})
console.log('get dispacth', store.getState())