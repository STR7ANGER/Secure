import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  Col,
  Row,
  Container,
  Input,
} from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import ApiEndPoints from '../../Network_call/ApiEndPoints';
import ApiServices from '../../Network_call/apiservices';
import { ReportList } from '../ulit/dashboardlist';

const CreateReport = () => {
  document.title = 'Create Report | Secure Sight';

  const [openLoader, setOpenLoader] = useState(false);
  const [reportName, setReportName] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    dbName: '',
    user_id: '',
  });

  useEffect(() => {
    const userObject = localStorage.getItem('authUser');
    const userInfo = userObject ? JSON.parse(userObject) : {};
    setUserData({
      email: userInfo.email,
      dbName: userInfo.dbName,
      user_id: userInfo._id,
    });

    ReportList({
      dbName: userInfo.dbName,
      userId: userInfo._id,
      reload: false,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenLoader(true);
    const payload = {
      info: { dbName: userData.dbName },
      data: { reportName, user_id: userData.user_id },
    };

    const response = await ApiServices('post', payload, ApiEndPoints.CreateReport);
    toast(response.msg, { autoClose: 10000 });

    if (response) {
      ReportList({
        dbName: userData.dbName,
        userId: userData.user_id,
        reload: true,
      });
      window.location.reload();
    }
    setOpenLoader(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content dark-dashboard">
        <div className="gradient-overlay"></div>
        <Container fluid>
          <Breadcrumbs title="Report" breadcrumbItem="Create Report" />
          <div className="dashboard-header">
            <h1 className="main-title">
              <i className="bx bxs-dashboard"></i>
              Create Report
            </h1>
            {/* <p className="header-description">Make your own Reports</p> */}
          </div>
          <Row className="justify-content-center">
            <Col xl={6} lg={8} md={10}>
              <Card className="dark-card">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit} className="dark-form">
                    <div className="form-section">
                      <label htmlFor="reportName" className="dark-label">
                        Report Name
                      </label>
                      <div className="dark-input-group">
                        <Input
                          type="text"
                          id="reportName"
                          placeholder="Enter report name"
                          value={reportName}
                          onChange={(e) => setReportName(e.target.value)}
                          className="dark-input"
                          maxLength={50}
                          required
                        />
                        <div className="input-icon">
                          <i className="bx bx-layout"></i>
                        </div>
                      </div>
                    </div>

                    <div className="workspace-info">
                      <div className="workspace-icon">
                        <i className="bx bx-data"></i>
                      </div>
                      <div className="workspace-details">
                        <span className="workspace-label">Current Workspace</span>
                        <span className="workspace-name">{userData.dbName || 'Default'}</span>
                      </div>
                    </div>

                    <div className="action-section">
                      <button type="submit" disabled={!reportName.trim()} className="dark-button">
                        Create Report
                      </button>
                    </div>
                  </form>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <style>
          {`
            .dark-dashboard {
              background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
              min-height: 100vh;
              padding: 2rem 1rem;
              position: relative;
              overflow: hidden;
            }

            .gradient-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background:
                radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 25%),
                radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 25%);
              pointer-events: none;
            }

            .dashboard-header {
              margin-bottom: 2.0rem;
              padding: 1rem 0;
              position: relative;
            }

            .header-content {
              text-align: center;
              max-width: 600px;
              margin: 0 auto;
            }

            .main-title {
              margin-top:4vh;
              font-size: 2.5rem;
              color: #f0f9ff;
              font-weight: 700;
              margin-bottom: 0.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.75rem;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }

            .main-title i {
              font-size: 2rem;
              color: #38bdf8;
            }

            .header-description {
              color: #bae6fd;
              font-size: 1.1rem;
              margin-bottom: 0;

              margin-right:vh;

            }

            .dark-card {
              background: rgba(15, 23, 42, 0.95);
              border: 1px solid rgba(56, 189, 248, 0.1);
              border-radius: 24px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(10px);
              transition: all 0.3s ease;
            }

            .dark-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.3);
              border-color: rgba(56, 189, 248, 0.2);
            }

            .form-section {
              margin-bottom: 2rem;
            }

            .dark-label {
              font-size: 0.9rem;
              font-weight: 600;
              color: #7dd3fc;
              margin-bottom: 0.5rem;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            .dark-input-group {
              position: relative;
              display: flex;
              align-items: center;
            }

            .dark-input {
              height: 3.5rem;
              border-radius: 16px;
              border: 2px solid rgba(56, 189, 248, 0.2);
              padding: 0 1rem;
              font-size: 1rem;
              transition: all 0.2s ease;
              padding-right: 3rem;
              background: rgba(15, 23, 42, 0.8);
              color: #f0f9ff;
              width: 100%;
            }

            .dark-input:focus {
              border-color: #38bdf8;
              box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
              outline: none;
            }

            .dark-input:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }

            .dark-input::placeholder {
              color: #94a3b8;
            }

            .input-icon {
              position: absolute;
              right: 1rem;
              color: #38bdf8;
              font-size: 1.25rem;
            }

            .workspace-info {
              background: rgba(15, 23, 42, 0.6);
              border-radius: 16px;
              padding: 1.25rem;
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 2rem;
              border: 1px solid rgba(56, 189, 248, 0.1);
            }

            .workspace-icon {
              background: #0284c7;
              width: 48px;
              height: 48px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              color: white;
              box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.2);
            }

            .workspace-details {
              display: flex;
              flex-direction: column;
            }

            .workspace-label {
              font-size: 0.875rem;
              color: #7dd3fc;
              font-weight: 500;
            }

            .workspace-name {
              font-weight: 600;
              color: #f0f9ff;
              font-size: 1.1rem;
            }

            .action-section {
              text-align: center;
            }

            .dark-button {
              background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
              color: white;
              border: none;
              border-radius: 16px;
              padding: 1rem 2.5rem;
              font-size: 1.1rem;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 0.75rem;
              transition: all 0.3s ease;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.2);
            }

            .dark-button:hover:not(:disabled) {
              background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
              transform: translateY(-2px);
              box-shadow: 0 8px 12px -1px rgba(56, 189, 248, 0.3);
            }

            .dark-button:disabled {
              background: #475569;
              cursor: not-allowed;
              transform: none;
              box-shadow: none;
            }

            .dark-button i {
              font-size: 1.4rem;
            }

            @media (max-width: 768px) {
              .dark-dashboard {
                padding: 1rem;
              }

              .main-title {
                font-size: 1.8rem;
              }

              .header-description {
                font-size: 1rem;
              }

              .dark-button {
                width: 100%;
                justify-content: center;
              }
            }

            @keyframes glow {
              0% {
                box-shadow: 0 0 5px rgba(56, 189, 248, 0.2);
              }
              50% {
                box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
              }
              100% {
                box-shadow: 0 0 5px rgba(56, 189, 248, 0.2);
              }
            }

            .dark-card:hover {
              animation: glow 4s infinite;
            }
          `}
        </style>
    </React.Fragment>
  );
};

export default CreateReport;








