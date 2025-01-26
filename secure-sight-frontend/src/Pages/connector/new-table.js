import { CloseOutlined } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

// Import Breadcrumb
import { Link } from "react-router-dom";
import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
import {
	allReplace, formatCapilize,
	objectkey,
	uperCase,
} from "../ulit/commonFunction";

// Add the following import for Ant Design Table
import { Modal, Select, Table } from "antd";
import "./antd-table.scss";
// import "../../css/antd/antd.css"

const ConnectorListTwo = () => {
	// document.title = "Connector List | Trend Micro Unity";
	document.title = "Connector List | Secure Sight"
	const tooltipMessage = 'Config data is not added';

	const [openLoader, setOpenLoader] = useState(false);
	const [connectorList, setConnectorList] = useState([]);
	const [searchedVal, setSearchedVal] = useState("");
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
	const [selectedConnector, setSelectedConnector] = useState(null);
	const [connectorName, setConnectorName] = useState("");
	const [config, setConfig] = useState(true);
	const [configData, setConfigData] = useState({});
	const [schedulerData, setSchedulerData] = useState({
		connectorId: "",
		repeat: "",
		minute: "",
		hour: "",
		weekDay: "",
		monthDay: "",
	});

	const [userData, setUserData] = useState({
		email: "",
		dbName: "",
		user_id: "",
	});

	useEffect(() => {
		let userObject = localStorage.getItem("authUser");
		var userInfo = userObject ? JSON.parse(userObject) : "";
		setUserData(() => ({
			email: userInfo.email,
			dbName: userInfo.dbName,
			user_id: userInfo._id,
		}));
		connectorData(userInfo.dbName);
	}, []);

	//   ######################################## connector list  ##########################################
	const connectorData = async (item) => {
		setOpenLoader(true);
		const payload = {
			info: { dbName: item },
		};
		const response = await ApiServices(
			"post",
			payload,
			ApiEndPoints.ConectoreList
		);
		setConnectorList(response);
		setOpenLoader(false);
	};
	// ############################################## connector conig ######################################

	const ConnectorConfigDetail = async (item) => {
		// debugger
		setConfigData({});
		// const payload = { dbName: userData.dbName, connector_id: item };
		// const response = await ApiServices(
		//     "post",
		//     payload,
		//     ApiEndPoints.ConnectorConfigDetail
		// );
		var connectorConfigurationDetail = connectorList.find((record) => record._id == item)
		var jsonData = {
			info: { dbName: userData.dbName, connectorId: item },
			data: {
				config: connectorConfigurationDetail?.config?.properties,
				connectorBasePath: connectorConfigurationDetail?.display_name,
				connectorFileNameWithExtension: "inventry.py",
			},
		};
		// if (response.success) {
		setConfig(false);
		setConnectorName(jsonData.data.connectorBasePath);
		if(connectorConfigurationDetail.scheduleInfo) {
			const scheduleInfo = connectorConfigurationDetail.scheduleInfo
			setSchedulerData({
				connectorId: item,
				repeat: scheduleInfo.repeat,
				minute: scheduleInfo.minute,
				hour: scheduleInfo.hour,
				weekDay: scheduleInfo.day,
				monthDay: scheduleInfo.date
			})
			console.log(objectkey(jsonData.data.config).reduce((p, c) => {
				return {
					...p,
					[c]: scheduleInfo.config[c]
				}
			}, {}))
			setConfigData(objectkey(jsonData.data.config).reduce((p, c) => {
				return {
					...p,
					[c]: scheduleInfo.config[c]
				}
			}, {}))
		}else{
			setConfigData(objectkey(jsonData.data.config).reduce((p, c) => {
				return {
					...p,
					[c]: ''
				}
			}, {}));
		}
		//  }
	};

	// ############################################ scheduler repeat  ########################################

	const RunScheduler = async (isSchedule) => {
		setOpenLoader(!openLoader);

		let schedulConfig = objectkey(configData).map((i) => ({
			[i]: configData[i],
		}));
		let payload = {
			info: {
				dbName: userData.dbName,
				connectorId: selectedConnector.key, // Use the selected connector's ID
				isScheduled: JSON.parse(isSchedule),
			},

			data: {
				minute: schedulerData.minute,
				hour:
					schedulerData.repeat === "minute"
						? 0
						: schedulerData.hour,
				day:
					schedulerData.repeat === "hourly" ||
						schedulerData.repeat === "minute"
						? 0
						: schedulerData.weekDay,
				date:
					schedulerData.repeat === "hourly" ||
						schedulerData.repeat === "minute"
						? 0
						: schedulerData.monthDay,
				inventory: uperCase(connectorName),
				repeat: schedulerData.repeat,
				config: Object.assign({}, ...schedulConfig),
			},
		};
		let parameterSavePayload = {
			dbName: userData.dbName,
			connector_id: schedulerData.connectorId,
			config: configData,
		};
		const respons = await ApiServices(
			"post",
			payload,
			ApiEndPoints.ConnectorScheduler
		);
		// const parameterSave =
		//     isSchedule === "true" || true
		//         ? await ApiServices(
		//             "post",
		//             parameterSavePayload,
		//             ApiEndPoints.ConnectorParameterSave
		//         )
		//         : null;
		toast(respons.msg, { autoClose: 2000 });
		connectorData(userData.dbName)
		setScheduleModalVisible(false);
		setOpenLoader(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		configData[name] = value;
	};

	const handelChange = ({ event, name }) => {
		setSchedulerData((prev) => ({
			...prev,
			[name]: event,
		}));
	};
	const handleSchedule = (record) => {
		// debugger
		setSelectedConnector(record);
		ConnectorConfigDetail(record.key); // Fetch the configuration data for the selected connector
		setScheduleModalVisible(true);
	};
	const onSelectChange = (selectedRowKeys) => {
		console.log("selected row", selectedRowKeys)
		setSelectedRowKeys([]);
	}


	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index",
		},
		{
			title: "Connector Name",
			dataIndex: "connectorName",
			key: "connectorName",
			render: (text, record) => (
				<Link to={"/connector-log/" + record.connectorName} state={{ display_name: record.connectorName }}>
					{formatCapilize(allReplace(record.connectorName, { _: " ", "-": " " }))}
				</Link>
			),
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Installed On",
			dataIndex: "created_at",
			key: "created_at",
		},
		{
			title: "Log File",
			dataIndex: "logFile",
			key: "logFile",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (text, record) => (
				<>
					{record?.isConnectorScheduled && record?.isConnectorScheduled === true
						? "Running"
						: record?.isConnectorScheduled === false
							? "Stopped"
							: "Pending"}
				</>
			),
		},
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			render: (text, record) => (
				<>
					<button onClick={() => handleSchedule(record)} type="button" className="btn noti-icon m-0 p-0">
						<i className="mdi mdi-calendar"></i>
					</button>
					{/* <button onClick={() => ConnectorConfigDetail({ id: record._id, connectorData: record })} type="button" className="btn  noti-icon  m-0 p-0">
                        <i className="mdi mdi-timer"></i>
                    </button>
                    <button onClick={() => DeleteAlert(record._id)} type="button" className="btn  noti-icon  m-0 p-0">
                        <i className="mdi mdi-delete"></i>
                    </button> */}
				</>
			),
		},
	];


	const data = connectorList
		.filter(
			(x) =>
				!searchedVal.length ||
				x.display_name
					.toString()
					.toLowerCase()
					.includes(searchedVal.toString().toLowerCase()) ||
				x.created_at
					.toString()
					.toLowerCase()
					.includes(searchedVal.toString().toLowerCase())
		)
		.map((item, index) => ({
			key: item._id,
			index: index + 1,
			connectorName: formatCapilize(allReplace(item.display_name, { _: " ", "-": " " })),
			category: item.category,
			created_at: item.created_at,
			logFile: (
				<Link to={"/connector-log/" + item.display_name} state={{ display_name: item.display_name }}>
					{formatCapilize(allReplace(item.display_name, { _: " ", "-": " " }))}
				</Link>
			),
			status: (
				<>
					{item?.isConnectorScheduled && item?.isConnectorScheduled === true
						? "Running"
						: item?.isConnectorScheduled === false
							? "Stopped"
							: "Pending"}
				</>
			),
		}));



	return (
		<Fragment>
			<Row>
				<Col md={12}>
					<Card>
						<CardBody>
							<CardTitle>
								<div>
									<Breadcrumbsub
										title="Connector List"
										breadcrumbItem={
											<div className="input-group">
												<button onClick={() => setSearchedVal("")} className="input-group-text">
													<CloseOutlined />
												</button>
												<input
													type="text"
													className="form-control"
													id="autoSizingInputGroup"
													placeholder="Search"
													value={searchedVal}
													onChange={(e) => setSearchedVal(e.target.value)}
												/>
											</div>
										}
									/>
								</div>
							</CardTitle>
							{connectorList.length > 0 ? (
								<Table
									className="dark-table-container"
									dataSource={data}
									columns={columns}
									rowSelection={{
										type: "radio",
										selectedRowKeys,
										onChange: onSelectChange,
									}}
								/>
							) : (
								<p>No data available</p>
							)}
						</CardBody>
						<Modal
							title="Schedule Connector"
							open={scheduleModalVisible}
							onCancel={() => setScheduleModalVisible(false)}
							// onOk={handleOk}
							onOk={() => {
								// Perform the schedule operation, you can access the selectedConnector here
								setScheduleModalVisible(false);
							}}
							width={800}
						>
							<form>
								<Row gutter={[16, 16]}>
									{/* <Col md={6}>
                                        <div className="form-floating mb-3">
                                            <select
                                                className="form-select"
                                                id="floatingSelectGrid"
                                                aria-label="Floating label select example"
                                                onChange={(e) => {
                                                    handelChange({
                                                        event: e.target.value,
                                                        name: "connectorId",
                                                    });
                                                    ConnectorConfigDetail(e.target.value);
                                                }}
                                            >
                                                <option value="">Select Connector</option>
                                                {connectorList &&
                                                    connectorList.map((item, index) => (
                                                        <option value={item._id}>
                                                            {formatCapilize(
                                                                allReplace(item.display_name, {
                                                                    _: " ",
                                                                    "-": " ",
                                                                })
                                                            )}
                                                        </option>
                                                    ))}
                                            </select>
                                            <label htmlFor="floatingSelectGrid">
                                                Select Connector
                                            </label>
                                        </div>
                                    </Col> */}

									<SelectOption data={shedulerRepeat} value={schedulerData.repeat} name="repeat" handelChange={handelChange} />

									{ schedulerData.repeat ? 
										<>
											{schedulerData.repeat === 'monthly' && (
												<SelectOption data={monthData} value={schedulerData.monthDay} name="monthDay" handelChange={handelChange} />
											)}

											{schedulerData.repeat === 'weekly' && (
												<SelectOption data={weekData} value={schedulerData.weekDay} name="weekDay" handelChange={handelChange} />
											)}

											{schedulerData.repeat !== 'minute' && (
												<SelectOption data={hourData} value={schedulerData.hour} name="hour" handelChange={handelChange} />
											)}

											<SelectOption data={minuteData} value={schedulerData.minute} name="minute" handelChange={handelChange} />
										</> : null }
								</Row>
							</form>
							{objectkey(configData).length > 0 && (
								<Row gutter={[16, 16]}>
									<Col xl={12}>
										<Card>
											<CardBody>
												<Row gutter={[16, 16]}>
													{configData &&
														objectkey(configData).map((i, u) => (
															<Col md={6} key={i}>
																<div className="form-floating mb-3 fullwidth">
																	<input
																		defaultValue={configData[i]}
																		name={i}
																		className="form-control"
																		id="floatingFirstnameInput"
																		placeholder="Enter Your First Name"
																		onChange={handleInputChange}
																	/>
																	<label htmlFor="floatingFirstnameInput">{i} </label>
																</div>
															</Col>
														))}
												</Row>
												<Row gutter={[16, 16]}>
													<Col md={6}>
														<div>
															<button
																disabled={config}
																onClick={() => {
																	RunScheduler(true);
																}}
																className="btn btn-primary w-md"
															>
																Run Connector
															</button>
														</div>
													</Col>
													<Col md={6}>
														<div>
															<button
																disabled={!config}
																onClick={() => {
																	RunScheduler(false);
																}}
																className="btn btn-danger w-md"
															>
																Stop Connector
															</button>
														</div>
													</Col>
												</Row>
											</CardBody>
										</Card>
									</Col>
								</Row>
							)}

							{/* <DatePicker.RangePicker
                                showTime
                                value={[
                                    selectedConnectorSchedulerData.start_time,
                                    selectedConnectorSchedulerData.end_time,
                                ]}
                                onChange={(date, dateString) =>
                                    setSelectedConnectorSchedulerData((prevData) => ({
                                        ...prevData,
                                        start_time: date[0],
                                        end_time: date[1],
                                    }))
                                }
                            /> */}

							{/* <Select defaultValue="daily"
                                style={{ width: 120, marginTop: "20px" }}
                                onChange={(value) =>
                                    setSelectedConnectorSchedulerData((prevData) => ({
                                        ...prevData,
                                        repeat: value,
                                    }))
                                }>
                                <Select.Option value="minute">Minute</Select.Option>
                                <Select.Option value="hourly">Hourly</Select.Option>
                                <Select.Option value="daily">Daily</Select.Option>
                                <Select.Option value="weekly">Weekly</Select.Option>
                                <Select.Option value="monthly">Monthly</Select.Option>
                                <Select.Option value="quarterly">Quarterly</Select.Option>
                                <Select.Option value="yearly">Yearly</Select.Option>
                            </Select> */}
							{/* <Row style={{ margin: "35px" }}>
                                <Col md={6}>
                                    <div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>{!config && objectkey(configData).length === 0 ? tooltipMessage : ''}</Tooltip>}
                                        >
                                            <button
                                                disabled={!configData || objectkey(configData).length === 0}
                                                onClick={() => {
                                                    RunScheduler(true);
                                                }}
                                                className="btn btn-primary w-md"
                                                title={!config && objectkey(configData).length === 0 ? 'Config data is not added' : ''}
                                            >
                                                Run Connector
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>{!config && objectkey(configData).length === 0 ? tooltipMessage : ''}</Tooltip>}
                                        >
                                            <button
                                                disabled={!config || objectkey(configData).length === 0}
                                                onClick={() => {
                                                    RunScheduler(false);
                                                }}
                                                className="btn btn-danger w-md"
                                                title={!config && objectkey(configData).length === 0 ? 'Config data is not added' : ''}
                                            >
                                                Stop Connector
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </Col>
                            </Row> */}
						</Modal>
					</Card>
				</Col>
			</Row>
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openLoader} onClick={() => setOpenLoader(false)}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Fragment>
	);
};

export default ConnectorListTwo;

const SelectOption = ({ data, name, value, handelChange }) => {
	return (
		<Col md={6}>
			<div className="form-floating mb-3">
				<Select
					className="form-select"
					style={{ width: '100%' }}
					placeholder={`Select ${formatCapilize(name)}`}
					value={value}
					onChange={(value) => {
						handelChange({
							event: value,
							name: name,
						});
					}}
				>
					{data.map((item, index) => (
						<Select.Option key={item.value || item} value={item.value || item}>
							{name === 'connector'
								? formatCapilize(allReplace(item.display_name, { _: ' ', '-': ' ' }))
								: name === 'weekDay'
									? formatCapilize(item.name)
									: item}
						</Select.Option>
					))}
				</Select>
				<label htmlFor="floatingSelectGrid">Select {name}</label>
			</div>
		</Col>
	);
};

const shedulerRepeat = ["monthly", "weekly", "daily", "hourly", "minute"];
const minuteData = [];
for (let i = 1; i <= 59; i++) {
	minuteData.push(i);
}
const monthData = [];
for (let i = 1; i <= 31; i++) {
	monthData.push(i);
}
const weekData = [
	{ value: "0", name: "sunday" },
	{ value: "1", name: "monday" },
	{ value: "2", name: "Tuesday" },
	{ value: "3", name: "Wednesday" },
	{ value: "4", name: "Thursday" },
	{ value: "5", name: "Friday" },
	{ value: "6", name: "Saturday" },
];
// for (let i = 1; i <= 7; i++) {
//   weekData.push(i);
// }

const hourData = [];
for (let i = 1; i <= 23; i++) {
	hourData.push(i);
}
