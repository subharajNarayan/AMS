import { getNumberByLanguage } from "i18n/i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { RootState } from "store/root-reducer";

interface Props {
  headers: any;
  tableData: any;
}

const DataTable = (props: Props) => { 
  
  const { t } = useTranslation();

  const currency = useSelector((state: RootState) => state.waterSchemeData.waterSchemeDetailsData.data?.currency)

  return (
    <div className="mt-3 income-expend">
      <div className="table-responsive">
        <Table className="table-02">
          <tbody>
            <tr>
              <td></td>
              {props.headers?.map((data) => (
                <td key={data}>{data}</td>
              ))}
            </tr>

            {props.tableData?.map((data) => (
              <tr>
                <td>{data.name}</td>
                <td>{t("home:rs")} {getNumberByLanguage(data.value.this_year)}</td>
                <td>{t("home:rs")} {getNumberByLanguage(data.value.all_time)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
