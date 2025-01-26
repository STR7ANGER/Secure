import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RiskChart from "./riskChart";

const RechartBarChart = ({ data }) => {
  const data1 = [
    { pretty_risk_level: "Medium", provider: "aws" },
    { pretty_risk_level: "Low", provider: "aws" },
    { pretty_risk_level: "High", provider: "google" },
    { pretty_risk_level: "Medium", provider: "google" },
    { pretty_risk_level: "Low", provider: "azure" },
    { pretty_risk_level: "High", provider: "azure" },
  ];
  const countByProvider = {};
  data1.forEach((item) => {
    if (!countByProvider[item.provider]) {
      countByProvider[item.provider] = {};
    }
    if (countByProvider[item.provider][item.pretty_risk_level]) {
      countByProvider[item.provider][item.pretty_risk_level]++;
    } else {
      countByProvider[item.provider][item.pretty_risk_level] = 1;
    }
  });

  const chartData = [];
  for (let provider in countByProvider) {
    const countByRiskLevel = countByProvider[provider];
    chartData.push({
      provider: provider,
      Medium: countByRiskLevel["Medium"] || 0,
      Low: countByRiskLevel["Low"] || 0,
      High: countByRiskLevel["High"] || 0,
    });
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="provider" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartBarChart;
