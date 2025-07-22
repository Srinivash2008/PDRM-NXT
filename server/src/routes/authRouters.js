import {Router} from "express";
import { loginController} from "../controllers/authentication/authController.js";

import { authAdmin } from "../middleware/authAdmin.js";
import { authClient } from "../middleware/authUser.js";
import { authProduction } from "../middleware/authProduction.js";

// authendication controller here

const router = Router();

router.post("/loginUser",loginController); 



// export named router 
export const authUserRouter = router;
