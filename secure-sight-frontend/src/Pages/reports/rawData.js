import { Button } from "@mui/material";
import React from "react";
import ReactGridLayout from "react-grid-layout";
import { useLocation, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MaterialTable from "../Tables/Table";

const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(
  ReactGridLayout.Responsive
);

const RawData = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        {/* <MaterialTable
          data={data}
          columns={column}
          renderTopToolbarCustomActions={({ table }) => (
            <Button variant="text">{title}</Button>
          )}
        /> */}
      </div>
    </React.Fragment>
  );
};

export default RawData;
