import { Grid, Typography } from "@mui/material";
import React from "react";
import { Card, CardBody } from "reactstrap";
import { formatCapilize } from "../../../ulit/commonFunction";

export default function SmartScanCard({ title, data }) {
  return (
    <React.Fragment>
      <Card style={{ width: "270px" }}>
        <CardBody>
          <Grid container direction="column" textAlign="center" margin="3px">
            <Typography variant="h3">{data} </Typography>
            <Typography variant="h5" color="silver">
              {formatCapilize(title)}
            </Typography>
          </Grid>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}
