function TableEntry({ data }) {
  const statusColor =
    data.status === "paid"
      ? "green"
      : data.status === "unpaid"
      ? "red"
      : "orange";

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={data.image}
              alt="user image"
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{data.user}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{data.listingId}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{data.fromDate}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{data.toDate}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`relative inline-block px-3 py-1 font-semibold text-${statusColor}-900 leading-tight`}
        >
          <span
            aria-hidden
            className={`absolute inset-0 bg-${statusColor}-200 opacity-50 rounded-full`}
          ></span>
          <span className="relative">{data.status}</span>
        </span>
      </td>
    </tr>
  );
}

export default TableEntry;
