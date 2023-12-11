import express from "express";
import session from "express-session";
import MySQLStoreClassFactory from "express-mysql-session";
import { pool } from "./db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import marketsRoutes from "./routes/markets.routes.js"
import employeesRoutes from "./routes/employees.routes.js"
import usersRoutes from "./routes/users.routes.js"
import authRoutes from "./routes/auth.routes.js"
import accountsRoutes from "./routes/accounts.routes.js"
import categoriesRoutes from "./routes/categories.routes.js"

import { verifySession } from "./middlewares/verify.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

const MySQLStore = MySQLStoreClassFactory(session);

const sessionStore = new MySQLStore(
  {
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  pool
);

app.use(
  session({
    key: "user_session",
    secret: "secret",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000 * 60 * 8,
    },
  })
);

app.use("/api", authRoutes)
app.use("/api", verifySession, accountsRoutes)
app.use("/api", verifySession, marketsRoutes)
app.use("/api", verifySession, usersRoutes)
app.use("/api", verifySession, employeesRoutes)
app.use("/api", verifySession, categoriesRoutes)


app.use((req, res) => {
    res.status(404).json({
      message: "the requested url does not exist",
    });
  });
  
  export default app;