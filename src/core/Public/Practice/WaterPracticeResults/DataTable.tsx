import React from 'react';
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { RootState } from "store/root-reducer";

const DataTable = () => {
  return (
    <div className='mt-3 income-expend'>
        <div className='table-responsive'>
            <Table className='table-02'>
                <tbody>
                    <tr>
                        <td>Quality Test Result</td>
                    </tr>
                    <tr>
                        <td>
                            <span>
                                Name
                            </span>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    </div>
  )
}

export default DataTable;