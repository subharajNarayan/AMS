import React, { useState } from "react";
import Form from "./Form";
import List from "./List";

interface Props {
  toggle?: any
}

const ManageQTParameters = (props: Props) => {
  const [editData, setEditData] = useState<any>();

  return (
    <div className="row">
      <div className="col-12">
        <Form/>
      </div>
      <div className="col-12">
        <List />
      </div>
    </div>
  );
};

export default ManageQTParameters;
