// import React from "react";
// import { Link } from "react-router-dom";
// import Breadcrumbs from "../../components/Common/Breadcrumb";

// const Index = () => {
//   function getAllKeys(data) {
//     const keys = [];

//     function collectKeys(obj, prefix = "") {
//       if (Array.isArray(obj)) {
//         obj.forEach((item, index) => {
//           collectKeys(item, `${prefix}[${index}]`);
//         });
//       } else if (typeof obj === "object" && obj !== null) {
//         Object.keys(obj).forEach((key) => {
//           const newPrefix = prefix ? `${prefix}.${key}` : key;
//           collectKeys(obj[key], newPrefix);
//         });
//       } else {
//         keys.push(prefix);
//       }
//     }

//     collectKeys(data);
//     return keys;
//   }

//   // const rrr = Array.from(deepKeys(data[0]));
//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Breadcrumbs title="Help" />
//         <Link> create dashboard</Link>
//         <Link> create report</Link>
//         <Link> create charts</Link>
//         <Link> create subreport</Link>
//         <Link> dashboard list</Link>
//         <Link> report list</Link>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Index;
// const data = [
//   {
//     key1: "value1",
//     key2: "value2",
//     nestedObject: {
//       nestedObject: [
//         {
//           nestedKey1: "nestedValue1",
//           nestedKey2: "nestedValue2",
//         },
//       ],
//       nestedKey1: "nestedValue1",
//       nestedKey2: "nestedValue2",
//     },
//   },
//   {
//     key1: "value1",
//     key2: "value2",
//     nestedObject: {
//       nestedObject: [
//         {
//           nestedKey1: "nestedValue1",
//           nestedKey2: "nestedValue2",
//         },
//       ],
//       nestedKey1: "nestedValue1",
//       nestedKey2: "nestedValue2",
//     },
//   },
//   {
//     key1: "value1",
//     key2: "value2",
//     nestedObject: {
//       nestedObject: [
//         {
//           nestedKey1: "nestedValue1",
//           nestedKey2: "nestedValue2",
//         },
//       ],
//       nestedKey1: "nestedValue1",
//       nestedKey2: "nestedValue2",
//     },
//   },
//   {
//     key1: "value1",
//     key2: "value2",
//     nestedObject: {
//       nestedObject: [
//         {
//           nestedKey1: "nestedValue1",
//           nestedKey2: "nestedValue2",
//         },
//       ],
//       nestedKey1: "nestedValue1",
//       nestedKey2: "nestedValue2",
//     },
//   },
// ];
import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: `fullname['last']`,
        header: "SDS Name",
        size: 100,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: 'fullname["last"]',
        header: "Last Name",
        size: 100,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "age",
        header: "Age",
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
      },
      {
        accessorKey: "salary",
        header: "Salary",
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) =>
          cell
            .getValue()
            .toLocaleString("en-US", { style: "currency", currency: "USD" }),
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Example;

//mock data of Person[]
export const data = [
  {
    id: "1",
    fullname: { first: "Homer", last: "Simpson" },

    age: 39,
    salary: 53000,
  },
  {
    id: "2",
    fullname: { first: "Homer", last: "SiDSDmpson" },
    age: 38,
    salary: 60000,
  },
  {
    id: "3",
    fullname: { first: "Homer", last: "SimDSDpson" },
    age: 10,
    salary: 46000,
  },
  {
    id: "4",
    fullname: { first: "Homer", last: "SimpsDSSDon" },
    age: 8,
    salary: 120883,
  },
  {
    id: "5",
    fullname: { first: "Homer", last: "SimpsoDSDn" },
    age: 1,
    salary: 22,
  },
];
