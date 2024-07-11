import { Router } from "express";
import { createTodo, deleteTaskById, getAllTodo, updateTodo } from "../controllers/todo.controller.js";




const router= Router();

router.route('/createTodo').post(createTodo);
router.route('/getAllTodo').get(getAllTodo);
router.route('/deleteTodo').delete(deleteTaskById);
router.route('/updateTodo').patch(updateTodo);


export default router;