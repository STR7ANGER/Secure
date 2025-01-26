import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";

import {
  Container,
  Col,
  Row,
  CardBody,
  CardTitle,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import MaterialReactTable from "material-react-table";

//Import Breadcrumb
import Breadcrumbs, { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import MaterialTable from "../Tables/Table";
import {
  Columns,
  ColumnsHeadWithEdit,
  deepKeys,
  hidencolumn,
} from "../ulit/commonFunction";
import EditModals from "../../components/Common/editModel";
import { Edit, More, MoreVert } from "@mui/icons-material";
import { toast } from "react-toastify";
import ApiServices from "../../Network_call/apiservices";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import { Button } from "@mui/material";

const UserReport = ({ data, userData, report_id }) => {
  const [btnprimary1, setBtnprimary1] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [testdata, setTestdata] = useState([])
  const keys = Array.from(deepKeys(data && data?.data[0]));

  useEffect(() => {
    const GetElasticData = async (elasticIndex) => {
        let payload = {
          index: elasticIndex
        };
        const response = await ApiServices(
          "post",
          payload,
          ApiEndPoints.SearchData
        );
        setTestdata(response);
      }
      var index = data.hasOwnProperty("data") && data["data"].length > 0 && data["data"][0].hasOwnProperty("_index") ? data["data"][0]["_index"] : null;

      if(index != null){
        GetElasticData(index)
      }
    // }
  }, [data])

  
  const columns = data?.column
    ? data?.column.length > 0
      ? ColumnsHeadWithEdit(data?.column, data?.headerName)
      : Columns(keys)
    : Columns(keys);

  const hidecolumn = hidencolumn(keys);

  // ######################################### edt title ###############################################
  const OpenEditModel = (item) => {
    setReportTitle(item);
    setEditModal(true);
  };

  const onchange = (e) => {
    setReportTitle(e.target.value);
  };

  const UpdateReportTitle = async () => {
    let payload = {
      info: {
        dbName: userData.dbName,
        user_id: userData.user_id,
        table_id: data?._id,
        report_id: report_id,
      },
      data: { title: reportTitle },
    };
    const respons = await ApiServices(
      "post",
      payload,
      ApiEndPoints.UpdateReportTitle
    );
    toast(respons.msg);
    setEditModal(false);
  };

  return (
    <React.Fragment>
      <EditModals
        title="Edit Report Title"
        show={editModal}
        onCloseClick={() => setEditModal(false)}
        onClick={UpdateReportTitle}
        value={reportTitle}
        onInputChange={onchange}
      />

      <div
        id="datatable"
        className="table table-bordered dt-responsive nowrap"
        style={{
          borderCollapse: "collapse",
          borderSpacing: "0",
          width: "100%",
        }}
      >
        <Row>
          <Col md={12}>
            <MaterialTable
              data={testdata.length > 0 ? testdata : data.data}
              columns={columns}
              hidecolumn={hidecolumn}
              // enableFilterMatchHighlighting
              // enableRowSelection
              // enableColumnResizing
              // enableGrouping
              // enableHiding
              // enableRowVirtualization
              // columnResizeMode="onChange"
              enableColumnOrdering
              enablePagination
              enableBottomToolbar
              enableHiding
              enableColumnFilters
              enableGlobalFilter
              enableFullScreenToggle
              enableDensityToggle
              enableGrouping
              enableRowVirtualization
              enableColumnResizing
              columnResizeMode="onChange"
              manualSorting
              initialState={{ columnVisibility: hidecolumn }}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default UserReport;
