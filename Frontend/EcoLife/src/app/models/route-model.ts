import { RouteContainerModel } from "./route-container-model";

export interface RouteModel {
  id?: number,
  description: string,
  periodicity: number,
  quantity: number,
  wasteType: string,
  routeContainers: RouteContainerModel[]
}