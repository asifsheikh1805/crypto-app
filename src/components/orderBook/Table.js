import { useMemo } from "react";
import Rows from "./Rows";

function OrderTable({ type, tableData }) {
  const memoizedRows = useMemo(
    () => <Rows type={type} tableData={tableData} />,
    [type, tableData]
  );

  return (
    <div className="h-2/4 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-500">
          <tr>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Market Size
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Price(USD)
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              My Size
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">{memoizedRows}</tbody>
      </table>
    </div>
  );
}

export default OrderTable;
