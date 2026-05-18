import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

function Teams() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Neha Gupta",
      role: "Project Manager",
      email: "neha@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      role: "Frontend Developer",
      email: "rahul@example.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya Singh",
      role: "Backend Developer",
      email: "priya@example.com",
      status: "Pending",
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
  });

  const handleAddMember = (e) => {
    e.preventDefault();

    const member = {
      id: Date.now(),
      ...newMember,
      status: "Active",
    };

    setMembers([...members, member]);

    setNewMember({
      name: "",
      role: "",
      email: "",
    });

    setShowForm(false);
  };

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
            className="text-left px-5 py-3 rounded-2xl bg-blue-700 font-semibold"
          >
            Teams
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
            placeholder="Search team members..."
            className="bg-slate-100 dark:bg-slate-800 px-5 py-3 rounded-2xl outline-none w-full xl:max-w-xl"
          />

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
          >
            + Add Team Member
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Total Members
            </p>

            <h2 className="text-4xl font-extrabold mt-3">
              {members.length}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Active Members
            </p>

            <h2 className="text-4xl font-extrabold mt-3 text-green-500">
              {
                members.filter(
                  (member) => member.status === "Active"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Pending Invites
            </p>

            <h2 className="text-4xl font-extrabold mt-3 text-yellow-500">
              {
                members.filter(
                  (member) => member.status === "Pending"
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Add Premium Team Member"
        >
          <form
            onSubmit={handleAddMember}
            className="grid gap-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  name: e.target.value,
                })
              }
              required
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none"
            />

            <input
              type="text"
              placeholder="Role"
              value={newMember.role}
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  role: e.target.value,
                })
              }
              required
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  email: e.target.value,
                })
              }
              required
              className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl outline-none"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
            >
              Add Member
            </button>
          </form>
        </Modal>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">
                  {member.name}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    member.status === "Active"
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                  }`}
                >
                  {member.status}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 mb-2">
                {member.role}
              </p>

              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {member.email}
              </p>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition">
                  View
                </button>

                <button className="flex-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 py-2 rounded-xl font-medium transition">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12">
          TaskSphere © 2026 | Premium Team Collaboration Ecosystem
        </div>
      </div>
    </div>
  );
}

export default Teams;