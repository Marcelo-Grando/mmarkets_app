import { ClientError } from "../errors/Errors.js";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).send("Something went wrong");
};
