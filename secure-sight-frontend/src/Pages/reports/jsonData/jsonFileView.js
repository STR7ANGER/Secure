import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Spinner,
  Button
} from 'reactstrap';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaterialTable from '../../Tables/Table';
import ApiServices from '../../../Network_call/apiservices';
import ApiEndPoints from '../../../Network_call/ApiEndPoints';
import { Trash2 } from 'lucide-react';
import {
  deepKeys,
  formatCapilize,
  replaceDot,
  allReplace
} from '../../ulit/commonFunction';

const JSONFileView = () => {
  document.title = 'JSON View | Secure Sight';
  const { id } = useParams();
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJSONFile = async () => {
      setLoading(true);
      try {
        const apiUrl = `${ApiEndPoints.JSONFileGet}${id}`;
        const response = await ApiServices('get', {}, apiUrl);

        if (response.success) {
          setJsonData(response.data);
        } else {
          setError(response.msg || 'Failed to fetch JSON file');
          toast.error(response.msg || 'Failed to fetch JSON file');
        }
      } catch (error) {
        console.error('Error fetching JSON file:', error);
        setError('Error fetching JSON file: ' + error.message);
        toast.error('Error fetching JSON file: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJSONFile();
  }, [id]);

  const handleDelete = async (rowIndex) => {
    try {
      const apiUrl = `${ApiEndPoints.JSONFileDeleteRow}${id}/${rowIndex}`;
      const response = await ApiServices('delete', {}, apiUrl);

      if (response.success) {
        setJsonData((prevData) => ({
          ...prevData,
          data: prevData.data.filter((_, index) => index !== rowIndex)
        }));
        toast.success('Row deleted successfully');
      } else {
        toast.error(response.msg || 'Failed to delete row');
      }
    } catch (error) {
      console.error('Error deleting row:', error);
      toast.error('Error deleting row: ' + error.message);
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
            'source.': ' ',
            'attributes.': ' ',
            '-': ' ',
            _: ' '
          })
        )
      )
    }));

    columns.push({
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          color="danger"
          size="sm"
          className="btn-icon"
          onClick={() => handleDelete(row.index)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Trash2 size={16} />
        </Button>
      )
    });

    return columns;
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="JSON" breadcrumbItem="JSON View" />

          <Row>
            <Col className="col-12">
              <Card className="shadow-sm rounded-lg border-0">
                <CardBody>
                  <CardTitle tag="h4" className="mb-3">
                    JSON File Details
                  </CardTitle>
                  {loading ? (
                    <div className="d-flex justify-content-center my-5">
                      <Spinner color="primary" />
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : jsonData ? (
                    <div>
                      <p>
                        <strong>File Name:</strong> {jsonData.document_name}
                      </p>
                      <p>
                        <strong>Uploaded on:</strong>{' '}
                        {new Date(jsonData.upload_date).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div className="alert alert-info">No JSON data found</div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {jsonData && jsonData.data && jsonData.data.length > 0 && (
            <Row>
              <Col className="col-12">
                <Card className="shadow-sm rounded-lg border-0 mt-4">
                  <CardBody>
                    <CardTitle tag="h4" className="mb-3">
                      JSON Data
                    </CardTitle>
                    <MaterialTable
                      data={jsonData.data}
                      columns={getColumns(jsonData.data)}
                      hidecolumn={''}
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

export default JSONFileView;