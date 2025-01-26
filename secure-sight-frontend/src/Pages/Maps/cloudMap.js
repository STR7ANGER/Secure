import { VectorMap } from "@react-jvectormap/core";
import React from "react";
import { mapData } from "../../data/mapData";
import { Container } from "reactstrap";
import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import AWSimg from "../../assets/images/bg.png";
const Map = ({ markerData }) => {
  return (
    <Container>
      <Breadcrumbsub
        title="CLOUD ASSETS BY LOCATION"
        breadcrumbItem={
          <div className="input-group">
            <select
              className="form-select"
              id="floatingSelectGrid"
              aria-label="Floating label select example"
              // onChange={HandleReportChange}
            >
              <option value="">ALL CLOUD ASSETS</option>
              <option value="AWS">AWS CLOUD ASSETS</option>
              <option value="GCP">GCP CLOUD ASSETS</option>
              <option value="AZURE">AZURE CLOUD ASSETS</option>
            </select>
          </div>
        }
      />
      <div style={{ height: "100vh" }}>
        <VectorMap
          labels={{
            markers: {
              offsets: function noRefCheck() {},
              render: function noRefCheck() {},
            },
          }}
          backgroundColor="#1e1e1e"
          map={{
            content: {
              height: 440.7063107441331,
              insets: [
                {
                  bbox: [
                    {
                      x: -20004297.151525836,
                      y: -12671671.123330014,
                    },
                    {
                      x: 20026572.394749384,
                      y: 6930392.025135122,
                    },
                  ],
                  height: 440.7063107441331,
                  left: 0,
                  top: 0,
                  width: 900,
                },
              ],
              paths: mapData,
              projection: {
                centralMeridian: 11.5,
                type: "mill",
              },
              width: 900,
            },
            name: "world_mill",
          }}
          series={{
            markers: [
              {
                attribute: "r",
                normalizeFunction: undefined,
                scale: [5, 15],
                values: [
                  887.7, 755.16, 310.69, 405.17, 248.31, 207.35, 217.22, 280.71,
                  210.32, 325.42,
                ],
              },
            ],
          }}
          markerStyle={{
            initial: {
              fill: "#F8E23B",
              stroke: "#383f47",
            },
          }}
          markers={markerData}
          normalizeFunction="polynomial"
          scaleColors={["#C8EEFF", "#0071A4"]}
          onMarkerClick={function (event, code) {
            // doWhatever(event, code, this); 
          }}
        />
      </div>
    </Container>
  );
};

export default Map;
