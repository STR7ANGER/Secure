import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
} from "reactstrap";
import ExportCSV from "../../Pages/ulit/exportCSV";
import { Breadcrumbsub } from "./Breadcrumb";
import ExportPdf from "./exportPdf";
import {
  Columns,
  formatCapilize,
  formatText,
} from "../../Pages/ulit/commonFunction";
import { RawDataModel } from "./editModel";
import MaterialTable from "../../Pages/Tables/Table";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const CostomDropdow = ({
  i,
  OpenEditModel,
  OpenDeleteModel,
  exportContent,
  RawData,
  OpenRowDataModel,
  OpenHeaderEditModel,
  OpenHeaderReorderModel,
}) => {
  const [btnprimary1, setBtnprimary1] = useState(false);
  const [open, setOpen] = useState(false);
  const habndelClose = () => {
    setOpen(false);
  };
  const column = Columns(i.column);
  const navigate = useNavigate();
  const Rowdata = (i) => {
    navigate("/dashboard/row-Data", {
      state: { column: column, data: i?.data, title: i.title },
    });
  };
  return (
    <React.Fragment>
      <RawDataModel
        data={i?.data}
        open={open}
        habndelClose={() => {
          setOpen(false);
        }}
        column={column}
        title={i.title}
      />
      <Breadcrumbsub
        title={formatCapilize(formatText(i?.title ? i?.title : ""))}
        breadcrumbItem={
          <Dropdown
            isOpen={btnprimary1}
            toggle={() => setBtnprimary1(!btnprimary1)}
          >
            <DropdownToggle tag="button" className="btn ">
              <MoreVert />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  OpenEditModel({
                    id: i?._id,
                    title: i?.title,
                  });
                }}
              >
                Edit
              </DropdownItem>
              {/* <DropdownItem
                onClick={() => {
                  OpenDeleteModel(i?._id);
                }}
              >
                Delete
              </DropdownItem> */}

              <ExportCSV data={i?.data} title={i.title} />
              <DropdownItem>
                <ExportPdf content={exportContent} Title={i?.title} />
              </DropdownItem>

              {OpenHeaderEditModel && (
                <DropdownItem
                  onClick={() => {
                    OpenHeaderEditModel(i);
                  }}
                >
                  Edit Header
                </DropdownItem>
              )}
              {RawData && (
                <DropdownItem
                  onClick={() => {
                    // Rowdata(i);
                    setOpen(true);
                  }}
                >
                  Raw Data
                </DropdownItem>
              )}
              {!RawData && (
                <DropdownItem
                  onClick={() => {
                    OpenHeaderReorderModel(i);
                  }}
                >
                  Reorder Columns
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        }
      />
    </React.Fragment>
  );
};

export default CostomDropdow;
