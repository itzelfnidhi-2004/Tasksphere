import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user =
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : { name: "User" };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-blue-700 text-white p-6 hidden md:block">
        <h2 className="text-3xl font-bold mb-10">TaskFlow Manager</h2>

        <nav className="space-y-4">
          <Link to="/dashboard" className="block font-bold">
            Dashboard
          </Link>

          <Link to="/projects" className="block hover:text-gray-200">
            Projects
          </Link>

          <Link to="/tasks" className="block hover:text-gray-200">
            Tasks
          </Link>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h1 className="text-4xl font-bold">
            Welcome, {user?.name || "User"}
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your projects and tasks efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold">Projects</h2>
            <p className="text-4xl mt-3 font-semibold">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold">Tasks</h2>
            <p className="text-4xl mt-3 font-semibold">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold">Completed</h2>
            <p className="text-4xl mt-3 font-semibold">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-bold">Overdue</h2>
            <p className="text-4xl mt-3 font-semibold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;