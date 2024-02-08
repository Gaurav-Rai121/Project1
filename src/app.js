





















//routes import
import userRouter from "./routes/user.routes.js"

//routes declartion
app.use("/api/v1/users",userRouter);

export {app}