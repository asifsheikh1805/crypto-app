import { useState, useEffect } from "react";
import { baseUrl } from "../endpoints";
import { formatHistoricalData } from "../utils";
import Graph from "./charts/Graph";

function ChartComponent({ pair }) {
  const [pastData, setPastData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (pair) {
      setLoading(true);
      let historicalDataURL = `${baseUrl}/products/${pair}/candles?granularity=86400`;
      const fetchHistoricalData = async () => {
        let dataArr = [];
        await fetch(historicalDataURL)
          .then((res) => res.json())
          .then((data) => (dataArr = data));

        let formattedData = formatHistoricalData(dataArr, pair);
        setPastData(formattedData);
        setLoading(false);
      };
      fetchHistoricalData();
    }
  }, [pair]);

  return <>{!isLoading && <Graph cryptoData={pastData} />}</>;
}

export default ChartComponent;
