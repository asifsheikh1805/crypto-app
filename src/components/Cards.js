function Cards({ title, price, volume }) {
  return (
    <div className="flex bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex flex-col justify-evenly">
        {title?.cardTitle && (
          <h5
            className={`mb-4 text-xl font-medium ${
              (title?.cardTitle).toString().includes("Bid")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {title.cardTitle}
          </h5>
        )}
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {price}
          </span>
          <h3 className="text-base font-normal text-gray-500">
            {title?.priceTitle}
          </h3>
        </div>
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {volume}
          </span>
          <h3 className="text-base font-normal text-gray-500">
            {title?.volumeTitle}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Cards;
