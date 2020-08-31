import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'


const REDUX_DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        REDUX_DEVTOOLS
    )
)