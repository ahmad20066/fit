const express = require("express")
const app = express()
const sequelize = require("./models/index")
const authRouter = require("./routes/auth_route")
const adminRouter = require("./routes/admin_route")
const coachRouter = require("./routes/coach_route")
const statsRouter = require("./routes/stats_route")
const dietRouter = require("./routes/diet_route")
const fitnessRouter = require("./routes/fitness_route")
const isAuth = require("./middlewares/isAuth")
const isAdmin = require("./middlewares/isAdmin")
const isCoach = require("./middlewares/isCoach")

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/coach', isAuth, isCoach, coachRouter)
app.use('/diet', dietRouter)
app.use('/fitness', isAuth, fitnessRouter)
app.use('/stats', isAuth, isCoach, statsRouter)

app.use((error, req, res, next) => {
    console.log(error);
    const message = error.message;
    const status = error.statusCode || 500;
    res.status(status).json({
        Message: message,
    });
});
sequelize.sync({
    // force: true
}).then((result) => {
    // console.log(result);
    app.listen(8080)
    console.log("Listening to port 8080")

}).catch((e) => {
    console.log(e)
})
