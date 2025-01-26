import { FileDownload } from "@mui/icons-material";
import React from "react";
import ReactToPrint from "react-to-print";
import { Dropdown, DropdownItem } from "reactstrap";

const ExportPdf = ({ content, Title }) => {
  const reactToPrintTriggerdash = React.useCallback(() => {
    return (
      <div>
        Export PDF 
      </div>
    );
  }, []);
  const handleAfterPrintdash = React.useCallback(() => {}, []);
  const handleBeforePrintdash = React.useCallback(() => {}, []);
  return (
    <div>
      {" "}
      <ReactToPrint
        content={content}
        documentTitle={Title}
        onAfterPrint={handleAfterPrintdash}
        onBeforePrint={handleBeforePrintdash}
        removeAfterPrint
        trigger={reactToPrintTriggerdash}
        sx={{ height: "40px" }}
      />
    </div>
  );
};

export default ExportPdf;
