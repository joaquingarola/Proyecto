import { EmployeeModel } from "./employee-model";

export interface UserResponseModel {
  token: string,
  isFirstEntry: boolean,
  employee: EmployeeModel
}