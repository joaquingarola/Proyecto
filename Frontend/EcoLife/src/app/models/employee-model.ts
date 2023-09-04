import { RoleModel } from "./role-model";

export interface EmployeeModel {
  id?: number,
  dni: string,
  name: string,
  surName: string,
  email: string,
  phoneNumber: string,
  birthdate: Date,
  admissionDate: Date,
  roleId: number,
  role?: RoleModel
}