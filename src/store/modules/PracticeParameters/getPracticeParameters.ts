import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";

export type PracticeParametersType = {
    id: number,
    parameter_name: string,
    unit: string,
    types: string,
    NDWQS_standard: string
}[]

const apiDetails = Object.freeze(apiList.practiceParameters.getPracticeParameters);

export default function getPracticeParametersReducer(state = initialState, action : DefaultAction): DefaultState<PracticeParametersType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getPracticeParametersAction = (water_schema_slug?:string): AppThunk<APIResponseDetail<PracticeParametersType>> => async (dispatch: Dispatch) => {
    const updatedDetails = { ...apiDetails }
    if(water_schema_slug) updatedDetails['params'] = {water_schema_slug}

    return await initDefaultAction(apiDetails, dispatch, updatedDetails);
}