import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const storedUser = localStorage.getItem("user");

  const user =
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : { name: "User" };

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const projectRes = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const taskRes = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(projectRes.data || []);
      setTasks(taskRes.data || []);
    } catch (error) {
      console.log("Dashboard fetch failed:", error);
      setProjects([]);
      setTasks([]);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchDashboardData();
  }, []);

  const completedTasks = tasks.filter(
    (task) => task?.status === "Done"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task?.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task?.status !== "Done"
  ).length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 min-h-screen bg-gradient-to-b from-blue-800 to-blue-950 text-white p-6 hidden md:flex flex-col">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold tracking-wide">
            TaskSphere
          </h2>

          <p className="text-blue-200 mt-3 text-sm">
            Organize. Collaborate. Scale.
          </p>
        </div>

        <nav className="flex flex-col gap-4 flex-grow">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-left px-4 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="text-left px-4 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Projects
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className="text-left px-4 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Tasks
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold mt-10 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        {/* Navbar */}
        <div className="bg-white rounded-2xl shadow-md px-8 py-5 flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="bg-gray-100 px-4 py-3 rounded-xl outline-none w-full max-w-xl"
          />

          <div className="hidden md:block text-gray-700 font-medium">
            Productivity Hub
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome, {user?.name || "User"}
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Manage your projects, tasks, and productivity with TaskSphere.
          </p>

          <p className="text-sm text-blue-600 mt-2 font-medium">
            Scalable Full-Stack Productivity Platform
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-700">
              Projects
            </h2>

            <p className="text-4xl mt-3 font-extrabold text-gray-900">
              {projects.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-500">
            <h2 className="text-lg font-semibold text-gray-700">
              Tasks
            </h2>

            <p className="text-4xl mt-3 font-extrabold text-gray-900">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-gray-700">
              Completed
            </h2>

            <p className="text-4xl mt-3 font-extrabold text-gray-900">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-700">
              Overdue
            </h2>

            <p className="text-4xl mt-3 font-extrabold text-gray-900">
              {overdueTasks}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/projects")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Manage Projects
            </button>

            <button
              onClick={() => navigate("/tasks")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Manage Tasks
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          TaskSphere © 2026 | Scalable Full-Stack Productivity Platform
        </div>
      </div>
    </div>
  );
}

export default Dashboard;