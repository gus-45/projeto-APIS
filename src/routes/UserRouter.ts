import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

router.get('/', UserController.getAllUsers);

 
router.get("/age-range", UserController.getUsersByAgeRange);


router.get("/:id", UserController.getUserById);


router.put("/:id", UserController.replaceUser);


router.patch("/:id", UserController.updateUser);


router.delete("/cleanup-inactive", UserController.removeInactiveUsers);

export default router;

