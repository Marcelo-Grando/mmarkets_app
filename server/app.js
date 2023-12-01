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
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use("/api", marketsRoutes)
app.use("/api", authRoutes)
app.use("/api", usersRoutes)
app.use("/api", employeesRoutes)

app.use((req, res) => {
    res.status(404).json({
      message: "the requested url does not exist",
    });
  });
  
  export default app;