import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";

type PracticeRequestData = {
    parameter_name: string,
    unit: string,
    types: string,
    NDWQS_standard: string
}

const apiDetails = Object.freeze(apiList.practiceParameters.postPracticeParameters);

export default function postPracticeParametersReducer(state = initialState, action : DefaultAction) : DefaultState<PracticeRequestData> {
    const actionName = apiDetails.actionName;
    const stateCopy = Object.assign({}, state);

    return initDefaultReducer(actionName, action, stateCopy);
}

export const postPracticeParametersAction = (requestData : PracticeRequestData) : AppThunk<APIResponseDetail<PracticeRequestData>> => async (dispatch:Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, {requestData, disableToast: true})
}