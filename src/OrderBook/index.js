import { useState, useEffect } from "react";
import OrderTable from "../components/orderBook/Table";
import { formatOrderBookData, groupByTicketSize } from "../utils";
import OrderBookHeader from "../components/orderBook/Header";
import { defaultGroupingOpts } from "../constants";

function OrderBook({ orderBook, pair }) {
  const [currentData, setCurrentData] = useState({});
  const [groupingNo, setGroupingNo] = useState(
    pair ? defaultGroupingOpts[pair][0].id : 1
  );

  useEffect(() => {
    setCurrentData({});
    setGroupingNo(pair ? defaultGroupingOpts[pair][0].id : 1);
  }, [pair]);

  useEffect(() => {
    if (orderBook && orderBook.length !== 0) {
      let tempArr = formatOrderBookData(orderBook, currentData, groupingNo);

      setCurrentData({
        buy: groupByTicketSize(tempArr.buy, groupingNo),
        sell: groupByTicketSize(tempArr.buy, groupingNo),
      });
    }
  }, [orderBook, groupingNo]);

  const handleSelect = (e) => {
    setGroupingNo(e.target.value);
  };

  return (
    <div className="col-span-1 bg-white shadow rounded-lg p-4 my-8">
      <OrderBookHeader
        pair={pair}
        handleSelect={handleSelect}
        groupingNo={groupingNo}
      />
      <div className="flex flex-col mt-8">
        <div className="overflow-hidden max-h-dvh rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="h-screen shadow overflow-hidden sm:rounded-lg">
              {currentData?.sell && (
                <OrderTable
                  type={"sell"}
                  tableData={currentData?.sell.reverse()}
                />
              )}
              {currentData?.buy && (
                <OrderTable type={"buy"} tableData={currentData?.buy} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
