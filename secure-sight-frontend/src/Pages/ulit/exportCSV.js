import { Download } from "@mui/icons-material";
import React from "react";
import { CSVLink } from "react-csv";
import { DropdownItem } from "reactstrap";
import { deepKeys } from "./commonFunction";

const ExportCSV = ({ data, title }) => {
  const headerKeys = Array.from(deepKeys(data && data[0]));
  const mainHeader =
    headerKeys && headerKeys.map((name) => ({ label: name, key: name }));
  return (
    <CSVLink
      headers={mainHeader}
      data={data}
      filename={title}
      style={{ textDecoration: "none", color: "#fff" }}
    >
      {" "}
      {/* <Download /> */}
      <DropdownItem>Export CSV</DropdownItem>
    </CSVLink>
  );
};

export default ExportCSV;
