import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
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

      setProjects(projectRes.data);
      setTasks(taskRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "Done"
  ).length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
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

      {/* Main */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h1 className="text-4xl font-bold">
            Welcome, {user?.name || "User"}
          </h1>

          <p className="text-gray-500 mt-2">
            Track your projects and team productivity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center border-l-4 border-blue-500">
            <h2 className="text-xl font-bold">Projects</h2>
            <p className="text-4xl mt-3 font-semibold text-blue-600">
              {projects.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center border-l-4 border-yellow-500">
            <h2 className="text-xl font-bold">Tasks</h2>
            <p className="text-4xl mt-3 font-semibold text-yellow-600">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center border-l-4 border-green-500">
            <h2 className="text-xl font-bold">Completed</h2>
            <p className="text-4xl mt-3 font-semibold text-green-600">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center border-l-4 border-red-500">
            <h2 className="text-xl font-bold">Overdue</h2>
            <p className="text-4xl mt-3 font-semibold text-red-600">
              {overdueTasks}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Manage Projects
            </Link>

            <Link
              to="/tasks"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Manage Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;