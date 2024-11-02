const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const controller = require("../controllers/auth_controller");
const isAuth = require('../middlewares/isAuth')

// Validation rules for registration
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Please provide a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        body("phone").notEmpty().withMessage("Phone number is required"),

    ],
    controller.register
);
router.post(
    '/setup_profile',
    [
        body("age").isInt({ min: 1 }).withMessage("Please provide a valid age"),
        body("role").isIn(["consumer", "admin", "kitchen_staff"]).withMessage("Invalid role"),
        body("gender").notEmpty().withMessage("Gender is required"),
        body("height").optional().isFloat().withMessage("Height must be a number"),
        body("weight").optional().isFloat().withMessage("Weight must be a number"),
        body("activity_level").optional().isString().withMessage("Activity level must be a string"),
        body("health_goal").optional().isString().withMessage("Health goal must be a string"),
        body("dietary_preferences").optional().isString().withMessage("Dietary preferences must be a string"),
        body("fitness_level").optional().isString().withMessage("Fitness level must be a string"),
    ],
    isAuth,
    controller.setUpProfile
)

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Please provide a valid email"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    controller.login
);

router.post(
    "/verify",
    [
        body("email").isEmail().withMessage("Please provide a valid email"),
        body("otp").isInt().withMessage("OTP must be a valid number"),
    ],
    controller.verifyOtp
);

router.post(
    "/otp",
    [
        body("email").isEmail().withMessage("Please provide a valid email"),
    ],
    controller.sendOtp
);

module.exports = router;
