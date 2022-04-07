import { combineReducers } from "redux";
import practiceParametersData from './getPracticeParameters';
import deletePracticeParameters from './deletePracticeParameters';

const practiceParametersReducer = combineReducers({
    practiceParametersData,
    deletePracticeParameters
})

export default practiceParametersReducer;