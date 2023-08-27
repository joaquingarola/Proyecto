import { VehicleModel } from "./vehicle-model";

export interface MaintenanceModel {
  id?: number,
  vehicleId: number,
  description: string,
  startDate: Date,
  endDate?: Date,
  vehicle: VehicleModel
}