import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/projects",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      fetchProjects();

      alert("Project created successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Project creation failed");
    }
  };

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
          <Link to="/dashboard" className="block hover:text-gray-200">
            Dashboard
          </Link>

          <Link to="/projects" className="block font-bold">
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
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="text-gray-500 mt-2">
            Welcome, {user?.name || "User"}
          </p>
        </div>

        {/* Create Project Form */}
        <form
          onSubmit={handleCreateProject}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Create New Project</h2>

          <input
            type="text"
            placeholder="Project Title"
            className="w-full mb-4 p-3 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Project Description"
            className="w-full mb-4 p-3 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Create Project
          </button>
        </form>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-bold">{project.title}</h2>

                <p className="text-gray-600 mt-3">
                  {project.description || "No description provided."}
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  Created by: {project.createdBy?.name || "Admin"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;