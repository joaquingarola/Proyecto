import { RouteContainerModel } from "./route-container-model";

export interface ContainerModel {
  id?: number,
  latitude: number,
  longitude: number,
  capacity: number,
  address: string,
  wasteType: string,
  lastEmptying: Date,
  status: string,
  zone: string,
  routeContainer?: RouteContainerModel
}