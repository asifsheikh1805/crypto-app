import Dropdown from "../Dropdown";
import { defaultGroupingOpts } from "../../constants";

function OrderBookHeader({ pair, handleSelect, groupingNo }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Order Book</h3>
      </div>
      <div className="flex-shrink-0">
        {pair && (
          <Dropdown
            options={defaultGroupingOpts[pair]}
            selectedValue={groupingNo}
            handleSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
}
export default OrderBookHeader;
