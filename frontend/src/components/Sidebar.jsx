import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-blue-800 to-blue-950 text-white p-6 shadow-2xl hidden md:flex flex-col">
      {/* Branding */}
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold tracking-wide">
          TaskSphere
        </h2>

        <p className="text-blue-200 mt-3 text-sm leading-relaxed">
          Organize. Collaborate. Scale.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 flex-grow">
        <Link
          to="/dashboard"
          className="px-4 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="px-4 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="px-4 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
        >
          Tasks
        </Link>

        <Link
          to="/analytics"
          className="px-4 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
        >
          Analytics
        </Link>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold mt-10 transition"
      >
        Logout
      </button>

      {/* Footer */}
      <div className="mt-8 text-xs text-blue-300 text-center">
        TaskSphere © 2026
      </div>
    </div>
  );
}

export default Sidebar;