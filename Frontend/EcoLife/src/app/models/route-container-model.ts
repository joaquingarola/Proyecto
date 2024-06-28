import { ContainerModel } from "./container-model";
import { RouteModel } from "./route-model";

export interface RouteContainerModel {
  id?: number,
  routeId?: number,
  containerId?: number,
  container?: ContainerModel,
  route?: RouteModel
}