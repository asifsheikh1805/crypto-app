import { useState, useEffect, lazy, Suspense } from "react";
import { dataLimitation } from "../constants";
import { formatCurrentData, formatNumber } from "../utils";

const HistoricalChart = lazy(() => import("../components/HistoricalChart"));
const Graph = lazy(() => import("../components/charts/Graph"));

function ChartComponent({ tickerData, pair }) {
  const [toggleChart, setToggle] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [currentGraphData, setCurrentGraphData] = useState([]);

  useEffect(() => {
    setToggle(false);
    setCurrentData([]);
    setCurrentGraphData([]);
  }, [pair]);

  useEffect(() => {
    if (Object.keys(tickerData).length !== 0) {
      if (currentData.length > dataLimitation) {
        setCurrentData([...currentData.slice(1), tickerData]);
      } else {
        setCurrentData([...currentData, tickerData]);
      }
    }
  }, [tickerData]);

  useEffect(() => {
    if (Object.keys(currentData).length !== 0) {
      let formattedData = formatCurrentData(currentData, pair);
      setCurrentGraphData(formattedData);
    }
  }, [currentData]);

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            ${tickerData.price ? formatNumber(tickerData.price) : 0}
          </span>
          <h3 className="text-base font-normal text-gray-500">{pair}</h3>
        </div>
        {tickerData.price && (
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={() => setToggle(!toggleChart)}
              className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
            >
              {toggleChart ? "Current Chart" : "Historical Chart"}
            </a>
          </div>
        )}
      </div>
      {tickerData.price && (
        <>
          {toggleChart ? (
            <Suspense fallback={<div>Loading...</div>}>
              <HistoricalChart pair={pair} />
            </Suspense>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <Graph cryptoData={currentGraphData} />
            </Suspense>
          )}
        </>
      )}
    </div>
  );
}

export default ChartComponent;
