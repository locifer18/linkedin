import express from 'express';
import { loginController, registerController, userController, userProfileController } from '../controllers/authControllers.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', registerController);

//login
router.post('/login', loginController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//user profile
router.get('/profile/:id', requireSignIn, userProfileController);

export default router;