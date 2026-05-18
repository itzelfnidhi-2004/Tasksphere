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
} from "recharts";

function Charts({ tasks = [] }) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const statusData = [
    {
      name: "Completed",
      value: safeTasks.filter(
        (task) => task?.status === "Done"
      ).length,
    },
    {
      name: "Pending",
      value: safeTasks.filter(
        (task) => task?.status !== "Done"
      ).length,
    },
  ];

  const priorityData = [
    {
      name: "High",
      value: safeTasks.filter(
        (task) => task?.priority === "High"
      ).length,
    },
    {
      name: "Medium",
      value: safeTasks.filter(
        (task) => task?.priority === "Medium"
      ).length,
    },
    {
      name: "Low",
      value: safeTasks.filter(
        (task) => task?.priority === "Low"
      ).length,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#facc15"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
      {/* Task Status Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
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

      {/* Task Priority Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
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
  );
}

export default Charts;