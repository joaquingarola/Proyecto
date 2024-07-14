import { ContainerModel } from "./container-model";
import { RouteModel } from "./route-model";

export interface RouteContainerModel {
  id?: number,
  routeId?: number,
  containerId?: number,
  order?: number;
  empty?: boolean,
  container?: ContainerModel,
  route?: RouteModel
}