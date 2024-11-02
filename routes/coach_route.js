const express = require("express");
const router = express.Router();
const controller = require("../controllers/coach/coach_fitness_controller");
const exerciseController = require("../controllers/coach/coach_exercises_controller");
const imageMiddleWare = require('../middlewares/multer');
const { body, param, validationResult } = require("express-validator");

router.post("/workout", [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),
    body("type")
        .notEmpty()
        .withMessage("Type is required"),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("duration")
        .isInt({ min: 1 })
        .withMessage("Duration must be a positive integer"),
    body("difficulty_level")
        .notEmpty()
        .withMessage("Difficulty level is required"),
    body("calories_burned")
        .isInt({ min: 0 })
        .withMessage("Calories burned must be a non-negative integer"),
    body("exercises")
        .isArray({ min: 1 })
        .withMessage("Exercises must be an array with at least one exercise"),
    // body("exercises.*.name")
    //     .notEmpty()
    //     .withMessage("Exercise name is required"),
    // body("exercises.*.duration")
    //     .isInt({ min: 1 })
    //     .withMessage("Exercise duration must be a positive integer")
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg)
        error.statusCode = 422;
        next(error)
    }
    controller.createWorkout(req, res, next);
});

router.get("/workout/:id", [
    param("id").isInt().withMessage("Workout ID must be a valid integer")
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        next(error);
    }
    controller.getWorkout(req, res, next);
});

router.put("/workout/:id", imageMiddleWare.uploadAnyImages(), [
    param("id").isInt().withMessage("Workout ID must be a valid integer"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("type").optional().notEmpty().withMessage("Type cannot be empty"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("duration").optional().isInt({ min: 1 }).withMessage("Duration must be a positive integer"),
    body("difficulty_level").optional().notEmpty().withMessage("Difficulty level cannot be empty"),
    body("calories_burned").optional().isInt({ min: 0 }).withMessage("Calories burned must be a non-negative integer"),
    body("date").optional().isISO8601().withMessage("Date must be a valid ISO 8601 date"),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        next(error);
    }
    controller.updateWorkout(req, res, next);
});

// Delete Workout by ID
router.delete("/workout/:id", [
    param("id").isInt().withMessage("Workout ID must be a valid integer")
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        next(error);
    }
    controller.deleteWorkout(req, res, next);
});

router.get("/users", controller.searchUser);

//////exercises
router.post('/exercise', imageMiddleWare.uploadMultiImages([
    { name: 'image', maxCount: 1 },
    { name: 'target_muscles_image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), exerciseController.createExercise);

router.put('/exercise/:id', imageMiddleWare.uploadMultiImages([
    { name: 'image', maxCount: 1 },
    { name: 'target_muscles_image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), exerciseController.updateExercise);
router.delete('/exercise/:id', exerciseController.deleteExercise);
router.get('/exercise', exerciseController.getExercises)



module.exports = router;
