import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";

import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import connectDB from "./config/db.js";
import handleError from "./middleware/errorHandler.js";
import "./config/passport.js";

dotenv.config({ path: "./.env" });
const app = express();

// Connect to MongoDB
connectDB();

//API security
// app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

// static file path
app.use(express.static("public"));

//Logger
app.use(morgan("tiny"));

// routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);

/* ------------------------------ errorHandler ------------------------------ */
app.use((req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

/* ---------------------------------- port ---------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
