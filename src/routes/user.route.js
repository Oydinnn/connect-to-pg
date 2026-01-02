import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router()

router.get('/users',userController.GET )
router.get('/users/:id',userController.GET_BY_ID )
router.post('/users', userController.POST)
router.put('/users/:id', userController.PUT)
router.delete('/users/:id', userController.DELETE)

export default router;