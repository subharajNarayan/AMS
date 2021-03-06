import FormikValidationError from "components/React/FormikValidationError/FormikValidationError";
import toast from "components/React/ToastNotifier/ToastNotifier";
import Button from "components/UI/Forms/Buttons";
import { useFormik } from "formik";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getPracticeParametersAction } from "store/modules/PracticeParameters/getPracticeParameters";
import { postPracticeParametersAction } from "store/modules/PracticeParameters/postPracticeParamters";
import { updatePracticeParametersAction } from "store/modules/PracticeParameters/updatePracticeParameters";
import { RootState } from "store/root-reducer";
import { practiceParametersInitialValues, practiceParametersValidationSchema } from "./schema";
import { useTranslation } from "react-i18next";
import { PARAMETER_TYPES_OPTIONS } from "constants/constants";
import StyledSelect from "components/React/StyledSelect/StyledSelect";
import TooltipLabel from "components/UI/TooltipLabel";
import './forms.scss';

interface Props extends PropsFromRedux {
  editData: any;
  toggle: any;
  setEditData: any;
}

const Form = (props: Props) => {
  const { t } = useTranslation();

  const [initialData, seetInitialData] = React.useState<typeof practiceParametersInitialValues>(
    practiceParametersInitialValues
  );

  React.useEffect(() => {
    if (props.editData) {
      seetInitialData({
        ...props.editData,
        types: PARAMETER_TYPES_OPTIONS.find((item) => item.value === props.editData.types) || null,
      });
    }
  }, [props.editData]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: practiceParametersValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;
      if (props.editData) {
        res = await props.updatePracticeParametersAction(props.editData.id, {
          ...submitValue,
          types: submitValue.types?.value,
        });
      } else {
        res = await props.postPracticeParametersAction({
          ...submitValue,
          types: submitValue.types?.value,
        });
      }
      if (res.status === 201 || res.status === 200) {
        if (res.status === 201) {
          resetForm();
          toast.success(t("home:postSuccess"));
        } else {
          props.setEditData(null);
          seetInitialData(practiceParametersInitialValues);
          toast.success(t("home:updateSuccess"));
        }
        props.getPracticeParametersAction();
      } else {
        const errors = Object.values(res.data)?.map((item: any) => {
          toast.error(item[0]);
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div className="row align-items-center">
        <div className="col-md-3">
          <div className="form-group ">
            <label htmlFor="" className="mr-1">
              {t("home:parameter")} {t("home:name")} <span style={{color: "red", fontSize: "20px"}}> * </span> :
            </label>

            <input
              className="form-control"
              name="parameter_name"
              value={values.parameter_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormikValidationError name="parameter_name" errors={errors} touched={touched} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group ">
            <label htmlFor="" className="mr-1">
              {t("home:unit")} <span style={{color: "red", fontSize: "20px"}}> * </span>:
            </label>

            <input
              className="form-control"
              name="unit"
              value={values.unit}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormikValidationError name="unit" errors={errors} touched={touched} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group ">
            <label htmlFor="" className="mr-1">
              {t("home:ndwq")} <TooltipLabel id={"NDWQ"} text={`The quality standards for drinking water`} />:
            </label>

            <input
              className="form-control"
              name="NDWQS_standard"
              value={values.NDWQS_standard}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormikValidationError name="NDWQS_standard" errors={errors} touched={touched} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group ">
            <label htmlFor="" className="mr-1">
              {t("home:types")}:
            </label>

            <StyledSelect
              name="types"
              value={values?.types}
              options={PARAMETER_TYPES_OPTIONS}
              onChange={({ name, value }) => {
                setFieldValue(name, value);
              }}
              onBlur={() => {
                setFieldTouched("types", true);
              }}
            />
            <FormikValidationError name="types" errors={errors} touched={touched} />
          </div>
        </div>

        <div className="col-md-12 text-right">
          <Button
            className="btn custom-btn  mr-3"
            text={t("home:save")}
            disabled={props.loading}
            loading={props.loading}
          />
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  language: state.i18nextData.languageType,
  loading:
    state.practiceParametersData.postPracticeParameters.isFetching ||
    state.practiceParametersData.updatePracticeParameters.isFetching,
});

const mapDispatchToProps = {
  getPracticeParametersAction,
  updatePracticeParametersAction,
  postPracticeParametersAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Form);
