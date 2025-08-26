import { User } from "./user";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// --- User Endpoints ---

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse extends ApiResponse<User> {}

export interface GetUsersResponse extends ApiResponse<User[]> {}
export { User };

