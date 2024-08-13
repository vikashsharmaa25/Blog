import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/isAuth.js";
import {
  categoryCreate,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router.post("/create", isAuthenticated, isAdmin, categoryCreate);
router.get("/all", getCategories);
router.get("/:id", getCategoryById);
router.put("/update/:id", isAuthenticated, isAdmin, updateCategory);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteCategory);

export default router;
