const methodStyle =
  "bg-gray-100 rounded-lg h-30 w-full p-4 hover:bg-gray-300 mb-2 font-semibold";

function Task({ description, amount, onClick }) {
  return (
    <div>
      <button className={methodStyle} onClick={onClick}>
        <div className="flex">
          <div>{description}</div>
          <div className="ml-auto">{amount}</div>
        </div>
      </button>
    </div>
  );
}

export default Task;
