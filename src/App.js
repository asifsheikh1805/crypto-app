import { useRef, useEffect, useState, useMemo } from "react";
import Header from "./Header";
import ChartComponent from "./Charts";
import OrderBook from "./OrderBook";
import TopOfBook from "./TopOfBook";
import { wsUrl } from "./endpoints";

function App() {
  const [pair, setPair] = useState("");
  const [tickerData, setTickerData] = useState({});
  const [orderBook, setOrderBook] = useState([]);
  const ws = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);
  }, []);

  useEffect(() => {
    if (!headerRef.current?.isComponentLoaded()) {
      //do not proceed if header is not loaded
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker", "level2_batch"],
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    ws.current.addEventListener("message", function (e) {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }
      if (data.product_id === pair) {
        setTickerData(data);
      }
    });

    ws.current.addEventListener("message", function (e) {
      let data = JSON.parse(e.data);
      if (data.type !== "l2update") {
        return;
      }
      if (data.product_id === pair) {
        setOrderBook(data.changes);
      }
    });
  }, [pair]);

  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker", "level2_batch"],
    };
    let unsub = JSON.stringify(unsubMsg);
    ws.current.send(unsub);

    setPair(e.target.value);
  };

  const memoizedComponent = useMemo(
    () => (
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <TopOfBook tickerData={tickerData} />
        <ChartComponent tickerData={tickerData} pair={pair} />
      </div>
    ),
    [tickerData, pair]
  );

  const memoizedOrderBook = useMemo(
    () => <OrderBook orderBook={orderBook} pair={pair} />,
    [orderBook, pair]
  );

  return (
    <div className="h-screen w-screen bg-gray-500 relative overflow-y-auto">
      <Header ref={headerRef} handleSelect={handleSelect} pair={pair} />
      <div className="flex overflow-hidden pt-12 px-16 bg-gray-500">
        <div id="main-content">
          <main>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {memoizedComponent}
              {memoizedOrderBook}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
