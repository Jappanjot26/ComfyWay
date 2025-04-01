import { useEffect, useState } from "react";

function TableEntry({ data }) {
  return (
    <tr className="transition-all duration-150">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={data.imageUrl}
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
        <p className="text-gray-900 whitespace-no-wrap">{data.availableFrom}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{data.availableTo}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">{data.status}</span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <div className="flex justify-center items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 mr-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7 21H3v-4l12.732-12.732z"
              />
            </svg>
          </button>
          <button className="text-white font-bold py-1 px-3 rounded bg-red-500 hover:bg-red-600">
            <span className="brightness-200">🗑️</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableEntry;
