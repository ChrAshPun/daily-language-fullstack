import matchGameReducer from './matchGameReducer'
import verbConjugationReducer from './verbConjugationReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    matchGame: matchGameReducer,
    verbConjugation: verbConjugationReducer,
})

export default rootReducer



