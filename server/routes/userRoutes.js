const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware
const coreAuthMiddleware = require('../middlewares/coreAuthMiddleware.js'); // Assuming you have an auth middleware
const { loginUser, signupUser, verifyEmail, updateUserProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword, verifyPasswordResetEmail } = require('../controllers/userController.js')

router.post('/login', (req, res) => {
    loginUser(req, res)
})
router.post('/signup', (req, res) => {
    signupUser(req, res)
})
router.get('/verify/:token', verifyEmail);

// Route to get user profile (protected route)
router.get('/profile', authMiddleware, getUserProfile);

// Route to update user profile (protected route)
router.put('/profile', authMiddleware, updateUserProfile);

router.get('/get/all', coreAuthMiddleware, getAllUsers);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', verifyPasswordResetEmail);

module.exports = router
