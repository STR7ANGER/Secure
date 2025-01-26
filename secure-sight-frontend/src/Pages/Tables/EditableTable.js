import React from "react";
import { useTable, usePagination } from "react-table";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = React.useState(initialValue);
  document.title = "Editable Table | Upzet - React Admin & Dashboard Template";

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
  Cell: EditableCell,
};

function Table({ columns, data, updateMyData, skipPageReset }) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        autoResetPage: !skipPageReset,
        updateMyData,
      },
      usePagination
    );

  return (
    <>
      <table {...getTableProps()} className="table table-editable table-nowrap align-middle table-edits">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function EditableTable() {
  const Tdata = React.useMemo(
    () => [
      {
        id: 1,
        name: "David McHenry",
        age: "24",
        gender: "Male",
      },
      {
        id: 2,
        name: "Frank Kirk",
        age: "22",
        gender: "Male",
      },
      {
        id: 3,
        name: "Rafael Morales",
        age: "26",
        gender: "Male",
      },
      {
        id: 4,
        name: "Mark Ellison",
        age: "32",
        gender: "Male",
      },
      {
        id: 5,
        name: "Minnie Walter",
        age: "27",
        gender: "Female",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => Tdata);

  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Tables" breadcrumbItem="Editable Table" />
        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <h4 className="card-title">Datatable Editable</h4>
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditableTable;
