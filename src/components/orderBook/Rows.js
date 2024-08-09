function Rows({ type, tableData }) {
  return (
    <>
      {tableData.map((data, index) => (
        <tr
          key={index}
          className={`text-white text-xs font-normal ${
            type === "buy" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <td className="p-2 whitespace-nowrap">
            <span className="font-semibold">{data[1]}</span>
          </td>
          <td className="p-2 whitespace-nowrap">{data[0]}</td>
          <td className="p-2 whitespace-nowrap">-</td>
        </tr>
      ))}
    </>
  );
}
export default Rows;
