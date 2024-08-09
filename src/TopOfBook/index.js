import Cards from "../components/Cards";
import { formatNumber } from "../utils";

function TopOfBook({ tickerData }) {
  const bestBid = tickerData?.best_bid ? tickerData?.best_bid : 0;
  const bestBidSize = tickerData?.best_bid_size ? tickerData?.best_bid_size : 0;
  const bestAsk = tickerData?.best_ask ? tickerData?.best_ask : 0;
  const bestAskSize = tickerData?.best_ask_size ? tickerData?.best_ask_size : 0;
  const dayVolume = tickerData?.volume_24h
    ? parseFloat(tickerData?.volume_24h).toFixed(2)
    : 0;
  const spread = tickerData?.best_bid
    ? formatNumber(Math.abs(tickerData?.best_bid - tickerData?.best_ask))
    : 0;
  const getSpreadPercentage = tickerData?.best_bid
    ? `(${((spread * 100) / bestBid).toFixed(2)}%)`
    : "(0%)";

  return (
    <div className="mt-8 mb-4 w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Cards
        title={{
          cardTitle: "Best Bid",
          priceTitle: "Bid Price",
          volumeTitle: "Bid Quantity",
        }}
        price={`$${formatNumber(bestBid)}`}
        volume={formatNumber(bestBidSize)}
      />
      <Cards
        title={{
          cardTitle: "Best Ask",
          priceTitle: "Ask Price",
          volumeTitle: "Ask Quantity",
        }}
        price={`$${formatNumber(bestAsk)}`}
        volume={formatNumber(bestAskSize)}
      />
      <Cards
        title={{
          priceTitle: "Spread",
          volumeTitle: "24 Hour Volume",
        }}
        price={`${spread} ${getSpreadPercentage}`}
        volume={formatNumber(dayVolume)}
      />
    </div>
  );
}

export default TopOfBook;
