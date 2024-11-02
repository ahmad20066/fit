
const dbConfig = require('../config/db_config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

module.exports = sequelize;


const Workout = require('./fitness/workout');
const Exercise = require('./fitness/exercise');
// const WorkoutSession = require("./fitness/workout_session")
const Package = require('./package')
const Subscription = require('./subscription');

const MealPlan = require('./meals/meal_plan');
const MealSubscription = require('./meals/meal_subscription');
const PricingModel = require('./pricing_model');
const Chat = require('./chat/chat');
const Message = require('./chat/message');
const User = require('./user');
// Package.hasMany(Workout, { foreignKey: "package_id" });
// Workout.belongsTo(Package, { foreignKey: "package_id" });

// Workout.hasMany(WorkoutSession, { foreignKey: "workout_id" });


// Workout.hasMany(Exercise, { foreignKey: "workout_id", as: "exercises" });
// Exercise.belongsTo(Workout, { foreignKey: "workout_id" });

Workout.belongsTo(sequelize.models.User, { foreignKey: "user_id" });
Package.hasMany(Subscription, { foreignKey: "package_id" });
Package.hasMany(PricingModel, { foreignKey: "package_id", as: "pricings" })
Subscription.belongsTo(Package, { foreignKey: "package_id" });

MealSubscription.belongsTo(MealPlan, { foreignKey: "meal_plan_id", as: "meal_plan" });
MealPlan.hasMany(MealSubscription, { foreignKey: "meal_plan_id", as: "subscriptions" });

Chat.hasMany(Message, { foreignKey: "chat_id", as: "messages" });
Message.belongsTo(Chat, { foreignKey: "chat_id" })

User.hasMany(Chat, { foreignKey: 'userId', as: 'userChats' });
User.hasMany(Chat, { foreignKey: 'coachId', as: 'coachChats' });
Chat.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Chat.belongsTo(User, { foreignKey: 'coachId', as: 'coach' });