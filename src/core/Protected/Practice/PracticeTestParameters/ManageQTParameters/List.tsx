import React from "react";
import { useTranslation } from "react-i18next";
import { RootState } from "store/root-reducer";
import { getNumberByLanguage } from "i18n/i18n";
import { DeleteIcon, EditIconDark } from "assets/images/xd";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import toast from "components/React/ToastNotifier/ToastNotifier";
import { getPracticeParametersAction } from "store/modules/PracticeParameters/getPracticeParameters";
import { deletePracticeParametersAction } from "store/modules/PracticeParameters/deletePracticeParameters";
import ConfirmationModal from "components/UI/ConfirmationModal";
import useDeleteConfirmation from "hooks/useDeleteConfirmation";


// import { deleteTestParametersAction } from "store/modules/testParamters/deleteTestParameters";

interface Props extends PropsFromRedux {
  toggle: any;
  setEditData: any;
}

const List = (props: Props) => {
  const { t } = useTranslation();
  const { editId, modal, handleDeleteClick, resetDeleteData, toggleModal } =
  useDeleteConfirmation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPracticeParametersAction());
  }, []);

  const PracticeParameters = useSelector(
    (state: RootState) => state.practiceParametersData.practiceParametersData.data
  );
  
  const deletePracticeParameters = async () => {
    try {
      const response = await props.deletePracticeParametersAction(editId);
      console.log(response, "success");
      if (response.status === 204) {
        toast.success(t("home:deleteSuccess"));
        props.getPracticeParametersAction();
        resetDeleteData();
      } else {
        toast.error(t("home:deleteError"));
        resetDeleteData();
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="data-table mt-4">
      <div className="table-responsive">
        <table className="table mt-2">
          <thead>
            <tr>
              <th style={{ borderRadius: "5px 0 0 0" }}>{t("home:sn")}</th>
              <th>{t("home:parameter")}</th>
              <th>{t("home:units")}</th>
              <th>{t("home:ndwq")}</th>
              <th>{t("home:types")}</th>
              <th style={{ borderRadius: "0 5px 0 0" }}>{t("home:action")}</th>
            </tr>
          </thead>
          <tbody>
            {PracticeParameters &&
              PracticeParameters?.map((item, index) => (
                <tr key={item.id}>
                  <td>{getNumberByLanguage(index + 1)}</td>
                  <td> {item.parameter_name}</td>
                  <td> {item.unit || "-"}</td>
                  <td>{item.NDWQS_standard || "-"}</td>
                  <td>{item.types}</td>

                  <td className="action justify-content-center">
                    <div role="button">
                      <img src={EditIconDark} alt="" className="mr-4" />
                    </div>
                    <div role="button" onClick={() => handleDeleteClick(item.id)}>
                      <img src={DeleteIcon} alt="" />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        open={modal}
        handleModal={() => toggleModal()}
        handleConfirmClick={() => deletePracticeParameters()}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  language: state.i18nextData.languageType,
  supplySchedule: state.waterSupplyData.waterScheduleData.data,
});

const mapDispatchToProps = {
  getPracticeParametersAction,
  deletePracticeParametersAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(List);
