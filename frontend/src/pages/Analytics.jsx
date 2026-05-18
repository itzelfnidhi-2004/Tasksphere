import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

function Analytics() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const taskRes = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const projectRes = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(taskRes.data || []);
      setProjects(projectRes.data || []);
    } catch (error) {
      console.log("Analytics fetch failed:", error);
      setTasks([]);
      setProjects([]);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Done"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task?.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "Done"
  ).length;

  const statusData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
    { name: "Overdue", value: overdueTasks },
  ];

  const priorityData = [
    {
      name: "High",
      value: tasks.filter(
        (task) => task.priority === "High"
      ).length,
    },
    {
      name: "Medium",
      value: tasks.filter(
        (task) => task.priority === "Medium"
      ).length,
    },
    {
      name: "Low",
      value: tasks.filter(
        (task) => task.priority === "Low"
      ).length,
    },
  ];

  const productivityTrend = [
    { week: "Week 1", score: 72 },
    { week: "Week 2", score: 80 },
    { week: "Week 3", score: 88 },
    { week: "Week 4", score: 94 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white p-6 hidden lg:flex flex-col shadow-2xl">
        <div className="mb-14">
          <h2 className="text-4xl font-extrabold">
            TaskSphere
          </h2>

          <p className="text-blue-300 mt-2 text-sm">
            Premium Productivity Platform
          </p>
        </div>

        <nav className="flex flex-col gap-3 flex-grow">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-left px-5 py-3 rounded-2xl hover:bg-slate-800 transition"
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

          <button
            onClick={() => navigate("/teams")}
            className="text-left px-5 py-3 rounded-2xl hover:bg-slate-800 transition"
          >
            Teams
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="text-left px-5 py-3 rounded-2xl bg-blue-700 font-semibold"
          >
            Analytics
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="text-left px-5 py-3 rounded-2xl hover:bg-slate-800 transition"
          >
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
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm px-8 py-6 mb-10 border border-slate-200 dark:border-slate-800">
          <h1 className="text-4xl font-extrabold">
            Analytics Dashboard
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Deep insights into productivity, tasks, projects, and
            team performance.
          </p>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Projects",
              value: projects.length,
            },
            {
              label: "Tasks",
              value: tasks.length,
            },
            {
              label: "Completed",
              value: completedTasks,
            },
            {
              label: "Productivity",
              value: "94%",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <p className="text-slate-500 dark:text-slate-400">
                {card.label}
              </p>

              <h2 className="text-4xl font-extrabold mt-3">
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
          {/* Task Status */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-6">
              Task Status Overview
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-6">
              Task Priority Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {priorityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Trend */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Monthly Productivity Growth
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={productivityTrend}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12">
          TaskSphere © 2026 | Premium Analytics Ecosystem
        </div>
      </div>
    </div>
  );
}

export default Analytics;