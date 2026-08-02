import { AppError } from "./AppError.js";

export class InvalidIdError extends AppError {
  constructor(message = "invalid Id") {
    super(400, message);
  }
}