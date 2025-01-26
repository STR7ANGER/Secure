import { Autocomplete, Box } from "@mui/material";
import { useMemo } from "react";

function formatText(text) {
  return text.replaceAll("_", " ");
}

const capitalizedArray = (myArray) => {
  const newData = myArray.map((element) => {
    return element.charAt(0).toUpperCase() + element.slice(1);
  });
  return newData;
};

function* deepKeys(t, pre = []) {
  if (Array.isArray(t)) return;
  else if (Object(t) === t)
    for (const [k, v] of Object.entries(t)) yield* deepKeys(v, [...pre, k]);
  else yield pre.join(".");
}

const Columns = (data) => {
  var columns = useMemo(
    () =>
      data &&
      data.map((name) => ({
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
        Cell: ({ cell }) =>
          name === "Severity" ||
            name === "severity" ||
            name === "risk-level" ||
            name === "Risk-Level" ||
            name === "Risk" ? (
            <Box
              component="span"
              sx={(theme) => ({
                backgroundColor:
                  cell.getValue() === "High" || cell.getValue() === "high"
                    ? theme.palette.error.dark
                    : cell.getValue() === "low" || cell.getValue() === "Low"
                      ? theme.palette.warning.dark
                      : cell.getValue() === "Medium" || cell.getValue() === "medium"
                        ? theme.palette.warning.dark
                        : cell.getValue() === "critical" ||
                          cell.getValue() === "Critical"
                          ? theme.palette.success.dark
                          : "",
                borderRadius: "0.25rem",
                // color: "#fff",
                maxWidth: "9ch",
                p: "0.25rem",
              })}
            >
              {cell.getValue()?.toLocaleString?.("", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Box>
          ) : cell.getValue() === null ? (
            "N/A"
          ) : cell.getValue() === false ? (
            "false"
          ) : cell.getValue() === true ? (
            "true"
          ) : (
            cell.getValue()
          ),
      }))
  );
  return columns;
};
const ColumnsHeadWithEdit = (access, headername) => {
  var columns = useMemo(
    () =>
      access &&
      access.map((name, index) => ({
        accessorKey: name,
        header: replaceDot(
          formatCapilize(
            allReplace(headername[index], {
              "source.": " ",
              "attributes.": " ",
              "-": " ",
              _: " ",
            })
          )
        ),
        // Edit: ({ cell, column, table }) => <Autocomplete />,
        // Cell: ({ cell }) => (
        //   <Box
        //     component="span"
        //     sx={(theme) => ({
        //       backgroundColor:
        //         cell.getValue() == "LOW" || cell.getValue() == "Low"
        //           ? theme.palette.error.dark
        //           : cell.getValue() == "MEDIUM" || cell.getValue() == "Medium"
        //           ? theme.palette.warning.dark
        //           : cell.getValue() == "HIGH" || cell.getValue() == "High"
        //           ? theme.palette.success.dark
        //           : null,
        //       borderRadius: "0.25rem",
        //       color: "#fff",
        //       maxWidth: "9ch",
        //       p: "0.25rem",
        //     })}
        //   >
        //     {cell.getValue()?.toLocaleString?.("en-US", {
        //       style: "currency",
        //       currency: "USD",
        //     })}
        //   </Box>
        // ),
      }))
  );
  return columns;
};
function allReplace(str, obj) {
  for (const x in obj) {
    str = str?.replace(new RegExp(x, "g"), obj[x]);
  }
  return str;
}

function hidencolumn(data) {
  var hidecolumn = {};

  data &&
    data.forEach((name, index) =>
      index > 5 ? (hidecolumn[name] = false) : null
    );
  return hidecolumn;
}

// ################################################  for charts ########################################
const uniqs = (data) => {
  var uniq =
    data &&
    data[0].reduce((acc, val) => {
      acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
      return acc;
    }, {});
  return uniq;
};
const uniqsarr = (data) => {
  var uniq =
    data &&
    data.reduce((acc, val) => {
      acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
      return acc;
    }, {});
  return uniq;
};

const flattenObj = (ob) => {
  let result = {};
  for (const i in ob) {
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[i + "." + j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
};

function getFields(input, field) {
  var output = [];
  for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
  return output;
}
function replaceDot(text) {
  //    const test= text.replaceAll("/", "_");
  const tests = text.replaceAll("/", "");
  return tests.replaceAll(".", " ");
}
const replaceAllObjKeys = (obj, getNewKey) => {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      replaceAllObjKeys(obj[i], getNewKey);
    }
  } else if (typeof obj === "object") {
    for (const key in obj) {
      const newKey = getNewKey(key);
      obj[newKey] = obj[key];
      if (key !== newKey) {
        delete obj[key];
      }
      replaceAllObjKeys(obj[newKey], getNewKey);
    }
  }

  return obj;
};

const objectkey = (item) => {
  const data = Object.keys(item);
  return data;
};
function arrayReduce(data) {
  const newData = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return newData;
}
function formatCapilize(text) {
  const arr = text.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
}
function sortObject(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}
function uperCase(text) {
  return text.toUpperCase();
}
export {
  deepKeys,
  Columns,
  allReplace,
  hidencolumn,
  uniqs,
  flattenObj,
  getFields,
  capitalizedArray,
  replaceDot,
  replaceAllObjKeys,
  objectkey,
  uniqsarr,
  formatText,
  arrayReduce,
  formatCapilize,
  sortObject,
  uperCase,
  ColumnsHeadWithEdit,
};
