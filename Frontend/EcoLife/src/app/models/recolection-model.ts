import { EmployeeModel } from "./employee-model";
import { RouteModel } from "./route-model";
import { VehicleCenterModel } from "./vehicle-center-model";
import { VehicleModel } from "./vehicle-model";
import { WasteCenterModel } from "./waste-center-model";

export interface RecolectionModel {
  id?: number,
  description: string,
  startDate: Date,
  status: string,
  vehicle: VehicleModel,
  vehicleCenter: VehicleCenterModel,
  employee: EmployeeModel,
  wasteCenter: WasteCenterModel,
  route: RouteModel,
  routeId: number
}