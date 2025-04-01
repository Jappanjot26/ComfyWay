import logo from "../../assets/logo.png";

function AdminNavbar() {
  return (
    <nav className="bg-white h-1/12 flex items-center p-2 justify-between">
      <div className="h-28 w-30">
        <img src={logo} alt="" />
      </div>
      <div className="text-2xl">Ⓜ️</div>
    </nav>
  );
}

export default AdminNavbar;
