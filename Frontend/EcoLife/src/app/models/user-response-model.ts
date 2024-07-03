import { EmployeeModel } from "./employee-model";

export interface UserResponseModel {
  success: boolean,
  token: string,
  isFirstEntry: boolean,
  employee: EmployeeModel
}