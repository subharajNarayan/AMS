import * as Yup from 'yup'


export const waterTestInitialValues = {
    "date": "",
    "test_result_parameter": [
        {
            "parameter": null as any,
            "parameter_name": "",
            "value": ""
        }
    ]
}

export const waterTestValidationSchema = Yup.object({
    date: Yup.mixed().required("This field is required"),
    test_result_parameter: Yup.array().of(
        Yup.object().shape({
            parameter: Yup.mixed().required("This field is required"),
            value: Yup.string().required("This field is required"),
        })
    ),
})