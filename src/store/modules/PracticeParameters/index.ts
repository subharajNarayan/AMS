import { combineReducers } from "redux";
import practiceParametersData from './getPracticeParameters';
import deletePracticeParameters from './deletePracticeParameters';
import postPracticeParameters from './postPracticeParamters';
import updatePracticeParameters from './updatePracticeParameters';

const practiceParametersReducer = combineReducers({
    practiceParametersData,
    postPracticeParameters,
    deletePracticeParameters,
    updatePracticeParameters
})

export default practiceParametersReducer;