import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
  constructor(message = "Invalid credentials") {
    super(401, message);
  }
}