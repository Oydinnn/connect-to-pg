import { Router } from "express";
import postController from '../controllers/post.controller.js'
const router = Router()

router.get("/posts", postController.GET)
router.get("/posts/:id", postController.GET_BY_ID)
router.post("/posts", postController.POST)
router.put("/posts/:id", postController.PUT)
router.delete("/posts/:id", postController.DELETE)

export default router;