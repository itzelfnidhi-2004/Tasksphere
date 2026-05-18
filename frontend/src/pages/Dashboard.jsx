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
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, []);

  const completedTasks = tasks.filter(
    (task) => task?.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task?.status !== "Done"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task?.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task?.status !== "Done"
  ).length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white p-6 hidden lg:flex flex-col shadow-2xl">
        <div className="mb-14">
          <h2 className="text-4xl font-extrabold tracking-tight">
            TaskSphere
          </h2>

          <p className="text-blue-300 mt-2 text-sm">
            Premium Productivity Platform
          </p>
        </div>

        <nav className="flex flex-col gap-3 flex-grow">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-left px-5 py-3 rounded-2xl bg-blue-700 font-semibold"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="text-left px-5 py-3 rounded-2xl hover:bg-slate-800 transition"
          >
            Projects
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className="text-left px-5 py-3 rounded-2xl hover:bg-slate-800 transition"
          >
            Tasks
          </button>

          <button className="text-left px-5 py-3 rounded-2xl hover:bg-slate-800 transition">
            Teams
          </button>

          <button className="text-left px-5 py-3 rounded-2xl hover:bg-slate-800 transition">
            Settings
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold mt-8 transition"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 lg:p-10">
        {/* Navbar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm px-8 py-5 flex flex-col xl:flex-row justify-between items-center gap-4 mb-8 border border-slate-200 dark:border-slate-800">
          <input
            type="text"
            placeholder="Search tasks, projects, analytics..."
            className="bg-slate-100 dark:bg-slate-800 px-5 py-3 rounded-2xl outline-none w-full xl:max-w-xl text-slate-900 dark:text-white"
          />

          <div className="flex items-center gap-6">
            <button className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              Notifications
            </button>

            <div className="bg-blue-600 text-white px-5 py-2 rounded-2xl font-semibold">
              {user?.name || "User"}
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          <div className="xl:col-span-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-10 shadow-xl">
            <h1 className="text-4xl font-extrabold leading-tight">
              Welcome back, {user?.name || "User"}
            </h1>

            <p className="mt-4 text-blue-100 text-lg">
              Here’s your productivity ecosystem overview for today.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/projects")}
                className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-100 transition"
              >
                Manage Projects
              </button>

              <button
                onClick={() => navigate("/tasks")}
                className="bg-blue-900 px-6 py-3 rounded-2xl font-bold hover:bg-blue-950 transition"
              >
                View Tasks
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-4">
              Productivity Score
            </h2>

            <div className="text-6xl font-extrabold text-blue-600">
              94%
            </div>

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Excellent performance this week.
            </p>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Total Projects",
              value: projects.length,
            },
            {
              label: "Total Tasks",
              value: tasks.length,
            },
            {
              label: "Completed",
              value: completedTasks,
              color: "text-green-500",
            },
            {
              label: "Overdue",
              value: overdueTasks,
              color: "text-red-500",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {card.label}
              </p>

              <h2
                className={`text-4xl font-extrabold mt-3 ${
                  card.color || ""
                }`}
              >
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Progress + Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-6">
              Task Completion Overview
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Completed Tasks</span>
                  <span>{completedTasks}</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${
                        tasks.length
                          ? (completedTasks / tasks.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Pending Tasks</span>
                  <span>{pendingTasks}</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded-full"
                    style={{
                      width: `${
                        tasks.length
                          ? (pendingTasks / tasks.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-6">
              Insights
            </h2>

            <div className="space-y-5 text-slate-600 dark:text-slate-300">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                {projects.length} active projects running.
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                {pendingTasks} tasks need attention.
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                {overdueTasks} deadlines overdue.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12">
          TaskSphere © 2026 | Premium Full-Stack Productivity Ecosystem
        </div>
      </div>
    </div>
  );
}

export default Dashboard;