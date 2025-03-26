import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import AdminDashboard from "../components/AdminDashboard";

function Admin() {
  return (
    <section className="h-screen w-screen overflow-hidden">
      <AdminNavbar />
      <div className="flex h-full">
        <AdminSidebar />
        <AdminDashboard />
      </div>
    </section>
  );
}

export default Admin;
