import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Modal from "../components/Modal";

function Projects() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data || []);
    } catch (error) {
      console.log("Failed to fetch projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", newProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNewProject({
        title: "",
        description: "",
      });

      setShowForm(false);

      fetchProjects();
    } catch (error) {
      console.log("Project creation failed:", error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white p-6 hidden md:flex flex-col shadow-2xl">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold tracking-wide">
            TaskSphere
          </h2>

          <p className="text-blue-200 mt-3 text-sm">
            Premium Productivity Platform
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
            className="text-left px-4 py-3 rounded-xl bg-blue-700 font-semibold"
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

      {/* Main */}
      <div className="flex-1 p-6 md:p-10">
        {/* Navbar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md px-8 py-5 flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 border border-slate-200 dark:border-slate-800">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-xl outline-none w-full lg:max-w-lg text-slate-900 dark:text-white"
          />

          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              + New Project
            </button>

            <div className="hidden md:flex items-center text-slate-700 dark:text-slate-300 font-medium">
              Projects Hub
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              Total Projects
            </h2>

            <p className="text-4xl mt-3 font-extrabold">
              {projects.length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              Active Results
            </h2>

            <p className="text-4xl mt-3 font-extrabold">
              {filteredProjects.length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border-l-4 border-purple-500">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              Productivity
            </h2>

            <p className="text-4xl mt-3 font-extrabold">
              92%
            </p>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Create New Premium Project"
        >
          <form
            onSubmit={handleCreateProject}
            className="grid gap-4"
          >
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  title: e.target.value,
                })
              }
              required
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-900 dark:text-white"
            />

            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  description: e.target.value,
                })
              }
              required
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-900 dark:text-white"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
            >
              Launch Project
            </button>
          </form>
        </Modal>

        {/* Active Projects */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            Active Projects
          </h2>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-md text-center text-slate-500 dark:text-slate-400">
            No projects found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-2xl font-bold mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 mb-5 min-h-[70px]">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-600 font-medium">
                    ID: {project._id?.slice(-6)}
                  </span>

                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          TaskSphere © 2026 | Premium Full-Stack Productivity Platform
        </div>
      </div>
    </div>
  );
}

export default Projects;