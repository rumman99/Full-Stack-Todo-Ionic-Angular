import { Todo } from "../models/Todo.model.js";
import { ApiResponse } from "../utils/Response.js";

const createTodo = async (req, res) => {
  const { task, status, assignTo } = req.body;

  try {
    const newTodo = await Todo.create({ task, status, assignTo });

    return res
      .status(201)
      .json(new ApiResponse(200, newTodo, "New Task Created Successfully"));
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Something Went Wrong When Creating Task");
  }
};

const getAllTodo = async (req, res) => {
  try {
    const getTodo = await Todo.find({});

    return res
      .status(201)
      .json(new ApiResponse(200, getTodo, "Task Find Successfully"));
  } catch (error) {
    console.error("Error Finding task:", error);
    throw new Error("Something Went Wrong When Finding Task");
  }
};

const deleteTaskById = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json(new ApiResponse(404, null, "Todo not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deletedTodo, "Todo deleted successfully"));
  } catch (error) {
    // console.error("Error deleting todo:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error deleting todo"));
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.query;
  const { task, status, assignTo } = req.body;
  
  if(!id){
    throw new Error("Invalid Id");
  }
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { task, status, assignTo }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json(new ApiResponse(404, null, "Todo not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedTodo, "Todo Update successfully"));
  } catch (error) {
    console.error("Error updating todo:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error updating todo"));
  }
};
export { createTodo, getAllTodo, deleteTaskById, updateTodo };
