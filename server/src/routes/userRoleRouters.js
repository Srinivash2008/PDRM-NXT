import { Router } from "express";
import { addUserRoleController, deleteUserRoleController, getUserPermissionRoleController, updateUserRoleController } from "../controllers/userRoleController.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = Router();

//  user role based controller fetch create update remove start here
router.get("/addUser/userRoleData/fetch", getUserPermissionRoleController);
router.post("/admin/addUserRole/create", authAdmin, addUserRoleController);
router.put("/admin/updateUserRole/update", authAdmin, updateUserRoleController);
router.put("/admin/deleteUserRole/delete", authAdmin, deleteUserRoleController);





export const userRoleRouter = router;