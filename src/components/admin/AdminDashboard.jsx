import Table from "../utilities/Table";
import TableListing from "../utilities/TableListing";

function AdminDashboard() {
  return (
    <div className="h-11/12 w-3/4 bg-gray-100 overflow-y-scroll flex flex-col p-4">
      <div className="flex py-4 px-8 gap-4">
        <div className="h-32 w-64 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg flex justify-between p-4 fill-white text-white text-xl items-center font-semibold">
          <div className="flex flex-col gap-1">
            <p className="text-4xl font-bold">125</p>
            <p>Bookings</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16"
            viewBox="0 0 256 256"
          >
            <path d="M160,56H64A16,16,0,0,0,48,72V224a8,8,0,0,0,12.65,6.51L112,193.83l51.36,36.68A8,8,0,0,0,176,224V72A16,16,0,0,0,160,56Zm0,152.46-43.36-31a8,8,0,0,0-9.3,0L64,208.45V72h96ZM208,40V192a8,8,0,0,1-16,0V40H88a8,8,0,0,1,0-16H192A16,16,0,0,1,208,40Z"></path>
          </svg>
        </div>
        <div className="h-32 w-64 bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex justify-between p-4 fill-white text-white text-xl items-center font-semibold">
          <div className="flex flex-col gap-1">
            <p className="text-4xl font-bold">82</p>
            <p>Unique Users</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16"
            viewBox="0 0 256 256"
          >
            <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
          </svg>
        </div>
        <div className="h-32 w-64 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg flex justify-between p-4 fill-white text-white text-xl items-center font-semibold">
          <div className="flex flex-col gap-1">
            <p className="text-4xl font-bold">8</p>
            <p>Listings</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16"
            viewBox="0 0 256 256"
          >
            <path d="M216,72H32V48a8,8,0,0,0-16,0V208a8,8,0,0,0,16,0V176H240v32a8,8,0,0,0,16,0V112A40,40,0,0,0,216,72ZM32,88h72v72H32Z"></path>
          </svg>
        </div>
        <div className="h-32 w-64 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg flex justify-between p-4 fill-white text-white text-xl items-center font-semibold">
          <div className="flex flex-col gap-1">
            <p className="text-4xl font-bold">2.4 L</p>
            <p>Revenue</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16"
            viewBox="0 0 256 256"
          >
            <path d="M244.24,60a8,8,0,0,0-7.75-.4c-42.93,21-73.59,11.16-106,.78C96.4,49.53,61.2,38.28,12.49,62.06A8,8,0,0,0,8,69.24V189.17a8,8,0,0,0,11.51,7.19c42.93-21,73.59-11.16,106.05-.78,19.24,6.15,38.84,12.42,61,12.42,17.09,0,35.73-3.72,56.91-14.06a8,8,0,0,0,4.49-7.18V66.83A8,8,0,0,0,244.24,60ZM48,152a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Zm80,8a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm96,8a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
        </div>
      </div>
      <div className="text-gray-500 text-2xl font-semibold px-8 pt-8 pb-2">
        Bookings
      </div>
      <Table hideSearch={true} />
      <div className="text-gray-500 text-2xl font-semibold px-8 pt-8 pb-2">
        Listings
      </div>
      <TableListing hideSearch={true} />
    </div>
  );
}

export default AdminDashboard;
