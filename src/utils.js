import { orderBookDataLimitation } from "./constants";

/**
 * Formats HistoricalData according to react-google-charts requirements
 */
export const formatHistoricalData = (data, pair) => {
  let finalData = data.map((val) => {
    const ts = val[0];
    let date = new Date(ts * 1000);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let final = `${month}-${day}-${year}`;

    return [final, val[4]];
  });
  finalData.reverse();
  finalData = [["Date", pair], ...finalData];

  return finalData;
};

/**
 * Formats currentData according to react-google-charts requirements
 */
export const formatCurrentData = (data) => {
  let finalData = data.map((val) => {
    let date = new Date(val.time);
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    let final = `${hour}:${minutes}:${seconds}`;

    return [
      final,
      parseFloat(val.best_bid_size),
      parseFloat(val.best_ask_size),
    ];
  });
  finalData = [["Time", "Bids", "Asks"], ...finalData];

  return finalData;
};

/**
 * Formats the l2update data to collborative collection of buy and sell
 * Example:
 *
 *   formatOrderBookData(["buy","100.1", "1"]["sell","100", "2"], {}); // {buy:[["100.1","1"]], sell:[["100","2"]]}
 */
export const formatOrderBookData = (items, currentData) => {
  let groups = Object.keys(currentData).length > 0 ? { ...currentData } : {};
  for (const item of items) {
    if (Object.hasOwn(groups, item[0])) {
      groups[item[0]] = [item.slice(1), ...groups[item[0]]];

      if (groups[item[0]].length > orderBookDataLimitation) {
        groups[item[0]] = groups[item[0]].slice(0, orderBookDataLimitation);
      }
    } else {
      groups[item[0]] = [item.slice(1)];
    }
  }
  return groups;
};

export const formatNumber = (arg) => {
  return new Intl.NumberFormat("en-US").format(arg);
};

/**
 * Returns the number rounded to the nearest interval.
 * Example:
 *
 *   roundToNearest(1000.5, 1); // 1000
 *   roundToNearest(1000.5, 0.5);  // 1000.5
 */
export const roundToNearest = (value, interval) => {
  return (Math.floor(value / interval) * interval).toFixed(2);
};

/**
 * Groups price levels by their price
 * Example:
 *
 *  groupByPrice([ [1000, 100], [1000, 200], [993, 20] ]) // [ [ 1000, 300 ], [ 993, 20 ] ]
 */
export const groupByPrice = (levels) => {
  return levels
    .map((level, idx) => {
      const nextLevel = levels[idx + 1];
      const prevLevel = levels[idx - 1];

      if (nextLevel && level[0] === nextLevel[0]) {
        return [
          level[0],
          formatNumber(parseFloat(level[1]) + parseFloat(nextLevel[1])),
        ];
      } else if (prevLevel && level[0] === prevLevel[0]) {
        return [];
      } else {
        return level;
      }
    })
    .filter((level) => level.length > 0);
};

/**
 * Group price levels by given ticket size. Uses groupByPrice() and roundToNearest()
 * Example:
 *
 * groupByTicketSize([ [1000.5, 100], [1000, 200], [993, 20] ], 1) // [[1000, 300], [993, 20]]
 */
export const groupByTicketSize = (levels, ticketSize) => {
  return groupByPrice(
    levels.map((level) => [roundToNearest(level[0], ticketSize), level[1]])
  );
};
