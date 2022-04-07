import { combineReducers } from "redux";
import practiceParametersData from './getPracticeParameters';
import deletePracticeParameters from './deletePracticeParameters';
import postPracticeParameters from './postPracticeParamters';

const practiceParametersReducer = combineReducers({
    practiceParametersData,
    postPracticeParameters,
    deletePracticeParameters
})

export default practiceParametersReducer;