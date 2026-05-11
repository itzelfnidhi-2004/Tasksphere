import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/tasks",
        {
          title,
          description,
          project,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setProject("");
      setPriority("Medium");

      fetchTasks();

      alert("Task created successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Task creation failed");
    }
  };

  const handleStatusUpdate = async (taskId, status) => {
    try {
      await API.put(
        `/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isOverdue = (task) => {
    return (
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "Done"
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6 hidden md:block">
        <h2 className="text-3xl font-bold mb-10">TaskFlow Manager</h2>

        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:text-gray-200">
            Dashboard
          </Link>

          <Link to="/projects" className="block hover:text-gray-200">
            Projects
          </Link>

          <Link to="/tasks" className="block font-bold">
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
          <h1 className="text-4xl font-bold">Tasks</h1>
          <p className="text-gray-500 mt-2">
            Welcome, {user?.name || "User"}
          </p>
        </div>

         <input
          type="text"
          placeholder="Search tasks..."
          className="w-full mb-6 p-3 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Task Form */}
        <form
          onSubmit={handleCreateTask}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Create New Task</h2>

          <input
            type="text"
            placeholder="Task Title"
            className="w-full mb-4 p-3 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Task Description"
            className="w-full mb-4 p-3 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full mb-4 p-3 border rounded"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
          >
            <option value="">Select Project</option>

            {projects.map((proj) => (
              <option key={proj._id} value={proj._id}>
                {proj.title}
              </option>
            ))}
          </select>

          <select
            className="w-full mb-4 p-3 border rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>


          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Create Task
          </button>
        </form>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.length > 0 ? (
            tasks
            .filter((task) =>
              task.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((task) => (
              <div
                key={task._id}
                className={`bg-white p-6 rounded-lg shadow ${
                  isOverdue(task) ? "border-l-4 border-red-500" : ""
                }`}
              >
                <h2 className="text-2xl font-bold">{task.title}</h2>

                <p className="text-gray-600 mt-2">
                  {task.description || "No description"}
                </p>

                <p className="mt-3">
                  <span className="font-semibold">Project:</span>{" "}
                  {task.project?.title}
                </p>

                 <p className="mt-2">
                  <span className="font-semibold">Priority:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {task.priority}
                  </span>
                </p>

                <p className="mt-2">
                  <span className="font-semibold">Status:</span>{" "}
                  {task.status}
                </p>

                {isOverdue(task) && (
                  <p className="text-red-500 font-bold mt-2">
                    Overdue
                  </p>
                )}

                <select
                  className="mt-4 p-2 border rounded"
                  value={task.status}
                  onChange={(e) =>
                    handleStatusUpdate(task._id, e.target.value)
                  }
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;