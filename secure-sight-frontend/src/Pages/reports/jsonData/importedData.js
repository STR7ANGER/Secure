import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs, {
  Breadcrumbsub
} from '../../../components/Common/Breadcrumb';
import ApiServices from '../../../Network_call/apiservices';
import ApiEndPoints from '../../../Network_call/ApiEndPoints';
import MaterialTable from '../../Tables/Table';
import { deepKeys, formatCapilize } from '../../ulit/commonFunction';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function getAllKeys(data) {
  const keys = [];
  function collectKeys(obj, prefix = '') {
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        collectKeys(item, `${prefix}[${index}]`);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => {
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        collectKeys(obj[key], newPrefix);
      });
    } else {
      keys.push(prefix);
    }
  }
  collectKeys(data);
  return keys;
}

const ImportedData = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const document_name = searchParams.get('document_name');
  const id = searchParams.get('_id');

  document.title = 'JSON Data | Secure Sight';
  const [data, setData] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    dbName: '',
    user_id: ''
  });

  useEffect(() => {
    let userObject = localStorage.getItem('authUser');
    var userInfo = userObject ? JSON.parse(userObject) : '';
    setUserData({
      email: userInfo.email,
      dbName: userInfo.dbName,
      user_id: userInfo._id
    });
    getJSONData({ user_id: userInfo._id, dbName: userInfo.dbName });
  }, []);

  const getJSONData = async ({ dbName, user_id }) => {
    setOpenLoader(true);
    let payload = {
      dbName: dbName,
      user_id: user_id,
      _id: id,
      document_name: document_name
    };
    const response = await ApiServices('post', payload, ApiEndPoints.FileGet);
    toast(response.msg, { autoClose: 2000 });
    setData(response?.data[0]?.data || []);
    setOpenLoader(false);
  };

  const keys = Array.from(getAllKeys(data.length > 0 && data[0]));
  const columns = keys.map((name) => ({
    accessorKey: name,
    header: formatCapilize(name)
  }));

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="JSON" breadcrumbItem="Data" />
          <Breadcrumbsub
            title={document_name}
            breadcrumbItem={
              <Link to="/json-list">
                <button className="btn btn-primary waves-effect waves-light">
                  <i className="ri-arrow-left-line align-middle ms-2"></i>
                  Back
                </button>
              </Link>
            }
          />

          <Row>
            <Col lg={12}>
              <Card className="shadow-sm rounded-lg border-0 mt-4">
                <CardBody>
                  <div className="table-responsive">
                    {data.length > 0 ? (
                      <MaterialTable data={data} columns={columns} />
                    ) : (
                      <div className="alert alert-info">
                        No JSON data available.
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={() => setOpenLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default ImportedData;