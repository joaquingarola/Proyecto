import { VehicleCenterModel } from "./vehicle-center-model";

export interface VehicleModel {
    id?: number,
    patent: string,
    description: string,
    model: number,
    buyDate: Date,
    status: string,
    vehicleCenterId: number,
    vehicleCenter?: VehicleCenterModel
}