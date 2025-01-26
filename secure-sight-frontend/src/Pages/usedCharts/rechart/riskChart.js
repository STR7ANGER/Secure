import { Chart } from "chart.js";
import { useEffect, useRef, useState } from "react";

const RiskChart = ({ data }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      const providers = [];
      const riskLevels = ["Low", "Medium", "High"];
      const countData = {};
      // Count the number of risk levels for each provider
      data.forEach((item) => {
        if (!providers.includes(item["provider"]["value"])) {
          providers.push(item["provider"]["value"]);
          countData[item["provider"]["value"]] = {
            Low: 0,
            Medium: 0,
            High: 0,
          };
        }
        countData[item["provider"]["value"]][item.pretty_risk_level]++;
      });

      const color = ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"];
      // Create chart
      const ctx = document.getElementById("myChart");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: providers,
          datasets: riskLevels.map((level, index) => ({
            label: level,
            data: providers.map((provider) => countData[provider][level]),
            backgroundColor: color[index],
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            yAxes: [
              {
                stacked: false,
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
      setChart(newChart);
    }
  }, [chart, data]);

  return <div></div>;
};
export default RiskChart;
const processData = (data) => {
  const providers = {};
  const labels = ["Low", "Medium", "High"];
  const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
  ];

  data.forEach((item) => {
    const provider = item.provider.value;
    const riskLevel = item.pretty_risk_level;

    if (!providers[provider]) {
      providers[provider] = {
        low: 0,
        medium: 0,
        high: 0,
      };
    }

    providers[provider][riskLevel.toLowerCase()]++;
  });

  const datasets = Object.entries(providers).map(([provider, counts], i) => {
    return {
      label: provider,
      data: Object.values(counts),
      backgroundColor: colors[i],
    };
  });

  return {
    labels,
    datasets,
  };
};
