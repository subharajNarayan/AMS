import * as yup from 'yup'


export const mobileUserInitialValues = { 
    name: "",
    phone_number: "",
    password1: "",
    password2: ""
};

export const mobileUserValidationSchema = yup.object({ 
    name: yup.string().required("This field is required."),
    phone_number: yup.string().required("This field is required.").length(10, "Mobile number must be of 10 digits.").test(
        "phone_number",
        "Please enter a valid 10 digit mobile humber.",
        function (value) {
            const { end_time } = this.parent;
            return value?.indexOf("+") !== -1 || value?.indexOf("-") !== -1 || true
        }
    ),
    password1: yup.string().min(4, "Password must have at least 4 characters ").required("This field is required."),
    password2: yup.string().required("This field is required.").oneOf([yup.ref('password1'), null], "Password does not match!"),
})