import { memo } from "react";
import { Chart } from "react-google-charts";

const Graph = ({ cryptoData }) => {
  const options = {
    legend: { position: "bottom" },
  };

  return (
    <Chart
      graph_id="graph"
      chartType="LineChart"
      width="100%"
      height="565px"
      data={cryptoData}
      options={options}
    />
  );
};

export default memo(Graph);
