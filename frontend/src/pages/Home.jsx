import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 lg:px-16 py-6 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700">
            TaskSphere
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Premium Productivity Platform
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Organize Work. <br />
            Scale Teams. <br />
            Achieve More.
          </h2>

          <p className="mt-8 text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            TaskSphere empowers professionals, startups, and enterprises
            to manage projects, tasks, deadlines, and collaboration
            through a premium full-stack productivity ecosystem.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition"
            >
              Start Free
            </Link>

            <Link
              to="/login"
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-4 rounded-2xl font-bold transition"
            >
              Live Demo
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-10 shadow-2xl text-white">
          <h3 className="text-3xl font-bold mb-8">
            Productivity Snapshot
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-2xl">
              <p className="text-sm text-blue-100">Projects Managed</p>
              <h4 className="text-4xl font-extrabold mt-2">500+</h4>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl">
              <p className="text-sm text-blue-100">Tasks Completed</p>
              <h4 className="text-4xl font-extrabold mt-2">12K+</h4>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl">
              <p className="text-sm text-blue-100">Team Efficiency</p>
              <h4 className="text-4xl font-extrabold mt-2">94%</h4>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl">
              <p className="text-sm text-blue-100">User Satisfaction</p>
              <h4 className="text-4xl font-extrabold mt-2">98%</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 lg:px-16 py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold">
            Powerful Features
          </h2>

          <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">
            Everything needed to manage work at startup and enterprise
            scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {[
            {
              title: "Project Management",
              desc: "Premium project workflows with scalable management tools.",
            },
            {
              title: "Task Optimization",
              desc: "Advanced task tracking, deadlines, and productivity systems.",
            },
            {
              title: "Team Collaboration",
              desc: "Shared ecosystems built for future enterprise teamwork.",
            },
            {
              title: "Analytics Dashboard",
              desc: "Real-time insights for smarter business execution.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 lg:px-16 py-24">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl text-white p-14 text-center shadow-2xl">
          <h2 className="text-5xl font-extrabold">
            Ready to transform productivity?
          </h2>

          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Join TaskSphere and experience premium productivity,
            collaboration, and scalable project execution.
          </p>

          <div className="mt-10">
            <Link
              to="/signup"
              className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 px-8 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-3xl font-extrabold text-white">
              TaskSphere
            </h3>

            <p className="text-sm mt-2">
              Premium Full-Stack Productivity Ecosystem
            </p>
          </div>

          <div className="flex gap-8 text-sm">
            <Link to="/login" className="hover:text-white">
              Login
            </Link>

            <Link to="/signup" className="hover:text-white">
              Signup
            </Link>

            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          TaskSphere © 2026 | Premium SaaS Productivity Platform
        </div>
      </footer>
    </div>
  );
}

export default Home;