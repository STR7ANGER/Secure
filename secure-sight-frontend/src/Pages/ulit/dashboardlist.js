import React from "react";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";

const DashboardList = async ({ dbName, userId, reload }) => {
  let payload = { dbName: dbName, user_id: userId };
  const response = await ApiServices(
    "post",
    payload,
    ApiEndPoints.UserDashbordList
  );

  localStorage.setItem("dashboard", JSON.stringify(response?.data || []));
  if (reload) {
    window.location.reload();
  }
};

const ReportList = async ({ dbName, userId, reload }) => {
  let payload = { dbName: dbName, user_id: userId };
  const response = await ApiServices(
    "post",
    payload,
    ApiEndPoints.GetReportList
  );

  localStorage.setItem("report", JSON.stringify(response?.data || []));

  if (reload) {
    window.location.reload();
  }
};

const setSelectedLanguage = async ({language}) => {
  let payload = { language: language };
  const response = await ApiServices(
    "post",
    payload,
    ApiEndPoints.ChangeLanguage
  );

}
export { DashboardList, ReportList, setSelectedLanguage };
