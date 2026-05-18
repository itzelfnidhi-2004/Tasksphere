import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Modal from "../components/Modal";

function Tasks() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    projectId: "",
  });

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
      console.log("Failed to fetch tasks:", error);
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

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNewTask({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        projectId: "",
      });

      setShowForm(false);

      fetchData();
    } catch (error) {
      console.log("Task creation failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
            className="text-left px-5 py-3 rounded-2xl bg-blue-700 font-semibold"
          >
            Tasks
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
        {/* Top Navbar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm px-8 py-5 flex flex-col xl:flex-row justify-between items-center gap-4 mb-8 border border-slate-200 dark:border-slate-800">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 px-5 py-3 rounded-2xl outline-none w-full xl:max-w-xl text-slate-900 dark:text-white"
          />

          <div className="flex gap-4 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-900 dark:text-white"
            >
              <option>All</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
            >
              + New Task
            </button>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
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
              label: "Pending",
              value: pendingTasks,
              color: "text-yellow-500",
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

        {/* Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Create New Premium Task"
        >
          <form
            onSubmit={handleCreateTask}
            className="grid gap-4"
          >
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  title: e.target.value,
                })
              }
              required
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-900 dark:text-white"
            />

            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  description: e.target.value,
                })
              }
              required
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-900 dark:text-white"
            />

            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  priority: e.target.value,
                })
              }
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-900 dark:text-white"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  dueDate: e.target.value,
                })
              }
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-900 dark:text-white"
            />

            <select
              value={newTask.projectId}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  projectId: e.target.value,
                })
              }
              required
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-900 dark:text-white"
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
            >
              Launch Task
            </button>
          </form>
        </Modal>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTasks.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm text-center text-slate-500 dark:text-slate-400 col-span-full">
              No tasks found.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-bold mb-3">
                  {task.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 mb-5 min-h-[70px]">
                  {task.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm">
                    {task.status || "To Do"}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm">
                    {task.priority}
                  </span>
                </div>

                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No deadline"}
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 mt-4">
                  <div className="bg-blue-600 h-2 rounded-full w-2/3"></div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12">
          TaskSphere © 2026 | Premium Full-Stack Productivity Ecosystem
        </div>
      </div>
    </div>
  );
}

export default Tasks;