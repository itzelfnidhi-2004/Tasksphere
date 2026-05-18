function Navbar() {
  return (
    <div className="bg-white rounded-2xl shadow-md px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl w-full md:max-w-xl">
        <input
          type="text"
          placeholder="Search projects, tasks, teams..."
          className="bg-transparent outline-none w-full text-sm text-gray-700"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="text-gray-600 hover:text-blue-600 transition font-medium">
          Notifications
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden md:block">
            <p className="font-semibold text-sm text-gray-800">
              Welcome Back
            </p>

            <p className="text-xs text-gray-500">
              Productivity Hub
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;