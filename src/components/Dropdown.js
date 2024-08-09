function Dropdown({ options, selectedValue, handleSelect }) {
  const items = [{ id: "0", display_name: "Select an option" }, ...options];
  return (
    <select
      name="dropdown"
      value={selectedValue}
      onChange={handleSelect}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {items.map((item, idx) => {
        return (
          <option key={idx} value={item.id}>
            {item.display_name}
          </option>
        );
      })}
    </select>
  );
}

export default Dropdown;
