const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// router imports
const userRouter = require("./routes/userRoute.js");
const bookRouter = require("./routes/bookRoute.js");
const conversationRouter = require("./routes/conversationRoute.js");
const messageRouter = require("./routes/messageRoute.js");
const orderRouter = require("./routes/orderRoute.js");
const reviewRouter = require("./routes/reviewRoute.js");
const authRouter = require("./routes/authRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");

const app = express();
const PORT = process.env.PORT || 8000;
mongoose.set("strictQuery", true);
// env config
dotenv.config();

// ======= Middlewares ========
// cross origin resource sharing
app.use(cors(corsOptions));
// for JSON
app.use(express.json());
// for cookie-parser
app.use(cookieParser());
//CORS

// database connection
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/reviews", reviewRouter);
//
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`server is running on port ${PORT}`);
});
