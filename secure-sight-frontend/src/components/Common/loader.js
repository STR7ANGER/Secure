import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Loader = ({ load }) => {
  const [loader] = useState(load);
  return (
    <>
      <ClipLoader
        color={"#ffffff"}
        loading={loader}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

    </>
  );
};

export default Loader;
