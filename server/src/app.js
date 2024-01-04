import express from "express";
import cors from "cors"
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
import productsRotes from "./routes/products.routes.js"
import salesRoutes from "./routes/sales.routes.js"
import reportsRoutes from "./routes/reports.routes.js"
import paymentTypesRoutes from "./routes/payment_types.routes.js"
import profileRotes from "./routes/profile.routes.js"

import { validateSession } from "./middlewares/validations.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173" 
  }),
);

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
app.use("/api", profileRotes)
app.use("/api", accountsRoutes)
app.use(validateSession)
app.use("/api", marketsRoutes)
app.use("/api", usersRoutes)
app.use("/api", employeesRoutes)
app.use("/api", productsRotes)
app.use("/api", reportsRoutes)
app.use("/api", categoriesRoutes)
app.use("/api", salesRoutes)

app.use("/api", paymentTypesRoutes)

app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({
      message: "the requested url does not exist",
    });
  });
  
  export default app;