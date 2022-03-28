import * as yup from 'yup'



export const supplyBeltInitialValues = {  
    institutional_connection: "",
    commercial_connection: "",
    public_connection: "",
    household_connection: "",
    apply_date: ""
};

export const supplyBeltValidationSchema = yup.object({  
    institutional_connection: yup.string().required("This field is required"),
    commercial_connection: yup.string().required("This field is required"),
    public_connection: yup.string().required("This field is required"),
    household_connection: yup.string().required("This field is required"),
    apply_date: yup.string().required("This field is required"),
})