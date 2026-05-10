const Task = require("../models/Task");
const Project = require("../models/Project");

// Admin creates task
const createTask = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can create tasks",
      });
    }

    const {
      title,
      description,
      status,
      dueDate,
      assignedTo,
      project,
    } = req.body;

    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      assignedTo,
      project,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "Admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedTo: req.user.id });
    }

    tasks = await Task.populate(tasks, [
      { path: "assignedTo", select: "name email" },
      { path: "project", select: "title" },
      { path: "createdBy", select: "name" },
    ]);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Member can update only own task
    if (
      req.user.role !== "Admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    task.status = req.body.status || task.status;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can delete tasks",
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};