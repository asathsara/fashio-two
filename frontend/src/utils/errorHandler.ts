import axios from "axios";

interface ValidationError {
  msg: string;
  param?: string;
  location?: string;
}

export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (axios.isAxiosError(error)) {
    // Handle express-validator errors array
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      return error.response.data.errors.map((e: ValidationError) => e.msg).join(', ');
    }
    return error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};