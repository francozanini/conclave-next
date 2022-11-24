const Incrementable = ({label, currentAmount, increase, decrease}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="text-md">
        {currentAmount} {label}
      </div>

      <div>
        {" "}
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={increase}>
          +
        </button>
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={decrease}>
          -
        </button>
      </div>
    </div>
  );
};

export default Incrementable;
