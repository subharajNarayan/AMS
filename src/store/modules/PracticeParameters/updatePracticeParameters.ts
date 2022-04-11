import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";

export type updateRequestData ={
    parameter_name: string,
    unit: string,
    types: string,
    NDWQS_standard: string
}

const apiDetails = Object.freeze(apiList.practiceParameters.updatePracticeParameters);

export default function updatePracticeParametersReducer(state = initialState, action: DefaultAction) : DefaultState<updateRequestData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const updatePracticeParametersAction = (id, requestData: updateRequestData): AppThunk<APIResponseDetail<updateRequestData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { requestData, pathVariables: { id}, disableToast: true })
  
}