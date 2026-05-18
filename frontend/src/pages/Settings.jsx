import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user =
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : {
          name: "User",
          email: "user@example.com",
        };

  const [profile, setProfile] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
  });

  const [notifications, setNotifications] = useState(true);

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        name: profile.name,
        email: profile.email,
      })
    );

    alert("Profile updated successfully!");
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
            className="text-left px-5 py-3 rounded-2xl hover:bg-slate-800 transition"
          >
            Teams
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="text-left px-5 py-3 rounded-2xl bg-blue-700 font-semibold"
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
            Settings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your premium account preferences and profile.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Profile Form */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-6">
              Profile Settings
            </h2>

            <form
              onSubmit={handleProfileUpdate}
              className="grid gap-5"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
                className="bg-slate-100 dark:bg-slate-800 px-4 py-4 rounded-2xl outline-none"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
                className="bg-slate-100 dark:bg-slate-800 px-4 py-4 rounded-2xl outline-none"
                required
              />

              <input
                type="password"
                placeholder="New Password"
                value={profile.password}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    password: e.target.value,
                  })
                }
                className="bg-slate-100 dark:bg-slate-800 px-4 py-4 rounded-2xl outline-none"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Preferences */}
          <div className="space-y-8">
            {/* Notifications */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-4">
                Notifications
              </h2>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">
                  Email Alerts
                </span>

                <button
                  onClick={() =>
                    setNotifications(!notifications)
                  }
                  className={`px-4 py-2 rounded-xl font-semibold transition ${
                    notifications
                      ? "bg-green-500 text-white"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  {notifications ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            {/* Account Overview */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-4">
                Account Overview
              </h2>

              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-semibold">
                    Plan:
                  </span>{" "}
                  Premium
                </div>

                <div>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  Active
                </div>

                <div>
                  <span className="font-semibold">
                    Member Since:
                  </span>{" "}
                  2026
                </div>
              </div>
            </div>

            {/* Theme */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-4">
                Appearance
              </h2>

              <p className="text-slate-500 dark:text-slate-400">
                Use the global top-right toggle for light/dark mode.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12">
          TaskSphere © 2026 | Premium Settings Ecosystem
        </div>
      </div>
    </div>
  );
}

export default Settings;