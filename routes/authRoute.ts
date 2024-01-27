import express from "express";

// controllers
import { getProfile, login, registerUser } from "../controllers/authController";

//middlewares
import { authenticate } from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidate";

// schemas
import { LoginSchema } from "../schemas/authSchema";

import { UserSchema } from "../schemas/userSchemas";

const router = express.Router();

// routes
router.post("/login", validateSchema(LoginSchema), login);
router.post("/register", validateSchema(UserSchema), registerUser);
router.get("/profile", authenticate, getProfile);

export default router;
