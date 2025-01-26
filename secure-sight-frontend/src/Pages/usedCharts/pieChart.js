// import { MoreVert } from "@mui/icons-material";
// import React, { useState } from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
// } from "reactstrap";
// import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
// import { flattenObj, getFields, uniqs } from "../ulit/commonFunction";

// const PieChart = ({ data }) => {
//   const [columns, setColumns] = useState(data.column);
//   const [btnprimary1, setBtnprimary1] = useState(false);

//   // const singleColumnKeys = Object.keys(uniqs(data?.data));
//   // const singleColumnValues = Object.values(uniqs(data?.data));

//   // const DATA = data?.data.map((item) =>
//   //   item.reduce(function (a, b) {
//   //     return +a + +b;
//   //   })
//   // );
//   // const label = columns.map((item) => item);

//   // const chartData = {
//   //   labels: columns.length > 1 ? label : singleColumnKeys,
//   //   datasets: [
//   //     {
//   //       data: columns.length > 1 ? DATA : singleColumnValues,
//   //       backgroundColor: ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
//   //       borderColor: ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
//   //       hoverBackgroundColor: ["#34c38f", "#ff3d60", "#4aa3ff", "#212529"],
//   //       hoverBorderColor: "#fff",
//   //     },
//   //   ],
//   // };

//   const dataFilter = data?.data.map((i) => flattenObj(i));

//   const filter = data?.column.map((item, index) => getFields(dataFilter, item));
//   const singleColumnKeys = Object.keys(uniqs(filter));
//   const singleColumnValues = Object.values(uniqs(filter));
//   const label = columns && columns.map((item) => item);

//   var newCol = columns.map((item, index) => ({
//     label: item,
//     data: columns.length > 1 ? filter[index] : singleColumnValues,
//     fill: true,
//     backgroundColor: [
//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",
//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",
//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",
//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",

//       "#0db4d6",
//       "#f1b44c",
//       "#fb4d53",
//     ],
//     pointRadius: 2,
//     color: "#17202A",
//   }));
//   const chartData = {
//     labels: columns.length > 1 ? filter[0] : singleColumnKeys,
//     datasets: newCol,
//   };
//   return (
//     <React.Fragment>
//       <Pie width={537} height={268} data={chartData} />
//     </React.Fragment>
//   );
// };

// export default PieChart;


// import { MoreVert } from "@mui/icons-material";
// import React, { useState } from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
// } from "reactstrap";
// import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
// import { flattenObj, getFields, uniqs } from "../ulit/commonFunction";

// const PieChart = ({ data }) => {
//   const [columns, setColumns] = useState(data.column);
//   const [btnprimary1, setBtnprimary1] = useState(false);
//   const [colorMap, setColorMap] = useState({}); // Store user-selected colors
//   const [dropdownOpen, setDropdownOpen] = useState({}); // Manage dropdown state

//   const toggleDropdown = (key) => {
//     setDropdownOpen((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const dataFilter = data?.data.map((i) => flattenObj(i));
//   const filter = columns.map((item, index) => getFields(dataFilter, item));

//   const singleColumnKeys = Object.keys(uniqs(filter));
//   const singleColumnValues = Object.values(uniqs(filter));

//   const label = columns && columns.map((item) => item);

//   const colorOptions = [
//     "#FF5733", // Red
//     "#33FF57", // Green
//     "#3357FF", // Blue
//     "#FF33A1", // Pink
//     "#FFFF33", // Yellow
//     "#33FFF7", // Cyan
//     "#A833FF", // Purple
//     "#FF8333", // Orange
//     "#3333FF", // Dark Blue
//     "#FF3333", // Bright Red
//   ];

//   const handleColorChange = (key, color) => {
//     setColorMap((prev) => ({
//       ...prev,
//       [key]: color,
//     }));
//   };

//   const uniqueSourceNames = columns.length > 1 ? filter.flat() : singleColumnKeys;
//   const colors = uniqueSourceNames.map((name) => colorMap[name] || "#000000");

//   var newCol = [{
//     label: "Pie Chart Data",
//     data: columns.length > 1 ? filter.flat() : singleColumnValues,
//     backgroundColor: colors,
//     borderColor: "#fff",
//   }];

//   const chartData = {
//     labels: columns.length > 1 ? filter[0] : singleColumnKeys,
//     datasets: newCol,
//   };

//   return (
//     <React.Fragment>
//       <div>
//         {uniqueSourceNames.map((name) => (
//           <div key={name} style={{ marginBottom: '5px' }}>
//             {/* <label>{name}</label> */}
//             <Dropdown isOpen={dropdownOpen[name]} toggle={() => toggleDropdown(name)}>
//               <DropdownToggle caret>
//                 {/* {colorMap[name] || "Select Color"} */}
//                 Select Color
//               </DropdownToggle>
//               <DropdownMenu>
//                 {colorOptions.map((color) => (
//                   <DropdownItem
//                     key={color}
//                     onClick={() => handleColorChange(name, color)}
//                     style={{ backgroundColor: color, color: '#fff' }}
//                   >
//                     {color}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         ))}
//       </div>
//       <Pie width={537} height={268} data={chartData} />
//     </React.Fragment>
//   );
// };

// export default PieChart;

// import { MoreVert } from "@mui/icons-material";
// import React, { useState } from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
// } from "reactstrap";
// import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
// import { flattenObj, getFields, uniqs } from "../ulit/commonFunction";

// const PieChart = ({ data }) => {
//   const [columns, setColumns] = useState(data.column);
//   const [btnprimary1, setBtnprimary1] = useState(false);

//   const dataFilter = data?.data.map((i) => flattenObj(i));

//   const filter = data?.column.map((item, index) => getFields(dataFilter, item));
//   const singleColumnKeys = Object.keys(uniqs(filter));
//   const singleColumnValues = Object.values(uniqs(filter));
//   const label = columns && columns.map((item) => item);

//   const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const uniqueSourceNames = columns.length > 1 ? filter.flat() : singleColumnKeys;
//   const colors = uniqueSourceNames.map(() => getRandomColor());

//   var newCol = [{
//     label: "Pie Chart Data",
//     data: columns.length > 1 ? filter.flat() : singleColumnValues,
//     backgroundColor: colors,
//     borderColor: "#fff",
//   }];

//   const chartData = {
//     labels: columns.length > 1 ? filter[0] : singleColumnKeys,
//     datasets: newCol,
//   }

//   return (
//     <React.Fragment>
//       <Pie width={537} height={268} data={chartData} />
//     </React.Fragment>
//   );
// };

// export default PieChart;

import { MoreVert } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import { flattenObj, getFields, uniqs } from "../ulit/commonFunction";

const PieChart = ({ data }) => {
  const [columns, setColumns] = useState(data.column);
  const [btnprimary1, setBtnprimary1] = useState(false);

  const dataFilter = data?.data.map((i) => flattenObj(i));

  const filter = data?.column.map((item, index) => getFields(dataFilter, item));
  const singleColumnKeys = Object.keys(uniqs(filter));
  const singleColumnValues = Object.values(uniqs(filter));
  const label = columns && columns.map((item) => item);

  const predefinedColors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFFF33",
    "#33FFF7", "#A833FF", "#FF8333", "#3333FF", "#FF3333"
  ];

  const [colors] = useState(() => {
    const uniqueSourceNames = columns.length > 1 ? filter.flat() : singleColumnKeys;
    return uniqueSourceNames.map((_, index) => predefinedColors[index % predefinedColors.length]);
  });

  var newCol = [{
    label: "Pie Chart Data",
    data: columns.length > 1 ? filter.flat() : singleColumnValues,
    backgroundColor: colors,
    borderColor: "#fff",
  }];

  const chartData = {
    labels: columns.length > 1 ? filter[0] : singleColumnKeys,
    datasets: newCol,
  };

  return (
    <React.Fragment>
      <Pie width={537} height={268} data={chartData} />
    </React.Fragment>
  );
};

export default PieChart;