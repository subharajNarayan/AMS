import * as yup from 'yup';

export const practiceParametersInitialValues = {
    parameter_name: "",
    unit: "",
    types: null as null | OptionType,
    NDWQS_standard: ""
}

export const practiceParametersValidationSchema = yup.object({
    parameter_name: yup.mixed().required("parameter name is required"),
    unit: yup.mixed().required("Unit is required"),
    types: yup.mixed().required("types is required"),
    NDWQS_standard: yup.mixed().required("NDWQS standard is required")
})