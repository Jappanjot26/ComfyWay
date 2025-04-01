import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../components/admin/AdminDashboard";

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
