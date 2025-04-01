import Navbar from "../components/ui/Navbar";
import Body from "../components/utilities/Body";
import HotelCard from "../components/utilities/HotelCard";

const data = [
  {
    id: "hotel-1",
    name: "The Taj Mahal Palace, Mumbai",
    location: "Mumbai, Maharashtra",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGhvdGVsfGVufDB8fHx8MTYzMjYxNjk4Nw&ixlib=rb-1.2.1&q=80&w=400",
    rooms: 150,
    price: 25000,
    rating: 4.8,
  },
  {
    id: "hotel-2",
    name: "The Oberoi, New Delhi",
    location: "New Delhi",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
    rooms: 120,
    price: 22000,
    rating: 4.7,
  },
  {
    id: "hotel-3",
    name: "The Leela Palace, Udaipur",
    location: "Udaipur, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 80,
    price: 30000,
    rating: 4.9,
  },
  {
    id: "hotel-4",
    name: "The Rambagh Palace, Jaipur",
    location: "Jaipur, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 90,
    price: 28000,
    rating: 4.8,
  },
  {
    id: "hotel-5",
    name: "The Park, Chennai",
    location: "Chennai, Tamil Nadu",
    image:
      "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 110,
    price: 18000,
    rating: 4.5,
  },
  {
    id: "hotel-6",
    name: "Wildflower Hall, Shimla",
    location: "Shimla, Himachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 60,
    price: 20000,
    rating: 4.7,
  },
  {
    id: "hotel-7",
    name: "The Tamara Coorg",
    location: "Coorg, Karnataka",
    image:
      "https://plus.unsplash.com/premium_photo-1678297269980-16f4be3a15a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 70,
    price: 19000,
    rating: 4.6,
  },
  {
    id: "hotel-8",
    name: "The Zuri Kumarakom Kerala Resort & Spa",
    location: "Kumarakom, Kerala",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 85,
    price: 17000,
    rating: 4.5,
  },
  {
    id: "hotel-9",
    name: "Taj Lake Palace, Udaipur",
    location: "Udaipur, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 65,
    price: 32000,
    rating: 4.9,
  },
  {
    id: "hotel-10",
    name: "The Oberoi Amarvilas, Agra",
    location: "Agra, Uttar Pradesh",
    image:
      "https://images.unsplash.com/photo-1521783988139-89397d761dce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 100,
    price: 27000,
    rating: 4.8,
  },
  {
    id: "hotel-11",
    name: "ITC Grand Chola, Chennai",
    location: "Chennai, Tamil Nadu",
    image:
      "https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 130,
    price: 21000,
    rating: 4.7,
  },
  {
    id: "hotel-12",
    name: "The Lalit Golf & Spa Resort Goa",
    location: "Canacona, Goa",
    image:
      "https://images.unsplash.com/photo-1592229505726-ca121723b8ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGhvdGVsfGVufDB8fDB8fHww",
    rooms: 95,
    price: 16000,
    rating: 4.4,
  },
];

function Home() {
  return (
    <div className="bg-(--main-bg) h-screen w-screen p-4 pb-0">
      <Navbar />
      <Body>
        <div className="flex flex-col w-1/4 h-full bg-white rounded-lg">
          <div className="h-1/12 text-black font-semibold bg-(--main-bg) rounded-t-lg flex justify-between items-center px-4">
            Filter
            <button className="text-(--text-gray) text-sm">
              Clear all filters
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col p-4 gap-4">
              <p className="text-black font-semibold">Type of place</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="entire-place"
                    name="place-type"
                    value="entire-place"
                  />
                  <label htmlFor="entire-place" className="text-black text-sm">
                    Any Type
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="private-room"
                    name="place-type"
                    value="private-room"
                  />
                  <label htmlFor="private-room" className="text-black text-sm">
                    Room
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="shared-room"
                    name="place-type"
                    value="shared-room"
                  />
                  <label htmlFor="shared-room" className="text-black text-sm">
                    Entire Home
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col p-4 gap-4">
                <p className="text-black font-semibold">Sort By</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="low-to-high"
                      name="sort-by"
                      value="low-to-high"
                    />
                    <label htmlFor="low-to-high" className="text-black text-sm">
                      Low to High
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="high-to-low"
                      name="sort-by"
                      value="high-to-low"
                    />
                    <label htmlFor="high-to-low" className="text-black text-sm">
                      High to Low
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="popular"
                      name="sort-by"
                      value="popular"
                    />
                    <label htmlFor="shared-room" className="text-black text-sm">
                      Popular
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col p-4 gap-4">
                <p className="text-black font-semibold">Room</p>
                <div className="flex gap-4 transition-all duration-150">
                  <button className="border-1 border-black px-2 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    Any
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    1
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    2
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    3
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    4+
                  </button>
                </div>
              </div>
              <div className="flex flex-col p-4 gap-4">
                <p className="text-black font-semibold">Bedroom</p>
                <div className="flex gap-4 transition-all duration-150">
                  <button className="border-1 border-black px-2 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    Any
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    1
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    2
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    3
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    4+
                  </button>
                </div>
              </div>
              <div className="flex flex-col p-4 gap-4">
                <p className="text-black font-semibold">Bathroom</p>
                <div className="flex gap-4 transition-all duration-150">
                  <button className="border-1 border-black px-2 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    Any
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    1
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    2
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    3
                  </button>
                  <button className="border-1 border-black px-3 py-1 text-sm hover:bg-black hover:text-white rounded-sm">
                    4+
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-3/4 h-fullrounded-lg justify-between overflow-y-scroll">
          {data.map((hotel) => (
            <HotelCard data={hotel} key={hotel.id} />
          ))}
        </div>
      </Body>
    </div>
  );
}

export default Home;
