import { Router } from "express";

import { authAdmin } from "../middleware/authAdmin.js";

import {
  getOnlineUsersController,
} from "../controllers/user/userController.js";

// User router
const router = Router();

//userList
router.get("/userList/userListTableData/fetch", getOnlineUsersController);


export const userRouter = router;
