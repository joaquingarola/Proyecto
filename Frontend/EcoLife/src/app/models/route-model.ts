import { ContainerModel } from "./container-model";

export interface RouteModel {
  id?: number,
  description: string,
  periodicity: number,
  quantity: number,
  wasteType: string,
  containers: ContainerModel[]
}