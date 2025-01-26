import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Spinner,
  Button,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialTable from "../../Tables/Table";
import ApiServices from "../../../Network_call/apiservices";
import ApiEndPoints from "../../../Network_call/ApiEndPoints";
import { Trash2 } from "lucide-react";
import {
  deepKeys,
  formatCapilize,
  replaceDot,
  allReplace,
} from "../../ulit/commonFunction";

const CSVFileView = () => {
  document.title = "CSV View | Secure Sight";
  const { id } = useParams();
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCSVFile = async () => {
      setLoading(true);
      try {
        const apiUrl = `${ApiEndPoints.FileGet}${id}`;
        const response = await ApiServices("get", {}, apiUrl);

        if (response.success) {
          setCsvData(response.data);
        } else {
          setError(response.msg || "Failed to fetch CSV file");
          toast.error(response.msg || "Failed to fetch CSV file");
        }
      } catch (error) {
        console.error("Error fetching CSV file:", error);
        setError("Error fetching CSV file: " + error.message);
        toast.error("Error fetching CSV file: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCSVFile();
  }, [id]);

  const handleDelete = async (rowIndex) => {
    try {
      // Assuming you have an API endpoint for deleting a specific row
      const apiUrl = `${ApiEndPoints.FileDeleteRow}${id}/${rowIndex}`;
      const response = await ApiServices("delete", {}, apiUrl);

      if (response.success) {
        // Update the local state by removing the deleted row
        setCsvData(prevData => ({
          ...prevData,
          data: prevData.data.filter((_, index) => index !== rowIndex)
        }));
        toast.success("Row deleted successfully");
      } else {
        toast.error(response.msg || "Failed to delete row");
      }
    } catch (error) {
      console.error("Error deleting row:", error);
      toast.error("Error deleting row: " + error.message);
    }
  };

  const getColumns = (data) => {
    if (!data || data.length === 0) return [];
    const keys = Array.from(deepKeys(data[0]));
    const columns = keys.map((name) => ({
      accessorKey: name,
      header: formatCapilize(
        replaceDot(
          allReplace(name, {
            "source.": " ",
            "attributes.": " ",
            "-": " ",
            _: " ",
          })
        )
      ),
    }));

    // Add delete button column
    columns.push({
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          color="danger"
          size="sm"
          className="btn-icon"
          onClick={() => handleDelete(row.index)}
        >
          <Trash2 size={16} />
        </Button>
      ),
    });

    return columns;
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="CSV" breadcrumbItem="CSV View" />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle>CSV File Details</CardTitle>
                  {loading ? (
                    <div className="text-center">
                      <Spinner color="primary" />
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : csvData ? (
                    <div>
                      <p>
                        <strong>File Name:</strong> {csvData.document_name}
                      </p>
                      <p>
                        <strong>Uploaded on:</strong>{" "}
                        {new Date(csvData.upload_date).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div className="alert alert-info">No CSV data found</div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {csvData && csvData.data && csvData.data.length > 0 && (
            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>CSV Data</CardTitle>
                    <MaterialTable
                      data={csvData.data}
                      columns={getColumns(csvData.data)}
                      hidecolumn={""}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CSVFileView;