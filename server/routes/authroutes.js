import express from "express"
import { login, register } from "../controller/authController.js";
import protect from "../middleware/auth.js";

const router=express.Router();

router.post('/login',login)
router.post('/register',register)


router.get('/me', protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;