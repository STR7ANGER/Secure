import React, { useState } from "react";
import { DropdownItem, Modal } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MaterialTable from "../../Pages/Tables/Table";
import { Columns, deepKeys } from "../../Pages/ulit/commonFunction";
import App from "../../Pages/reports/drapdrop";
import { Button } from "@mui/material";

const EditModals = ({
  title,
  show,
  onClick,
  onCloseClick,
  value,
  onInputChange,
}) => {
  return (
    <React.Fragment>
      {/* <Breadcrumbs title="UI Elements" breadcrumbItem="Modals" /> */}
      <Modal isOpen={show} toggle={onCloseClick} centered>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onCloseClick}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Enter Dashboard Name
              </label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                value={value}
                onChange={onInputChange}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
          <button type="button" onClick={onClick} className="btn btn-primary">
            Save Change
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};
export const EditHeaderModals = ({
  show,
  onCloseClick,
  onClick,
  data,
  handelChange,
}) => {
  const [index, setIndex] = useState(0);
  return (
    <React.Fragment>
      {/* <Breadcrumbs title="UI Elements" breadcrumbItem="Modals" /> */}
      <Modal isOpen={show} toggle={onCloseClick} centered>
        <div className="modal-header">
          <h5 className="modal-title">Edit Header Name</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onCloseClick}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="floatingSelectGrid"
                aria-label="Floating label select example"
                onChange={(e) => {
                  setIndex(e.target.value);
                }}
              >
                <option value="">Select Report</option>
                {data.headerName &&
                  data.headerName.map((item, index) => (
                    <option value={index}>{item}</option>
                  ))}
              </select>
              <label htmlFor="floatingSelectGrid">Select Report</label>
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Edit Header Name
              </label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                name={index}
                onChange={handelChange}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
          <button type="button" onClick={onClick} className="btn btn-primary">
            Save Change
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export const RawDataModel = ({ data, open, habndelClose, column, title }) => {
  return (
    <React.Fragment>
      {/* <DropdownItem>Raw Data</DropdownItem> */}

      <Modal isOpen={open} toggle={habndelClose} centered>
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            onClick={habndelClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <MaterialTable
            data={data}
            columns={column}
            title={title}
            // renderTopToolbarCustomActions={({ table }) => (
            //   <Button variant="text">{title}</Button>
            // )}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EditModals;

export const ReorderColumnsModels = ({
  data,
  open,
  habndelClose,
  onClick,
  onChange,
}) => {
  return (
    <React.Fragment>
      <DropdownItem></DropdownItem>

      <Modal isOpen={open} toggle={habndelClose} centered>
        <div className="modal-header">
          <h5 className="modal-title">Edit Header Name</h5>
          <button
            type="button"
            className="btn-close"
            onClick={habndelClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <App data={data} onChange={onChange} />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={habndelClose}
          >
            Close
          </button>{" "}
          <button type="button" onClick={onClick} className="btn btn-primary">
            Save Change
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};
